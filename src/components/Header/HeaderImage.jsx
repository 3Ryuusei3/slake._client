import { useState } from "react"
import { Modal } from "react-bootstrap"
import NewHeaderImgForm from "./NewHeaderImgForm"

function HeaderImage({ isSidebarOpen, headerData, setHeaderData }) {
	const [showIcon, setShowIcon] = useState(false)
	const [showImgModal, setShowImgModal] = useState(false)

	const handleMouseOver = () => {
		setShowIcon(true)
	}

	const handleMouseOut = () => {
		setShowIcon(false)
	}

	const openImgModal = () => setShowImgModal(true)
	const closeImgModal = () => setShowImgModal(false)

	return (
		<>
			<div style={!isSidebarOpen ? { paddingLeft: "80px", transition: "0.3s ease", position: "relative" } : { paddingLeft: "230px", transition: "0.4s ease", position: "relative" }}>
				{showIcon && (
					<button className="headerImageButton" onMouseOver={handleMouseOver} onClick={openImgModal}>
						<i className="bi bi-image"></i>
					</button>
				)}
				<img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="headerImg" src={headerData.header.image} alt="" />
			</div>
			<Modal show={showImgModal} onHide={closeImgModal}>
				<Modal.Header closeButton>
					<Modal.Title>Change header image</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<NewHeaderImgForm setShowImgModal={setShowImgModal} setHeaderData={setHeaderData} />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default HeaderImage
