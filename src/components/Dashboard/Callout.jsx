import { useState } from "react"

function Callout({ isSidebarOpen }) {
	const [callout, setCallout] = useState("")

	const handleCallout = e => {
		setCallout(e.target.value)
	}

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm my-3" : "leftPaddingLg my-3"}>
			<div className="Callout">
				<p>💡</p>
				<div>
					<input onChange={handleCallout} type="text" name="" id="" value={callout} placeholder="This is your callout" />
				</div>
			</div>
		</div>
	)
}

export default Callout
