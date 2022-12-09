import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"


const Pricing = () => {



    const { user } = useContext(AuthContext)



    return (
        <Container fluid className="ms-5 d-flex">
            <Row>
                <h3 className="text-muted m-5">Princing</h3>
                <h1>One tool for your whole life.</h1>
                <h1>A new way to organize your life.</h1>
            </Row>
            <Row>
                <Col md={4}>
                    <Card

                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>
                            <i class="bi bi-house-fill"></i>
                            <h1>Free</h1>
                            <p>For organizing every corner of your work of life</p>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Free</Card.Title>
                            <Card.Text>
                                {!user
                                    ?
                                    <Link to="/signup" className="purple-btn mb-5 px-5 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                                        Get Started
                                    </Link> :
                                    <Link to="/STRIPE" className="purple-btn mb-5 px-5 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                                        Get PRO
                                    </Link>
                                }
                                <ul>
                                    <li>
                                        <i class="bi bi-check-lg"> Basic Note page.</i>
                                    </li>
                                    <li>
                                        <i class="bi bi-check-lg"> Only five Notes.</i>
                                    </li>
                                    <li>
                                        <i class="bi bi-check-lg"> To-do</i>
                                    </li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Card

                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>
                        <i class="bi bi-house-up-fill"></i>
                        <h1>Plus</h1>
                        <p>For organizing every corner of your work of life</p>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title> <i class="bi bi-currency-dollar"></i> 10</Card.Title>
                        <Card.Text>
                            {!user
                                ?
                                <Link to="/signup" className="purple-btn mb-5 px-5 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                                    Get Started
                                </Link> :
                                <Link to="/STRIPE" className="purple-btn mb-5 px-5 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                                    Get PRO
                                </Link>
                            }
                            <ul>
                                <li>
                                    <i class="bi bi-check-lg"> Kan-Ban</i>
                                </li>
                                <li>
                                    <i class="bi bi-check-lg"> Unlimited Notes.</i>
                                </li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Container>

    )

}

export default Pricing