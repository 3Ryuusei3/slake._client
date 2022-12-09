import { useContext, useState } from "react"
import { SidebarContext } from "../../context/sidebar.context"

function HeaderTitle({ headerTitle }) {
	const [title, setTitle] = useState(headerTitle)

	const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)

	const handleTitle = e => {
		setTitle(e.target.value)
	}

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
			<input className="headerTitle headerInput" placeholder="Untitled" value={title} onChange={handleTitle} />
		</div>
	)
}

export default HeaderTitle
