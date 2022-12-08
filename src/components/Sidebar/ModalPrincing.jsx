import { useContext, useState } from "react"
import { Modal } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"



const ModalPricing = ({ showModalPricing, setShowModalPricing }) => {


    const { user } = useContext(AuthContext)

    const [userData, setUserData] = useState({
        role: user.role
    })


    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModalPricing}
        >
            <Modal.Header closeButton onClick={() => setShowModalPricing(false)}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPricing