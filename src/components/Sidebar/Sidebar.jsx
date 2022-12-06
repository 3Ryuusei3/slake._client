import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact/dist/index"
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

const Sidebar = () => {
	const { logoutUser } = useContext(AuthContext)

	return (
		<div className="sidebar" style={{ display: "flex", height: "100vh", overflow: "scroll initial", position: "absolute" }}>
			<CDBSidebar style={{ color: "var(--text-primary)", backgroundColor: "var(--bg-navbar)" }}>
				<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
					<a href="/" className="text-decoration-none" style={{ color: "inherit", fontWeight: "var(--button)", letterSpacing: "0.2px" }}>
						Manuel Atance
					</a>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content p-0">
					<CDBSidebarMenu>
						<CDBSidebarMenuItem className="sidebar-label">Private</CDBSidebarMenuItem>
						<NavLink exact to="/dashboard" activeClassName="activeClicked" style={{ color: "inherit" }}>
							<CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/tables" activeClassName="activeClicked" style={{ color: "inherit" }}>
							<CDBSidebarMenuItem icon="th-large">Kanban</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/tables" activeClassName="activeClicked" style={{ color: "inherit" }}>
							<CDBSidebarMenuItem icon="sticky-note">Notes</CDBSidebarMenuItem>
						</NavLink>
						<CDBSidebarMenuItem className="sidebar-label">Settings</CDBSidebarMenuItem>
						<NavLink exact to="/profile" activeClassName="activeClicked" style={{ color: "inherit" }}>
							<CDBSidebarMenuItem icon="home">Profile</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/profile" activeClassName="activeClicked" style={{ color: "inherit" }}>
							<CDBSidebarMenuItem icon="credit-card">Plan</CDBSidebarMenuItem>
						</NavLink>
						<NavLink as="div" activeClassName="activeClicked" style={{ color: "red" }} onClick={logoutUser}>
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
	)
}

export default Sidebar
