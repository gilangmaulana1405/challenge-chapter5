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
    getCarsByDeleted,
    addCar,
    updateCar,
    deleteCar
} = require('../controllers/carController.js')
const {
    verifyToken,
    isSuperAdmin,
    CarAdminSuperAdmin
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
router.get('/cars', verifyToken, CarAdminSuperAdmin, getCars)
router.get('/cars/deleted', verifyToken, CarAdminSuperAdmin, getCarsByDeleted)
router.post('/cars', verifyToken, CarAdminSuperAdmin, addCar)
router.patch('/cars/:id', verifyToken, CarAdminSuperAdmin, updateCar)
router.delete('/cars/:id', verifyToken, CarAdminSuperAdmin, deleteCar)

module.exports = router