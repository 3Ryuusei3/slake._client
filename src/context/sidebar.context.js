import { createContext, useState } from "react"

const SidebarContext = createContext()

const SidebarProviderWrapper = props => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	return <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>{props.children}</SidebarContext.Provider>
}

export { SidebarContext, SidebarProviderWrapper }
