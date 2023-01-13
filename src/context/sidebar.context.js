import { createContext, useState } from "react"

const SidebarContext = createContext()

const SidebarProviderWrapper = props => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [windowSize, setWindowSize] = useState(900)

	return <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, windowSize, setWindowSize }}>{props.children}</SidebarContext.Provider>
}

export { SidebarContext, SidebarProviderWrapper }
