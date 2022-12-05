import { Container, Row, Col } from "react-bootstrap"
import SignUpForm from "../../components/SignupForm/SignUpForm"

const SignupPage = () => {
	return (
		<Container>
			<Row style={{ maxWidth: "700px", marginInline: "auto" }}>
				<Col sm={{ offset: 3, span: 6 }}>
					<h1 className="py-5 text-center">Signup</h1>
					<SignUpForm />
				</Col>
			</Row>
		</Container>
	)
}

export default SignupPage
