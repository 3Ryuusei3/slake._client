import HeaderIcon from "./HeaderIcon"
import HeaderImage from "./HeaderImage"
import HeaderTitle from "./HeaderTitle"

function Header({ isSidebarOpen }) {
	return (
		<div style={{ postion: "relative" }}>
			<HeaderImage isSidebarOpen={isSidebarOpen} />
			<HeaderIcon isSidebarOpen={isSidebarOpen} />
			<HeaderTitle isSidebarOpen={isSidebarOpen} />
		</div>
	)
}

export default Header
