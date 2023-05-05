const {
    Car,
    User
} = require('../models')

// CRUD MOBIL
module.exports = {
    getCars: async (req, res) => {
        try {
            const cars = await Car.findAll({
                include: {
                    model: User,
                    attributes: ['id', 'email', 'role']
                },
                attributes: ['id', 'nama_mobil', 'harga_sewa', 'ukuran', 'foto', 'available', 'createdAt', 'updatedAt']
            })
            res.json(cars)
        } catch (error) {
            console.log(error)
        }
    },

    getCarsByDeleted: async (req, res) => {
        try {
            const cars = await Car.findAll({
                attributes: ['id', 'nama_mobil', 'harga_sewa', 'ukuran', 'foto', 'available', 'createdAt', 'updatedAt'],
                where: {
                    available: 0
                }
            })
            res.json(cars)
        } catch (error) {
            console.log(error)
        }
    },

    addCar: async (req, res) => {

        const {
            nama_mobil,
            harga_sewa,
            ukuran,
            foto,
            available,
        } = req.body

        try {
            const newCar = await Car.create({
                nama_mobil: nama_mobil,
                harga_sewa: harga_sewa,
                ukuran: ukuran,
                foto: foto,
                available: available,
                userId: req.user.userId
            })


            res.status(200).json({
                success: true,
                message: "Data berhasil ditambahkan!",
                data: newCar,
            });
        } catch (error) {
            console.log(error)
        }
    },

    updateCar: async (req, res) => {
        const {
            nama_mobil,
            harga_sewa,
            ukuran,
            foto
        } = req.body
        try {
            await Car.update(req.body, {
                where: {
                    id: req.params.id
                }
            })

            res.json({
                msg: 'data mobil berhasil diubah!'
            })
        } catch (error) {
            console.log(error)
        }
    },

    deleteCar: async (req, res) => {
        try {
            await Car.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.json({
                msg: 'data berhasil dihapus!'
            })
        } catch (error) {
            console.log(error)
        }
    }
}