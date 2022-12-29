import { useContext, useState, useRef, useLayoutEffect } from "react"

import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"

import dashboardServices from "../../services/dashboard.service"

const Callout = ({ dashboardData }) => {
	const [callout, setCallout] = useState(dashboardData.callout)
	const [offset, setOffset] = useState()
	const calloutRef = useRef()

	const { user } = useContext(AuthContext)
	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)

	useLayoutEffect(() => {
		if (offset !== undefined) {
			const newRange = document.createRange()
			newRange.setStart(calloutRef.current.childNodes[0], offset)

			const selection = document.getSelection()
			selection.removeAllRanges()
			selection.addRange(newRange)
		}
	})

	const handleCallout = e => {
		const range = document.getSelection().getRangeAt(0)
		setOffset(range.startOffset)
		setCallout(e.target.textContent)
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
		<div className={!isSidebarOpen ? "leftPaddingSm rightMargin mt-3" : "leftPaddingLg rightMargin mt-3"}>
			<div className={!darkMode ? "Callout" : "Callout-dark"}>
				<p>💡</p>
				<div>
					<div contentEditable suppressContentEditableWarning spellCheck="false" onInput={handleCallout} onBlur={handleCalloutUpdate} ref={calloutRef}>
						{callout}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Callout
