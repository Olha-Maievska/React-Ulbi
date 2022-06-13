import React, {useContext} from 'react'
import { AuthContext } from '../components/context'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = (e) => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }
    return (
        <div>
            <h1>Login!</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Enter login"/>
                <MyInput type="password" placeholder="Enter password"/>
                <MyButton>Log in</MyButton>
            </form>
        </div>
    )
}

export default Login