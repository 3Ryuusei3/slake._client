import { useState } from "react"

function HeaderTitle({ isSidebarOpen, dashboardData }) {
	const [title, setTitle] = useState(dashboardData.header.title)

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
