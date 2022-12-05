import { Container, Row, Col } from "react-bootstrap"
import LoginForm from "./../../components/LoginForm/LoginForm"

const LoginPage = () => {
	return (
		<Container>
			<Row style={{ maxWidth: "700px", marginInline: "auto" }}>
				<Col sm={{ offset: 3, span: 6 }}>
					<h1 className="py-5 text-center">Login</h1>
					<LoginForm />
				</Col>
			</Row>
		</Container>
	)
}

export default LoginPage
