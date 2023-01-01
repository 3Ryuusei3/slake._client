import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"

import SignUpForm from "../../components/SignupForm/SignUpForm"

import { Container, Row, Col } from "react-bootstrap"

const SignupPage = () => {
	const { user } = useContext(AuthContext)

	return (
		<>
			{user && <Navigate to="/dashboard" />}
			<Container>
				<Row style={{ maxWidth: "700px", marginInline: "auto" }}>
					<Col sm={{ offset: 3, span: 6 }}>
						<h1 className="py-5 text-center">Signup</h1>
						<SignUpForm />
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default SignupPage
