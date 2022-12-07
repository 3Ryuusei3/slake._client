import { useState } from "react"

function HeaderTitle({ isSidebarOpen }) {
	const [title, setTitle] = useState("")

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
