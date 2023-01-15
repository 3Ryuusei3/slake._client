import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

import { tags, types, colors } from "../../const/blocks"

const BlockMenu = ({ blockId, handleMenuIn, handleMenuOut, changeIntoTag, changeIntoType, changeIntoColor, openImgModal }) => {
	const { darkMode } = useContext(DarkModeContext)

	return (
		<div className={!darkMode ? "blockMenu" : "blockMenu-dark"} onMouseOut={handleMenuOut} onMouseOver={handleMenuIn}>
			<ul className="pe-4">
				{tags.map(elm => {
					return (
						<li>
							<button
								onClick={
									elm.tag !== "img"
										? () => changeIntoTag(blockId, elm.tag)
										: () => {
												changeIntoTag(blockId, elm.tag)
												openImgModal()
										  }
								}
							>
								<i className={`bi ${elm.icon}`}></i>
							</button>
						</li>
					)
				})}
			</ul>
			<ul className="pe-4">
				{types.map(elm => {
					return (
						<li>
							<button onClick={() => changeIntoColor(blockId, elm.color)}>
								<i className={`bi ${elm.icon}`}></i>
							</button>
						</li>
					)
				})}
			</ul>
			<ul>
				{colors.map(elm => {
					return (
						<li>
							<button onClick={() => changeIntoType(blockId, elm.type)}>
								<div className={`colorBlock color${elm.class}`}></div>
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default BlockMenu
