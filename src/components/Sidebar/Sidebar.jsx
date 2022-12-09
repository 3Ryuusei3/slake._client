import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact/dist/index"
import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import ModalProfile from "./ModalProfile"

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, getDashboardData }) => {
	const [showModal, setShowModal] = useState(false)

	const { user, logoutUser } = useContext(AuthContext)

	const handleToggle = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const openSidebarModal = () => setShowModal(true)
	const closeSidebarModal = () => setShowModal(false)

	return (
		<>
			<div className="sidebar" style={{ display: "flex", height: "100vh", overflow: "scroll initial", position: "absolute" }}>
				<CDBSidebar style={{ color: "var(--text-primary)", backgroundColor: "var(--bg-navbar)" }}>
					<CDBSidebarHeader
						prefix={
							<img
								src={user.imageUrl}
								onClick={() => {
									handleToggle()
								}}
								className="sidebarProfileImg"
							></img>
						}
					>
						<a href="/" className="text-decoration-none" style={{ color: "inherit", fontWeight: "var(--button)", letterSpacing: "0.2px" }}>
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
							<CDBSidebarMenuItem className="sidebar-label">Settings</CDBSidebarMenuItem>
							<NavLink onClick={openSidebarModal} activeclassname="activeClicked" style={{ color: "inherit" }}>
								<CDBSidebarMenuItem icon="home">Profile</CDBSidebarMenuItem>
							</NavLink>
							<NavLink to="/plan" activeclassname="activeClicked" style={{ color: "inherit" }}>
								<CDBSidebarMenuItem icon="credit-card">Plan</CDBSidebarMenuItem>
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
			<ModalProfile showModal={showModal} closeSidebarModal={closeSidebarModal} setShowModal={setShowModal} getDashboardData={getDashboardData} />
		</>
	)
}

export default Sidebar
