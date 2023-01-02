import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"
import { DarkModeContext } from "../../context/darkmode.context"

import ModalProfile from "./ModalProfile"

import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact/dist/index"

const Sidebar = () => {
	const [showModal, setShowModal] = useState(false)

	const { user, logoutUser } = useContext(AuthContext)
	const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)
	const { darkMode, setDarkMode } = useContext(DarkModeContext)

	const handleToggle = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	const openSidebarModal = () => setShowModal(true)
	const closeSidebarModal = () => setShowModal(false)

	return (
		<>
			<div className="sidebar" style={{ height: "100vh", overflow: "scroll initial" }}>
				<CDBSidebar
					toggled={!isSidebarOpen ? true : false}
					breakpoint={600}
					style={!darkMode ? { color: "var(--text-primary)", backgroundColor: "var(--bg-navbar)" } : { color: "var(--dark-text-primary)", backgroundColor: "var(--dark-bg-navbar)" }}
				>
					<CDBSidebarHeader
						prefix={
							<img
								src={user.imageUrl}
								alt="profile"
								onClick={() => {
									handleToggle()
								}}
								className="sidebarProfileImg"
							></img>
						}
					>
						<a href="/dashboard" className="text-decoration-none" style={{ color: "inherit", fontWeight: "var(--button)", letterSpacing: "0.2px" }}>
							{!user ? "" : user.username}
						</a>
					</CDBSidebarHeader>

					<CDBSidebarContent className="sidebar-content p-0">
						<CDBSidebarMenu>
							<CDBSidebarMenuItem className="sidebar-label">Private</CDBSidebarMenuItem>
							<NavLink to="/dashboard" activeclassname="activeClicked" style={{ color: "inherit" }}>
								<CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
							</NavLink>
							<NavLink to="/kanban" activeclassname="activeClicked" style={{ color: "inherit" }}>
								<CDBSidebarMenuItem icon="th-large">Kanban</CDBSidebarMenuItem>
							</NavLink>
							<NavLink to="/notes" activeclassname="activeClicked" style={{ color: "inherit" }}>
								<CDBSidebarMenuItem icon="sticky-note">Notes</CDBSidebarMenuItem>
							</NavLink>
							<NavLink to="/shared_notes" activeclassname="activeClicked" style={{ color: "inherit" }}>
								<CDBSidebarMenuItem icon="share">Shared notes</CDBSidebarMenuItem>
							</NavLink>
							<CDBSidebarMenuItem className="sidebar-label mt-3">Settings</CDBSidebarMenuItem>
							<NavLink onClick={openSidebarModal} activeclassname="activeClicked" style={{ color: "inherit" }}>
								<CDBSidebarMenuItem icon="home">Profile</CDBSidebarMenuItem>
							</NavLink>
							<NavLink to="/plan" activeclassname="activeClicked" style={{ color: "inherit" }}>
								<CDBSidebarMenuItem icon="credit-card">Plan</CDBSidebarMenuItem>
							</NavLink>
							<NavLink
								activeclassname="activeClicked"
								style={{ color: "inherit" }}
								onClick={() => {
									toggleDarkMode()
								}}
							>
								<CDBSidebarMenuItem icon={!darkMode ? "moon" : "sun"}>{!darkMode ? "Dark Mode" : "Light Mode"}</CDBSidebarMenuItem>
							</NavLink>
							<NavLink className="logout-btn" as="div" to="/" activeclassname="activeClicked" onClick={logoutUser}>
								<CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
							</NavLink>
						</CDBSidebarMenu>
					</CDBSidebarContent>

					<CDBSidebarFooter style={{ textAlign: "center" }}>
						<div
							className="sidebar-btn-wrapper sidebar-brand"
							style={{
								padding: "20px 5px",
							}}
						>
							slake.
						</div>
					</CDBSidebarFooter>
				</CDBSidebar>
			</div>
			<ModalProfile showModal={showModal} closeSidebarModal={closeSidebarModal} setShowModal={setShowModal} />
		</>
	)
}

export default Sidebar
