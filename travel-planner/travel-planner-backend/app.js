const morgan = require('morgan')
const express = require ('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Parse = require("parse/node"); //he only get's "parse"


const notes = require('./routes/notes')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.json())

app.use('/notes', notes)

// can we check all users with an open session?
// then can we check which one matches with the current SAVED object id (saved locally so there can be multiple users using the site at once)

const APP_ID = "yS7mzf9F0VFtrumR3wVbkY6wNTM3zFbMf4H7s4HP";
const JS_KEY = "lyK93mhzenGxQh58QPrx9vvXoJ1FLk9AMmGaCJHL";

// Initialize Parse
Parse.initialize(`${APP_ID}`, `${JS_KEY}`);
Parse.serverURL = "https://parseapi.back4app.com/"

Parse.User.enableUnsafeCurrentUser()

app.post('/users/register', async (req, res) => {
    let infoUser = req.body
    let user = new Parse.User()

    user.set("username", infoUser.username)
    user.set("email", infoUser.email)
    user.set("password", infoUser.password)

    try {
        let newUser = await user.signUp()

        await Parse.User.become(newUser.getSessionToken()) // NEED TO CONFIRM THIS WORKS
        await Parse.User.logOut()

        /* Purely for testing purposes */
        const currentUser = await Parse.User.current()
        if (currentUser === null) {
            console.log('Success! No user is logged in anymore!')
        }
        /* ** */

        res.status(200).send({ loginMessage: '', registerMessage: `Account created! Username: ${infoUser.username} Please check ${infoUser.email} to verify.`, typeStatus: "success", infoUser: infoUser })
    } catch (error) {
        res.status(409).send({ loginMessage: '', registerMessage: error.message, typeStatus: "danger", infoUser: infoUser })
    }
})

app.post('/users/login', async (req, res) => {
    let infoUser = req.body

    try {
        let user = await Parse.User.logIn(infoUser.username, infoUser.password)
        res.status(200).send({ loginMessage: `${infoUser.username} has been logged in!`, registerMessage: '', typeStatus: "success", infoUser: infoUser, sessionToken: await user.getSessionToken() })
    } catch (error) {
        res.status(409).send({ loginMessage: error.message, registerMessage: '', typeStatus: "danger", infoUser: infoUser })
    }
})

app.post('/users/logout', async (req, res) => {
    let sessionToken = req.body.sessionToken

    // use insomnia to test logging in on multiple devices at once, but logging out at different times.

    await Parse.User.become(sessionToken)
    await Parse.User.logOut()

})

app.get('/', () => {
    res.status(200).send({location: "Home page"})
})

module.exports = app
