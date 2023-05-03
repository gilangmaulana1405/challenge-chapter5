const {
    User
} = require('../models')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'role']
            })
            res.json(users)
        } catch (err) {
            console.log(err)
        }
    },

    Register: async (req, res) => {
        const {
            name,
            email,
            password,
            confPassword,
            role
        } = req.body

        if (password !== confPassword) return res.status(400).json({
            message: 'password tidak sama!'
        })

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        try {
            await User.create({
                name: name,
                email: email,
                password: hashPassword,
                role: 'user'
            })
            res.json({
                message: 'registrasi berhasil!'
            })
        } catch (error) {
            console.log(error)
        }
    },

    AdminRegister: async (req, res) => {
        const {
            name,
            email,
            password,
            confPassword,
            role
        } = req.body

        if (password !== confPassword) return res.status(400).json({
            message: 'password tidak sama!'
        })

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        try {
            await User.create({
                name: name,
                email: email,
                password: hashPassword,
                role: 'admin'
            })
            res.json({
                message: 'registrasi berhasil!'
            })
        } catch (error) {
            console.log(error)
        }
    },

    Login: async (req, res) => {
        try {
            const user = await User.findAll({
                where: {
                    email: req.body.email,
                    role: req.body.role
                }
            })

            const match = await bcrypt.compare(req.body.password, user[0].password)
            if (!match) return res.status(400).json({
                message: 'password salah!'
            })

            const userId = user[0].id
            const name = user[0].name
            const email = user[0].email
            const role = user[0].role
            const accessToken = jwt.sign({
                userId,
                name,
                email,
                role
            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            })
            const refreshToken = jwt.sign({
                userId,
                name,
                email,
                role
            }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            })

            await User.update({
                refresh_token: refreshToken
            }, {
                where: {
                    id: userId
                }
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })

            res.json({
                accessToken
            })

        } catch (error) {
            res.status(404).json({
                message: 'email tidak ditemukan!'
            })
        }
    },

    Logout: async (req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(204)

        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if (!user[0]) return res.sendStatus(204)

        // update refresh token menjadi null
        await User.update({
            refresh_token: null
        }, {
            where: {
                id: user[0].id
            }
        })

        // hapus cookie
        res.clearCookie('refreshToken')
        return res.status(200).json({
            message: 'anda sudah logout!'
        })
    }

}