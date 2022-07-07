import "./Login.css"
import { useContext } from "react"
import { UserContext } from "../../UserContext"

export default function Login({ logInOnClick }) {
    const {sessionToken, signUpUser, logInUser, logOutUser} = useContext(UserContext)
    console.log("Login: ", sessionToken)

    return (
        <div id="login-page">
            <h1>Login</h1>
            <input id="login-username" type="text" placeholder="Username" />
            <input id="login-password" type="password" placeholder="Password" />
            <button onClick={logInOnClick} className="login-button">Log In</button>
        </div>
    )
}
