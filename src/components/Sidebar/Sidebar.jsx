import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact"
import { NavLink } from "react-router-dom"

function Sidebar() {
	return (
		<div className="sidebar" style={{ display: "flex", height: "100vh", overflow: "scroll initial", position: "absolute", top: "0" }}>
			<CDBSidebar style={{ color: "var(--text-primary)", backgroundColor: "var(--bg-navbar)" }}>
				<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
					<a href="/" className="text-decoration-none" style={{ color: "inherit", fontWeight: "var(--button)", letterSpacing: "0.2px" }}>
						Manuel Atance
					</a>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content">
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
							<CDBSidebarMenuItem icon="user">Settings</CDBSidebarMenuItem>
						</NavLink>
						<NavLink exact to="/profile" activeClassName="activeClicked" style={{ color: "inherit" }}>
							<CDBSidebarMenuItem icon="credit-card">Plan</CDBSidebarMenuItem>
						</NavLink>
					</CDBSidebarMenu>
				</CDBSidebarContent>

				<CDBSidebarFooter style={{ textAlign: "center" }}>
					<div
						className="sidebar-btn-wrapper"
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
