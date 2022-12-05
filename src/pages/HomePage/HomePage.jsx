import { Container, Row, Col, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

function Homepage() {
	return (
		<Container className="mt-5">
			<Row className="mt-5">
				<Col className="text-center">
					<img src="https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png" alt="Team" />
					<h1 className="mt-5">One place.</h1>
					<h1>All your data.</h1>
					<h1>Just for you.</h1>
					<h4 className="pt-4">Create new notes and share your notes, </h4>
					<h4>play with the kanban or finish your to-do list. </h4>
					<Link to="/signup" className="red-btn" style={{ maxWidth: "max-content", marginInline: "auto" }}>
						<Nav.Link as="div" className="mt-4">
							Try slake. for free
						</Nav.Link>
					</Link>
				</Col>
			</Row>
		</Container>
	)
}

export default Homepage
