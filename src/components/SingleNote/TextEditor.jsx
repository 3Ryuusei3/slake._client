import { useState, useContext, useEffect, useRef, useLayoutEffect } from "react"

import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"
import { DarkModeContext } from "../../context/darkmode.context"

import singleNoteService from "../../services/singleNote.service"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import toast from "react-hot-toast"

function TextEditor({ singleNoteData, noteId }) {
	const [tag, setTag] = useState(singleNoteData.tag)
	const [categoryMenu, setCategoryMenu] = useState(false)
	const [shared, setShared] = useState(singleNoteData.shared)
	const [block, setBlock] = useState([...singleNoteData.block])
	const [blockId, setBlockId] = useState("")
	const [showMenu, setShowMenu] = useState(false)
	const [offset, setOffset] = useState()

	const blockRef = useRef([])

	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)
	const { user } = useContext(AuthContext)

	const notify = () => toast.error("You cannot edit this note")

	if (user._id !== singleNoteData.owner) {
		notify()
	}

	/* References for correct caret positioning */

	useEffect(() => {
		blockRef.current = blockRef.current.slice(0, singleNoteData.block.length)
	}, [block])

	useLayoutEffect(() => {
		if (offset !== undefined && offset > 0) {
			const newRange = document.createRange()
			newRange.setStart(blockRef.current[blockId].childNodes[0], offset)

			const selection = document.getSelection()
			selection.removeAllRanges()
			selection.addRange(newRange)
		}
	})

	const handleMetadataUpdate = metadata => {
		singleNoteService
			.getNoteByNoteId(noteId)
			.then(res => {
				return singleNoteService.updateMetadata(res.data._id, { ...metadata })
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	const handleBlockUpdate = newBlock => {
		singleNoteService
			.getNoteByNoteId(noteId)
			.then(res => {
				return singleNoteService.updateBlocks(res.data._id, [...newBlock])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
	}

	// Handle note metadata
	const handleNoteCheck = () => {
		setShared(!shared)
		handleMetadataUpdate({ tag, shared: !shared })
	}

	const handleNoteCategory = e => {
		e.preventDefault()
		setTag(e.target.name)
		handleMetadataUpdate({ tag: e.target.name, shared })
		setCategoryMenu(false)
	}

	const showCategoryMenu = () => {
		setCategoryMenu(true)
	}

	const handleMouseOverCategory = id => {
		setCategoryMenu(true)
	}

	const handleMouseOutCategory = id => {
		setCategoryMenu(false)
	}

	// Add, edit or Delete blocks
	const addBlockAtIdx = (item, idx) => {
		const newBlock = {
			content: item,
			htmlTag: "p",
			style: "",
			type: "",
		}
		let newBlockList = [...block]
		newBlockList.splice(idx + 1, 0, newBlock)
		setBlock(newBlockList)
		handleBlockUpdate(newBlockList)
	}

	const deleteBlock = idx => {
		let newBlockList = [...block]
		setOffset(undefined)
		newBlockList.splice(idx, 1)
		setBlock(newBlockList)
		handleBlockUpdate(newBlockList)
	}

	const handleBlockText = (i, e) => {
		const range = document.getSelection().getRangeAt(0)
		setOffset(range.startOffset)

		let blocksCopy = [...block]
		blocksCopy[i].content = e.target.textContent
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	// Mouse and menu handle
	const handleMouseOver = id => {
		setBlockId(id)
	}

	const handleMouseOut = () => {
		setBlockId("")
		setOffset(undefined)
	}

	const handleMenuOut = () => {
		setShowMenu(false)
	}

	const handleMenuIn = () => {
		setShowMenu(true)
	}

	const handleBlockMenu = () => {
		setShowMenu(!showMenu)
	}

	// Block management by key
	const manageBlockByKey = (e, elm, idx) => {
		if (e.key === "Enter") {
			addBlockAtIdx("", idx)
		}
		if (e.key === "Backspace" && elm.content === "") {
			e.preventDefault()
			deleteBlock(idx)
		}
		if (e.key === "ArrowDown" && idx < block.length) {
		}
		if (e.key === "ArrowUp" && idx > block.length) {
		}
	}

	// Block styling
	const changeIntoH1 = i => {
		let blocksCopy = [...block]
		blocksCopy[i].htmlTag = "h1"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const changeIntoH2 = i => {
		let blocksCopy = [...block]
		blocksCopy[i].htmlTag = "h2"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const changeIntoH3 = i => {
		let blocksCopy = [...block]
		blocksCopy[i].htmlTag = "h3"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const changeIntoP = i => {
		let blocksCopy = [...block]
		blocksCopy[i].htmlTag = "p"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const changeIntoUl = i => {
		let blocksCopy = [...block]
		blocksCopy[i].htmlTag = "ul"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const changeIntoBold = i => {
		let blocksCopy = [...block]
		blocksCopy[i].type = "bold"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const changeIntoItalics = i => {
		let blocksCopy = [...block]
		blocksCopy[i].type = "italics"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const changeIntoUnderline = i => {
		let blocksCopy = [...block]
		blocksCopy[i].type = "underline"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const deleteType = i => {
		let blocksCopy = [...block]
		blocksCopy[i].type = ""
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const colorNone = i => {
		let blocksCopy = [...block]
		blocksCopy[i].style = ""
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const colorBlue = i => {
		let blocksCopy = [...block]
		blocksCopy[i].style = "Blue"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const colorRed = i => {
		let blocksCopy = [...block]
		blocksCopy[i].style = "Red"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const colorYellow = i => {
		let blocksCopy = [...block]
		blocksCopy[i].style = "Yellow"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const colorGreen = i => {
		let blocksCopy = [...block]
		blocksCopy[i].style = "Green"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const colorOrange = i => {
		let blocksCopy = [...block]
		blocksCopy[i].style = "Orange"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const colorPurple = i => {
		let blocksCopy = [...block]
		blocksCopy[i].style = "Purple"
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	// Drag and Drop
	function handleOnDragEnd(result) {
		if (!result.destination) return

		let newBlockList = [...block]
		const [reorderedItem] = newBlockList.splice(result.source.index, 1)
		newBlockList.splice(result.destination.index, 0, reorderedItem)
		setBlock(newBlockList)
		handleBlockUpdate(newBlockList)
	}

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm py-3" : "leftPaddingLg py-3"} style={{ marginRight: "80px" }}>
			<div style={user._id !== singleNoteData.owner ? { pointerEvents: "none" } : {}} className={!darkMode ? "blockList pt-2 pb-5" : "blockList-dark pt-2 pb-5"}>
				<div className="d-flex gap-5 pb-3">
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
					<div className="d-flex ms-5 align-items-center">
						<p className="me-2 mb-0">Shared:</p>
						<input className="mb-0" type="checkbox" onChange={handleNoteCheck} checked={shared ? true : false} />
					</div>
				</div>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="blocks">
						{provided => (
							<ul className="blockUl" {...provided.droppableProps} ref={provided.innerRef}>
								{block.map((elm, idx) => {
									return (
										<Draggable key={idx} draggableId={`${idx}`} index={idx}>
											{provided => (
												<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="block" onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
													{blockId === idx && (
														<button
															className={!darkMode ? "blockHandler" : "blockHandler-dark"}
															onClick={() => {
																handleBlockMenu()
															}}
														>
															<i className="bi bi-grid-3x2-gap"></i>
														</button>
													)}
													{blockId === idx && showMenu && (
														<div className={!darkMode ? "blockMenu" : "blockMenu-dark"} onMouseOut={handleMenuOut} onMouseOver={handleMenuIn}>
															<ul>
																<li>
																	<button onClick={() => changeIntoH1(blockId)}>
																		<i className="bi bi-type-h1"></i>
																	</button>
																</li>
																<li>
																	<button onClick={() => changeIntoH2(blockId)}>
																		<i className="bi bi-type-h2"></i>
																	</button>
																</li>
																<li>
																	<button onClick={() => changeIntoH3(blockId)}>
																		<i className="bi bi-type-h3"></i>
																	</button>
																</li>
																<li>
																	<button onClick={() => changeIntoP(blockId)}>
																		<i className="bi bi-paragraph"></i>
																	</button>
																</li>
																<li className="me-3">
																	<button onClick={() => changeIntoUl(blockId)}>
																		<i className="bi bi-list-ul"></i>
																	</button>
																</li>
																<li>
																	<button onClick={() => deleteType(blockId)}>
																		<i className="bi bi-fonts"></i>
																	</button>
																</li>
																<li>
																	<button onClick={() => changeIntoBold(blockId)}>
																		<i className="bi bi-type-bold"></i>
																	</button>
																</li>
																<li>
																	<button onClick={() => changeIntoItalics(blockId)}>
																		<i className="bi bi-type-italic"></i>
																	</button>
																</li>
																<li className="me-3">
																	<button onClick={() => changeIntoUnderline(blockId)}>
																		<i className="bi bi-type-underline"></i>
																	</button>
																</li>
																<li>
																	<button onClick={() => colorNone(blockId)}>
																		<div className="colorBlock colorNone"></div>
																	</button>
																</li>
																<li>
																	<button onClick={() => colorBlue(blockId)}>
																		<div className="colorBlock colorTextBlue"></div>
																	</button>
																</li>
																<li>
																	<button onClick={() => colorRed(blockId)}>
																		<div className="colorBlock colorTextRed"></div>
																	</button>
																</li>
																<li>
																	<button onClick={() => colorYellow(blockId)}>
																		<div className="colorBlock colorTextYellow"></div>
																	</button>
																</li>
																<li>
																	<button onClick={() => colorGreen(blockId)}>
																		<div className="colorBlock colorTextGreen"></div>
																	</button>
																</li>
																<li>
																	<button onClick={() => colorOrange(blockId)}>
																		<div className="colorBlock colorTextOrange"></div>
																	</button>
																</li>
																<li>
																	<button onClick={() => colorPurple(blockId)}>
																		<div className="colorBlock colorTextPurple"></div>
																	</button>
																</li>
															</ul>
														</div>
													)}
													<div
														name={`block${idx}`}
														className={!darkMode ? `${elm.htmlTag}Block color${elm.style} ${elm.type}Block fontLight` : `${elm.htmlTag}Block color${elm.style}Dark ${elm.type}Block fontDark`}
														contentEditable
														suppressContentEditableWarning
														spellCheck="false"
														onInput={e => handleBlockText(idx, e)}
														onKeyDown={e => manageBlockByKey(e, elm, idx)}
														onBlur={() => setOffset(undefined)}
														ref={el => (blockRef.current[idx] = el)}
													>
														{elm.content}
													</div>
													{blockId === idx && block.length > 1 && (
														<button className={!darkMode ? "deleteBlock" : "deleteBlock-dark"} onClick={() => deleteBlock(idx)}>
															<i className="bi bi-trash3"></i>
														</button>
													)}
												</li>
											)}
										</Draggable>
									)
								})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</div>
	)
}

export default TextEditor
