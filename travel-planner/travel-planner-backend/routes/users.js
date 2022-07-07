const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')
const userModel = require('./../models/users')

router.use(bodyParser.json())

router.post('/register', async (req, res) => {
    let infoUser = req.body

    try {
        userModel.signUp(infoUser.username, infoUser.email, infoUser.password)

        res.status(200).send({ loginMessage: '', registerMessage: `Account created! Username: ${infoUser.username} Please check ${infoUser.email} to verify.`, typeStatus: "success", infoUser: infoUser })
    } catch (error) {
        res.status(409).send({ loginMessage: '', registerMessage: error.message, typeStatus: "danger", infoUser: infoUser })
    }
})

router.post('/login', async (req, res) => {
    let infoUser = req.body

    try {
        let sessionToken = (await userModel.logIn(infoUser.username, infoUser.password)).sessionToken

        res.status(200).send({ loginMessage: `${infoUser.username} has been logged in!`, registerMessage: '', typeStatus: "success", infoUser: infoUser, sessionToken: sessionToken })
    } catch (error) {
        res.status(409).send({ loginMessage: error.message, registerMessage: '', typeStatus: "danger", infoUser: infoUser })
    }
})

router.post('/logout', async (req, res) => {
    let sessionToken = req.body.sessionToken
    await userModel.logOut(sessionToken)
})

module.exports = router
