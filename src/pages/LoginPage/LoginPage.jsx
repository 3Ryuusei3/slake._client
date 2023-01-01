import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"

import LoginForm from "./../../components/LoginForm/LoginForm"

import { Container, Row, Col } from "react-bootstrap"

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
