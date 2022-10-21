import { createContext, useEffect, useState } from "react";
import netlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
})

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        //event listener from netlify
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            // force the modal to close
            netlifyIdentity.close()
            console.log('login event success')
            //event listener for logout
            netlifyIdentity.on('logout', (user) => {
                setUser(null)
                console.log('logout finished')
            })
        })
        //init netlify identity connection
        netlifyIdentity.init()

        return () => {
            // stop listening
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    },[])

    //login modal
    const login = () => {
        netlifyIdentity.open()
    }

    //logout
    const logout = () => {
        netlifyIdentity.logout()
    }


    // context object
    const context = {
        user,login,logout
    }
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
