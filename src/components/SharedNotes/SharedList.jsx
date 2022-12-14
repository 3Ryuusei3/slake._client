import { useContext, useEffect, useState } from "react"
import { Container, Row, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"
import singleNoteService from "../../services/singleNote.service"

function SharedList() {
	const [sharedNotesList, setSharedNotesList] = useState()

	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)
	const { user } = useContext(AuthContext)

	const getSharedNotesList = () => {
		singleNoteService
			.getSharedNotes()
			.then(res => {
				setSharedNotesList(res.data)
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	useEffect(() => {
		getSharedNotesList()
	}, [])
	console.log(sharedNotesList)

	return (
		<>
			{!sharedNotesList ? (
				<h1>Cargando</h1>
			) : (
				<div className={!isSidebarOpen ? "leftPaddingSm py-4" : "leftPaddingLg py-4"} style={{ marginRight: "80px" }}>
					<Container>
						<Row className="gap-5">
							{sharedNotesList.map(elm => {
								return (
									<Card key={elm._id} className={!darkMode ? "sharedCard" : "sharedCard-dark"}>
										<h1 className="sharedIcon">{elm.header.icon}</h1>
										<img className="sharedProfilePicture" src={elm.owner.imageUrl} alt={`${elm.owner.username} profile picture`} />
										<Card.Img variant="top" src={elm.header.image} />
										<Card.Body className="px-4 pt-5">
											<Link to={`/note/${elm._id}`} style={{ textDecoration: "none" }}>
												<Card.Title>{elm.header.title}</Card.Title>
											</Link>
											<div className="d-flex justify-content-between align-items-center mb-2">
												<Card.Text className="mb-0 mt-1">By {elm.owner.username}</Card.Text>
												<p className={!darkMode ? `noteCategory ${elm.tag}Category mb-0` : `noteCategory ${elm.tag}CategoryDark mb-0`}>{elm.tag}</p>
											</div>
										</Card.Body>
									</Card>
								)
							})}
						</Row>
					</Container>
				</div>
			)}
		</>
	)
}

export default SharedList
