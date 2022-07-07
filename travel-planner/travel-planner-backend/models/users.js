const Parse = require("parse/node")

const APP_ID = "yS7mzf9F0VFtrumR3wVbkY6wNTM3zFbMf4H7s4HP";
const JS_KEY = "lyK93mhzenGxQh58QPrx9vvXoJ1FLk9AMmGaCJHL";
const MASTER_KEY = "Sh5jO61tl94TLrWLPm8RBvk1T7l3fHOBLJXTv4LT"

// Initialize Parse
Parse.initialize(`${APP_ID}`, `${JS_KEY}`, `${MASTER_KEY}`);
Parse.serverURL = "https://parseapi.back4app.com/parse"

class Users {
    static async logIn(username, password) {
        let user = await Parse.User.logIn(username, password)

        return ({sessionToken: await user.getSessionToken()})
    }

    static async logOut(sessionToken) {
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

    static async signUp(username, email, password) {
        let user = new Parse.User()

        user.set("username", username)
        user.set("email", email)
        user.set("password", password)

        let newUser = await user.signUp()
        await this.logOut(newUser.getSessionToken())
    }
}

module.exports = Users
