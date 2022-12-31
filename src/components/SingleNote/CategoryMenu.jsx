import { useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"

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
						<li>
							<button onClick={handleNoteCategory} name="Diary" className={!darkMode ? "categoryBtn noteCategory DiaryCategory" : "categoryBtn-dark noteCategory DiaryCategoryDark"}>
								Diary
							</button>
						</li>
						<li>
							<button onClick={handleNoteCategory} name="Work" className={!darkMode ? "categoryBtn noteCategory WorkCategory" : "categoryBtn-dark noteCategory WorkCategoryDark"}>
								Work
							</button>
						</li>
						<li>
							<button onClick={handleNoteCategory} name="School" className={!darkMode ? "categoryBtn noteCategory SchoolCategory" : "categoryBtn-dark noteCategory SchoolCategoryDark"}>
								School
							</button>
						</li>
						<li>
							<button onClick={handleNoteCategory} name="Travel" className={!darkMode ? "categoryBtn noteCategory TravelCategory" : "categoryBtn-dark noteCategory TravelCategoryDark"}>
								Travel
							</button>
						</li>
						<li>
							<button onClick={handleNoteCategory} name="Social" className={!darkMode ? "categoryBtn noteCategory SocialCategory" : "categoryBtn-dark noteCategory SocialCategoryDark"}>
								Social
							</button>
						</li>
						<li>
							<button onClick={handleNoteCategory} name="Other" className={!darkMode ? "categoryBtn noteCategory OtherCategory" : "categoryBtn-dark noteCategory OtherCategoryDark"}>
								Other
							</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default CategoryMenu
