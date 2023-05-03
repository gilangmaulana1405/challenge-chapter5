const {
    Car
} = require('../models')

// CRUD MOBIL
module.exports = {
    getCars: async (req, res) => {
        try {
            const cars = await Car.findAll()
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
            foto
        } = req.body

        try {
            await Car.create({
                nama_mobil: nama_mobil,
                harga_sewa: harga_sewa,
                ukuran: ukuran,
                foto: foto,
            })

            res.json({
                msg: 'data mobil berhasil ditambahkan!'
            })
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