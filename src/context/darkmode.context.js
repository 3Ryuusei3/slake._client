import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./auth.context"


const DarkModeContext = createContext()


function DarkModeProviderWrapper(props) {

    const { user } = useContext(AuthContext)

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        user ? setDarkMode(user.isDark) : setDarkMode(false)
    }, [user])

    return <DarkModeContext.Provider value={{ setDarkMode, darkMode }}>
        {props.children}
    </DarkModeContext.Provider>
}

export { DarkModeProviderWrapper, DarkModeContext }
