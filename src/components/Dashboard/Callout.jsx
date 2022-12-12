import { useContext, useState } from "react"

import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"

import dashboardServices from "../../services/dashboard.service"

function Callout({ dashboardData }) {
	const [callout, setCallout] = useState(dashboardData.callout)

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)


	const handleCallout = e => {
		setCallout(e.target.value)
		handleCallout()
	}

	const handleCalloutUpdate = () => {
		dashboardServices
			.getDashboardByUser(user._id)
			.then(res => {
				return dashboardServices.updateCallout(res.data[0]._id, { callout })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm my-3" : "leftPaddingLg my-3"}>
			<div className="Callout">
				<p>💡</p>
				<div>
					<input onChange={handleCallout} type="text" value={callout} onBlur={handleCalloutUpdate} placeholder="This is your callout" />
				</div>
			</div>
		</div>
	)
}

export default Callout
