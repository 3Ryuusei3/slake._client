import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

const BlockMenu = ({ blockId, handleMenuIn, handleMenuOut, changeIntoTag, changeIntoType, changeIntoColor, openImgModal }) => {
	const { darkMode } = useContext(DarkModeContext)

	return (
		<div className={!darkMode ? "blockMenu" : "blockMenu-dark"} onMouseOut={handleMenuOut} onMouseOver={handleMenuIn}>
			<ul>
				<li>
					<button onClick={() => changeIntoTag(blockId, "h1")}>
						<i className="bi bi-type-h1"></i>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoTag(blockId, "h2")}>
						<i className="bi bi-type-h2"></i>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoTag(blockId, "h3")}>
						<i className="bi bi-type-h3"></i>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoTag(blockId, "p")}>
						<i className="bi bi-paragraph"></i>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoTag(blockId, "ul")}>
						<i className="bi bi-list-ul"></i>
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							changeIntoTag(blockId, "img")
							openImgModal()
						}}
					>
						<i className="bi bi-image"></i>
					</button>
				</li>
				<li className="me-3">
					<button onClick={() => changeIntoTag(blockId, "callout")}>
						<i className="bi bi-lightning-fill"></i>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoType(blockId, "")}>
						<i className="bi bi-fonts"></i>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoType(blockId, "bold")}>
						<i className="bi bi-type-bold"></i>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoType(blockId, "italics")}>
						<i className="bi bi-type-italic"></i>
					</button>
				</li>
				<li className="me-3">
					<button onClick={() => changeIntoType(blockId, "underline")}>
						<i className="bi bi-type-underline"></i>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoColor(blockId, "")}>
						<div className="colorBlock colorTextNone"></div>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoColor(blockId, "Theme")}>
						<div className="colorBlock colorNone"></div>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoColor(blockId, "Blue")}>
						<div className="colorBlock colorTextBlue"></div>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoColor(blockId, "Red")}>
						<div className="colorBlock colorTextRed"></div>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoColor(blockId, "Yellow")}>
						<div className="colorBlock colorTextYellow"></div>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoColor(blockId, "Green")}>
						<div className="colorBlock colorTextGreen"></div>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoColor(blockId, "Orange")}>
						<div className="colorBlock colorTextOrange"></div>
					</button>
				</li>
				<li>
					<button onClick={() => changeIntoColor(blockId, "Purple")}>
						<div className="colorBlock colorTextPurple"></div>
					</button>
				</li>
			</ul>
		</div>
	)
}

export default BlockMenu
