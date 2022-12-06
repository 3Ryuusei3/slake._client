import HeaderIcon from "./HeaderIcon"
import HeaderImage from "./HeaderImage"
import HeaderTitle from "./HeaderTitle"

function Header() {
	return (
		<div style={{ postion: "relative" }}>
			<HeaderImage />
			<HeaderIcon />
			<HeaderTitle />
		</div>
	)
}

export default Header
