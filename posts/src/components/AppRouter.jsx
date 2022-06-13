import React, { useContext }  from 'react'
import {
    Routes,
    Route
} from "react-router-dom"
import {privateRoutes, publicRoutes} from '../routes/index'
import { AuthContext } from './context'
import Loader from './UI/Loader/Loader'

const AppRouter = () => {
    const { isAuth, isLoading} = useContext(AuthContext)
    
    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
        {isAuth
            ?
            <Routes>
                {privateRoutes.map((route, i) => 
                    <Route
                        key={i}
                        element={route.element}
                        path={route.path}
                        exact={route.exact} />
                )}
            </Routes >
            :
            <Routes>
                {publicRoutes.map((route, i) => 
                <Route
                    key={i}
                    element={route.element}
                    path={route.path}
                    exact={route.exact} />
                )}
            </Routes >}
        </>
    )
}

export default AppRouter