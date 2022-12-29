import { useContext } from "react"
import ContentLoader from "react-content-loader"
import { SidebarContext } from "../../context/sidebar.context"

const HeaderSkeleton = () => {
	const { isSidebarOpen } = useContext(SidebarContext)

	return (
		<ContentLoader viewBox="0 0 200 60" className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
			<rect x="0" y="0" rx="5" ry="5" width="200" height="40" />
			<rect x="10" y="35" rx="5" ry="5" width="10" height="20" />
			<rect x="0" y="45" rx="5" ry="5" width="200" height="10" />
		</ContentLoader>
	)
}

export default HeaderSkeleton
