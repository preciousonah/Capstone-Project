const Parse = require("parse/node")
const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())

const APP_ID = "yS7mzf9F0VFtrumR3wVbkY6wNTM3zFbMf4H7s4HP";
const JS_KEY = "lyK93mhzenGxQh58QPrx9vvXoJ1FLk9AMmGaCJHL";
const MASTER_KEY = "Sh5jO61tl94TLrWLPm8RBvk1T7l3fHOBLJXTv4LT"

// Initialize Parse
Parse.initialize(`${APP_ID}`, `${JS_KEY}`, `${MASTER_KEY}`);
Parse.serverURL = "https://parseapi.back4app.com/parse"

const logOut = async (sessionToken) => {
    let query = new Parse.Query("_Session")

    /* Get all sessions with the session token (there should only be one) */
    query.equalTo("sessionToken", sessionToken)

    query.first({useMasterKey:true}).then(function (user) {
        if (user) {
            console.log(user)

            /* Remove the session from the table. */
            user.destroy({useMasterKey:true}).then(function (res) {
                console.log("Successfully destroyed session!")
            }).catch(function (error) {
                console.log(error)
                return null
            })
        }
        else {
            console.log("Nothing found? ...")
            return null
        }
    })
}

router.post('/register', async (req, res) => {
    let infoUser = req.body
    let user = new Parse.User()

    user.set("username", infoUser.username)
    user.set("email", infoUser.email)
    user.set("password", infoUser.password)

    try {
        let newUser = await user.signUp()

        await logOut(newUser.getSessionToken()) // NEED TO CONFIRM THIS WORKS


        res.status(200).send({ loginMessage: '', registerMessage: `Account created! Username: ${infoUser.username} Please check ${infoUser.email} to verify.`, typeStatus: "success", infoUser: infoUser })
    } catch (error) {
        res.status(409).send({ loginMessage: '', registerMessage: error.message, typeStatus: "danger", infoUser: infoUser })
    }
})

router.post('/login', async (req, res) => {
    let infoUser = req.body

    try {
        let user = await Parse.User.logIn(infoUser.username, infoUser.password)

        res.status(200).send({ loginMessage: `${infoUser.username} has been logged in!`, registerMessage: '', typeStatus: "success", infoUser: infoUser, sessionToken: await user.getSessionToken() })
    } catch (error) {
        res.status(409).send({ loginMessage: error.message, registerMessage: '', typeStatus: "danger", infoUser: infoUser })
    }
})

router.post('/logout', async (req, res) => {
    let sessionToken = req.body.sessionToken
    await logOut(sessionToken)
})

module.exports = router
