import { useContext, useState } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

import { tagArray } from "../../const/labels"

const CategoryMenu = ({ tag, categoryMenu, showCategoryMenu, handleMouseOverCategory, handleMouseOutCategory, handleNoteCategory }) => {
	const { darkMode } = useContext(DarkModeContext)

	return (
		<div className="d-flex align-items-center position-relative">
			<p className="me-2 mb-0 noteCategoryName ">Category:</p>
			<p onClick={showCategoryMenu} className={!darkMode ? `noteCategory ${tag}Category mb-0` : `noteCategory ${tag}CategoryDark mb-0`}>
				{tag}
			</p>
			{categoryMenu && (
				<div onMouseOver={handleMouseOverCategory} onMouseOut={handleMouseOutCategory} className={!darkMode ? "categoryMenu" : "categoryMenu-dark"}>
					<ul>
						{tagArray.map(elm => {
							return (
								<li>
									<button onClick={handleNoteCategory} name={elm.tag} className={!darkMode ? `categoryBtn noteCategory ${elm.tag}Category` : `categoryBtn-dark noteCategory ${elm.tag}CategoryDark`}>
										{elm.tag}
									</button>
								</li>
							)
						})}
					</ul>
				</div>
			)}
		</div>
	)
}

export default CategoryMenu
