import { createContext, useState } from "react"

const DarkModeContext = createContext()


function DarkModeProviderWrapper(props) {

    const [darkMode, setDarkMode] = useState(false)


    return <DarkModeContext.Provider value={{ setDarkMode, darkMode }}>
        {props.children}
    </DarkModeContext.Provider>
}

export { DarkModeProviderWrapper, DarkModeContext }
