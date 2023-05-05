const {
    User
} = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
    refreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) return res.sendStatus(401)

            const user = await User.findAll({
                where: {
                    refresh_token: refreshToken
                }
            })

            if (!user[0]) return res.sendStatus(403)
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) return res.sendStatus(403)
                const userId = user[0].id
                const name = user[0].name
                const email = user[0].email
                const role = user[0].role

                // membuat access token baru
                const accessToken = jwt.sign({
                    userId,
                    name,
                    email,
                    role
                }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1d'
                })

                res.json({
                    accessToken
                })
            })
        } catch (error) {
            console.log(error)
        }

    }
}