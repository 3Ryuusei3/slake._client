import { useContext } from "react"
import { Container, Row, Col, Navbar } from "react-bootstrap"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import LoginForm from "./../../components/LoginForm/LoginForm"


const LoginPage = () => {

	const { user } = useContext(AuthContext)

	return (
		<>
			{user && <Navigate to="/dashboard" />}
			<Container>
				<Row style={{ maxWidth: "700px", marginInline: "auto" }}>
					<Col sm={{ offset: 3, span: 6 }}>
						<h1 className="py-5 text-center">Login</h1>
						<LoginForm />
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default LoginPage
