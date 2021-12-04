import React, { useState } from 'react'
import axios from 'axios'
import config from "../config.json"

const Login = () => {
    const [loginUrl, setLoginUrl] = useState(null)

    const getLoginPage = () => {
        axios.get(config.api.url + "/auth/login")
            .then(res => {
                if (res.data.success) setLoginUrl(res.data.url)
                else console.log("login url not found")
            })
    }

    return (
        <div>
            <p>please login using spotify</p>
            <button onClick={() => getLoginPage()}>Login With Spotify</button>
            {
                loginUrl ?
                    window.location.href = loginUrl :
                    null
            }
        </div>
    )
}

export default Login
