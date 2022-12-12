import { useLocation } from "react-router-dom"

import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import TextEditor from "../../components/SingleNote/TextEditor"

function SingleNote() {
	let location = useLocation()
	let pageLocation = location.pathname

	console.log(pageLocation.includes("/note/"))

	return (
		<>
			<Sidebar />
			<Header />
			<TextEditor />
		</>
	)
}

export default SingleNote
