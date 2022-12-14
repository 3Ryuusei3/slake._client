import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"

import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"

import { Modal } from "react-bootstrap"
import NewHeaderImgForm from "./NewHeaderImgForm"

function HeaderImage({ headerImg, setHeaderData }) {
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
			<div style={!isSidebarOpen ? { paddingLeft: "80px", transition: "0.3s ease", position: "relative" } : { paddingLeft: "230px", transition: "0.4s ease", position: "relative" }}>
				{showIcon && !isSharedRoute && (
					<button className="headerImageButton" onMouseOver={handleMouseOver} onClick={openImgModal}>
						<i className="bi bi-image"></i>
					</button>
				)}
				<img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="headerImg" src={headerImg} alt="" />
			</div>
			<Modal show={showImgModal} onHide={closeImgModal}>
				<Modal.Header
					style={!darkMode ? { color: "var(--text-primary)", backgroundColor: "var(--bg-navbar)" } : { color: "var(--dark-text-primary)", backgroundColor: "var(--dark-bg-navbar)" }}
					closeButton
				>
					<Modal.Title>Change header image</Modal.Title>
				</Modal.Header>
				<Modal.Body style={!darkMode ? { color: "var(--text-primary)", backgroundColor: "var(--bg-navbar)" } : { color: "var(--dark-text-primary)", backgroundColor: "var(--dark-bg-navbar)" }}>
					<NewHeaderImgForm setShowImgModal={setShowImgModal} setHeaderData={setHeaderData} />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default HeaderImage
