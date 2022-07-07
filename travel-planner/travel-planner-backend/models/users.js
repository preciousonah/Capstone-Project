class Users {
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
}
