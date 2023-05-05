const {
    User
} = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        // jika tokennya dapet
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            req.email = user.email
            next()
        })
    },

    isSuperAdmin: async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({
            message: 'akses ditolak!'
        })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (decoded.role === 'superadmin') {
                res.status(200)
                next()
            } else {
                return res.status(400).json({
                    message: 'akses ditolak!'
                })
            }
        })
    },
    CarAdminSuperAdmin: async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({
            message: 'akses ditolak!'
        })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (decoded.role === 'superadmin' || decoded.role === 'admin') {
                res.status(200)
                next()
            } else {
                return res.status(400).json({
                    message: 'akses ditolak!'
                })
            }
        })
    }
}