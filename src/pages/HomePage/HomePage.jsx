import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function Homepage() {
	return (
		<Container className="mt-5">
			<Row className="mt-5">
				<Col className="text-center">
					<img src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670317681/undraw_experience_design_re_ca7l_bgrfu1.svg" alt="Team" />
					<h1 className="mt-5">One place.</h1>
					<h1>All your data.</h1>
					<h1>Just for you.</h1>
					<h4 className="pt-4">Create new notes and share them, </h4>
					<h4>play with the kanban or finish your to-do list. </h4>
					<Link to="/signup" className="purple-btn my-5 px-5 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
						Try slake. for free
					</Link>
				</Col>
			</Row>
		</Container>
	)
}

export default Homepage
