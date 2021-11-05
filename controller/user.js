const { user } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
signUp: async(req, res) => {
    const body = req.body
    try {
       const checkEmail = await user.findOne({ where: { email: body.email } })
        if (checkEmail) {
            return res.status(400).json({
                status: "failed",
                message: "email already used"
            })
        }

        bcrypt.hash(body.password, 10, async(err, hash) => {
            const createUser = await user.create({
                name: body.name,
                email: body.email,
                password: hash
            })

            return res.status(200).json({
                status: "Success",
                message: "Register successfully",
            })
        })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        })
    }
},
signIn: async(req, res) => {
    const body = req.body
    try {
        const checkUser = await user.findOne({
            where: {
                email: body.email
            }
        })

        if (!checkUser) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid email or password"
            })
        }

        const checkPassword = await bcrypt.compare(body.password, checkUser.dataValues.password)

        if (!checkPassword) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid email or password"
            })
        }

        const payload = {
            email: checkUser.dataValues.email,
            id: checkUser.dataValues.id
        }

        jwt.sign(payload, '12345', { expiresIn: 24 * 3600 }, (err, token) => {
            return res.status(200).json({
                status: "success",
                message: "Success signin",
                data: token
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        })
    }
},
}