import { useContext, useEffect } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link, Navigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { DarkModeContext } from "../../context/darkmode.context"

import WOW from "wowjs"

const About = () => {

    const { darkMode } = useContext(DarkModeContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        new WOW.WOW({
            live: false,
        }).init()
    }, [])


    return (
        <>
            {user && <Navigate to="/dashboard" />}
            <Container className="wow fadeInUp" data-wow-duration="2s">
                <Row className="my-4">
                    <h4>About</h4>
                </Row>
                <Row className="pb-5">
                    <h1>The History Of Slake.</h1>
                    <p className="subText">"Generate Lorem Ipsum placeholder text.
                        Select the number of characters, words, sentences or paragraphs, and hit generate!"</p>
                </Row>
            </Container>

            <Container fluid className={!darkMode ? "mt-2 d-flex values wow fadeInRight" : "mt-2 d-flex values-dark wow fadeInRight"} data-wow-duration="3s">
                <Container>
                    <Row>
                        <h1 className="titleh1">Values</h1>
                        <Col lg={{ span: 6 }} className={!darkMode ? "valuesCol" : "valuesCol-dark"}>
                            <h2>Curiosity.</h2>
                            <p>augue interdum velit euismod in pellentesque massa placerat duis ultricies</p>
                        </Col>
                        <Col lg={{ span: 6 }} className={!darkMode ? "valuesCol" : "valuesCol-dark"}>
                            <h2>Adaptability</h2>
                            <p>augue interdum velit euismod in pellentesque massa placerat duis ultricies</p>
                        </Col>
                        <Col lg={{ span: 6 }} className={!darkMode ? "valuesCol" : "valuesCol-dark"}>
                            <h2>Simplicity</h2>
                            <p>augue interdum velit euismod in pellentesque massa placerat duis ultricies</p>
                        </Col>
                        <Col lg={{ span: 6 }} className={!darkMode ? "valuesCol" : "valuesCol-dark"}>
                            <h2>Impact</h2>
                            <p>augue interdum velit euismod in pellentesque massa placerat duis ultricies</p>
                        </Col>
                    </Row>
                </Container>
            </Container>


            <Container className="py-5">
                <Row className={!darkMode ? "m-5 d-flex wow fadeInLeft" : "m-5 d-flex wow fadeInLeft"} data-wow-duration="3s">
                    <h1 className="titleh1">Our Team</h1>

                    <Col lg={{ span: 6 }} className="d-flex justify-content-center">
                        <Card className={!darkMode ? "profile-card" : "profile-card-dark"} >
                            <Card.Header className="p-5">
                                <Card.Img variant="top" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1673869820/Alberto_Naval_eegvyj.jpg" className={!darkMode ? "cardImg" : "cardImg-dark"} />
                            </Card.Header>
                            <Card.Body className={!darkMode ? " cardBody" : "cardBody-dark"}>
                                <Card.Title className="title">Alberto Naval</Card.Title>
                                <Card.Text className="subTitle">
                                    Web Developer
                                </Card.Text>
                            </Card.Body>
                            <Card.Body className={!darkMode ? "cardBodyLink" : "cardBodyLink-dark"} >
                                <Card.Link href="https://www.linkedin.com/in/alberto-naval/">
                                    <i className={!darkMode ? "bi bi-linkedin purpleLink" : "bi bi-linkedin purpleLink-dark"}></i>
                                </Card.Link>
                                <Card.Link href="https://github.com/albertonaval">
                                    <i className={!darkMode ? "bi bi-github purpleLink" : "bi bi-github purpleLink-dark"}></i>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={{ span: 6 }} className="d-flex justify-content-center">
                        <Card className={!darkMode ? "profile-card" : "profile-card-dark"}>
                            <Card.Header className="p-5">
                                <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/88399410?v=4" className={!darkMode ? "cardImg" : "cardImg-dark"} />
                            </Card.Header>
                            <Card.Body className={!darkMode ? "cardBody" : "cardBody-dark"}>
                                <Card.Title className="title">Manuel Atance</Card.Title>
                                <Card.Text className="subTitle">
                                    Web Developer
                                </Card.Text>
                            </Card.Body>
                            <Card.Body className={!darkMode ? "cardBodyLink" : "cardBodyLink-dark"}>
                                <Card.Link href="https://www.linkedin.com/in/manuel-atance/">
                                    <i className={!darkMode ? "bi bi-linkedin purpleLink" : "bi bi-linkedin purpleLink-dark"}></i>
                                </Card.Link>
                                <Card.Link href="https://github.com/3Ryuusei3">
                                    <i className={!darkMode ? "bi bi-github purpleLink" : "bi bi-github purpleLink-dark"}></i>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <hr />
                <Row className="text-center pt-5 wow fadeInUp ">
                    <img className="home-icon mb-3" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670318446/favicon_rpvk1o.ico" alt="" />
                    <h2>Start using slake. today</h2>
                    <h4 className="pt-2 pb-5">Get started for free.</h4>
                    <Link to="/signup" className="purple-btn mb-5 px-5 py-2" style={{ maxWidth: "max-content", marginInline: "auto" }}>
                        Try slake. for free
                    </Link>
                </Row>
                <hr />
            </Container>
            <Container fluid className={!darkMode ? "footer px-5 py-4" : "footer-dark px-5 py-4"}>
                ©️ Developed by <a href="https://github.com/3Ryuusei3">Manuel Atance</a> and <a href="https://github.com/albertonaval">Alberto Naval</a>
            </Container>
        </>
    )

}

export default About
