import { createContext, useState } from "react"

const SidebarContext = createContext()

const SidebarProviderWrapper = props => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const closeSidebar = () => {
		setIsSidebarOpen(true)
	}

	window.addEventListener("resize", closeSidebar)

	return <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>{props.children}</SidebarContext.Provider>
}

export { SidebarContext, SidebarProviderWrapper }
