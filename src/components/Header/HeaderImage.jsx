import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"

import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"

import NewHeaderImgForm from "./NewHeaderImgForm"

import { Modal } from "react-bootstrap"

const HeaderImage = ({ headerImg, setHeaderData }) => {
	const [showIcon, setShowIcon] = useState(false)
	const [showImgModal, setShowImgModal] = useState(false)

	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)

	let location = useLocation()
	let isSharedRoute = false

	if (location.pathname.includes("shared")) {
		isSharedRoute = true
	}

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
			<div className={!isSidebarOpen ? "headerImgPaddingSm" : "headerImgPaddingLg"}>
				{showIcon && !isSharedRoute && (
					<button className="headerImageButton" onMouseOver={handleMouseOver} onClick={openImgModal}>
						<i className="bi bi-image"></i>
					</button>
				)}
				<img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="headerImg" src={headerImg} alt="" />
			</div>
			<Modal className={darkMode && "modal-dark"} show={showImgModal} onHide={closeImgModal}>
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
