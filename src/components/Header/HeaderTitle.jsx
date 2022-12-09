import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"
import dashboardServices from "../../services/dashboard.service"

function HeaderTitle({ headerTitle, setHeaderData }) {
	const [title, setTitle] = useState(headerTitle)
	const { user } = useContext(AuthContext)

	const { isSidebarOpen } = useContext(SidebarContext)

	const handleTitle = e => {
		setTitle(e.target.value)
	}

	const handleTitleUpdate = e => {
		e.preventDefault()

		dashboardServices
			.getDashboardByUser(user._id)
			.then(res => {
				return dashboardServices.updateHeader(res.data[0]._id, { title })
			})
			.then(() => {
				setTitle()
			})
			.catch(err => console.log({ message: "Internal server error:", err }))

	}

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
			<input className="headerTitle headerInput" placeholder="Untitled" value={title} onChange={handleTitle}
				onBlur={handleTitleUpdate} />
		</div>
	)
}

export default HeaderTitle
