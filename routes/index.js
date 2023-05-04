const express = require('express')
const {
    getUsers,
    Login,
    Register,
    AdminRegister,
    Logout
} = require('../controllers/userController.js')
const {
    getCars,
    addCar,
    updateCar,
    deleteCar
} = require('../controllers/carController.js')
const {
    verifyToken,
    isSuperAdmin
} = require('../middleware/auth.js')
const {
    refreshToken
} = require('../controllers/RefreshTokenController.js')

const router = express.Router()

router.get('/users', verifyToken, isSuperAdmin, getUsers)
router.post('/users/register', Register)
router.post('/admin/register', verifyToken, isSuperAdmin, AdminRegister)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

// crud car
router.get('/cars', verifyToken, getCars)
router.post('/cars', verifyToken, isSuperAdmin, addCar)
router.patch('/cars/:id', verifyToken, isSuperAdmin, updateCar)
router.delete('/cars/:id', verifyToken, isSuperAdmin, deleteCar)

module.exports = router