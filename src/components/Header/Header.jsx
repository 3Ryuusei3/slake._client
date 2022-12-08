import HeaderIcon from "./HeaderIcon"
import HeaderImage from "./HeaderImage"
import HeaderTitle from "./HeaderTitle"

function Header({ isSidebarOpen, dashboardData, getDashboardData }) {



	return (
		<div style={{ postion: "relative" }}>
			<HeaderImage dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} getDashboardData={getDashboardData} />
			<HeaderIcon dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} />
			<HeaderTitle dashboardData={dashboardData} isSidebarOpen={isSidebarOpen} />
		</div>
	)
}

export default Header
