import HeaderIcon from "./HeaderIcon"
import HeaderImage from "./HeaderImage"
import HeaderTitle from "./HeaderTitle"

function Header({ isSidebarOpen, dashboardData }) {
	return (
		<div style={{ postion: "relative" }}>
			<HeaderImage dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} />
			<HeaderIcon dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} />
			<HeaderTitle dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} />
		</div>
	)
}

export default Header
