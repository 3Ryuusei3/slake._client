import { useState, useContext, useEffect, useRef, useLayoutEffect } from "react"

import { AuthContext } from "../../context/auth.context"
import { SidebarContext } from "../../context/sidebar.context"
import { DarkModeContext } from "../../context/darkmode.context"

import CategoryMenu from "./CategoryMenu"
import BlockMenu from "./BlockMenu"

import singleNoteService from "../../services/singleNote.service"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Modal } from "react-bootstrap"
import toast from "react-hot-toast"
import NewBlockImageForm from "./NewImageForm"

const TextEditor = ({ singleNoteData, noteId }) => {
	const [noteInfo, setNoteInfo] = useState(false)
	const [tag, setTag] = useState(singleNoteData.tag)
	const [categoryMenu, setCategoryMenu] = useState(false)
	const [shared, setShared] = useState(singleNoteData.shared)
	const [block, setBlock] = useState([...singleNoteData.block])
	const [blockId, setBlockId] = useState("")
	const [clikedBlockId, setClickedBlockId] = useState("")
	const [blockMenu, setBlockMenu] = useState(false)
	const [offset, setOffset] = useState()
	const [showImgModal, setShowImgModal] = useState(false)

	const blockRef = useRef([])

	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)
	const { user } = useContext(AuthContext)

	const notify = () => toast.error("You cannot edit this note")

	if (user._id !== singleNoteData.owner) {
		notify()
	}

	// References for correct caret positioning
	useEffect(() => {
		blockRef.current = blockRef.current.slice(0, block.length)
	}, [block])

	useLayoutEffect(() => {
		if (offset !== undefined && offset > 0) {
			const newRange = document.createRange()
			newRange.setStart(blockRef.current[clikedBlockId].childNodes[0], offset)

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
		setOffset(undefined)
		setBlockId("")
	}

	const handleMenuOut = () => {
		setBlockMenu(false)
	}

	const handleMenuIn = () => {
		setBlockMenu(true)
	}

	const handleBlockMenu = () => {
		setBlockMenu(!blockMenu)
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
	//// Tag
	const changeIntoTag = (i, tag) => {
		let blocksCopy = [...block]
		blocksCopy[i].htmlTag = `${tag}`
		blocksCopy[i].imageUrl = ""
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	//// Type
	const changeIntoType = (i, type) => {
		let blocksCopy = [...block]
		blocksCopy[i].type = `${type}`
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	//// Color
	const changeIntoColor = (i, color) => {
		let blocksCopy = [...block]
		blocksCopy[i].style = `${color}`
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	// Drag and Drop
	const handleOnDragEnd = result => {
		if (!result.destination) return

		let newBlockList = [...block]
		const [reorderedItem] = newBlockList.splice(result.source.index, 1)
		newBlockList.splice(result.destination.index, 0, reorderedItem)
		setBlock(newBlockList)
		handleBlockUpdate(newBlockList)
	}

	// Image upload
	const openImgModal = () => setShowImgModal(true)
	const closeImgModal = () => setShowImgModal(false)

	const changeImgUrl = (i, url) => {
		let blocksCopy = [...block]
		blocksCopy[i].imageUrl = url
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	return (
		<article className={!isSidebarOpen ? "leftPaddingSm rightMargin py-3" : "leftPaddingLg rightMargin py-3"}>
			<section style={user._id !== singleNoteData.owner ? { pointerEvents: "none" } : {}} className={!darkMode ? "blockList pt-2 pb-5" : "blockList-dark pt-2 pb-5"}>
				{user._id === singleNoteData.owner && (
					<button
						onClick={() => {
							setNoteInfo(val => !val)
						}}
						style={noteInfo ? { rotate: "-90deg", transition: "0.4s ease" } : { rotate: "0deg", transition: "0.4s ease" }}
						className={!darkMode ? "noteInfoBtn" : "noteInfoBtn-dark"}
					>
						<i className="bi bi-three-dots-vertical"></i>
					</button>
				)}
				{noteInfo && (
					<div style={noteInfo ? { "--note-info": "fade-in" } : { "--note-info": "fade-out" }} className={!darkMode ? "noteInfo py-4 px-3" : "noteInfo-dark py-4 px-3"}>
						<div>
							<CategoryMenu
								tag={tag}
								showCategoryMenu={showCategoryMenu}
								categoryMenu={categoryMenu}
								handleMouseOverCategory={handleMouseOverCategory}
								handleMouseOutCategory={handleMouseOutCategory}
								handleNoteCategory={handleNoteCategory}
							/>
							<div className="d-flex ms-5 align-items-center">
								<p className="me-2 mb-0">Shared:</p>
								<input className="mb-0" type="checkbox" onChange={handleNoteCheck} checked={shared ? true : false} />
							</div>
						</div>
						<button onClick={() => window.print()} className="printBtn">
							<i className="bi bi-printer"></i>
						</button>
					</div>
				)}
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="blocks">
						{provided => (
							<ul className="blockUl" {...provided.droppableProps} ref={provided.innerRef}>
								{block.map((elm, idx) => {
									return (
										<Draggable key={idx} draggableId={`${idx}`} index={idx}>
											{provided => (
												<li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className="block" onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
													{blockId === idx && (
														<div
															onClick={() => {
																handleBlockMenu()
															}}
															{...provided.dragHandleProps}
															className={!darkMode ? "blockHandler" : "blockHandler-dark"}
														>
															<i className="bi bi-grid-3x2-gap"></i>
														</div>
													)}
													{blockId === idx && blockMenu && (
														<BlockMenu
															blockId={blockId}
															handleMenuIn={handleMenuIn}
															handleMenuOut={handleMenuOut}
															changeIntoTag={changeIntoTag}
															changeIntoType={changeIntoType}
															changeIntoColor={changeIntoColor}
															openImgModal={openImgModal}
														/>
													)}
													{elm.htmlTag !== "img" ? (
														<div
															name={`block${idx}`}
															className={
																!darkMode
																	? `blockLine ${elm.htmlTag}Block color${elm.style} ${elm.type}Block fontLight`
																	: `blockLine-dark ${elm.htmlTag}Block color${elm.style}Dark ${elm.type}Block fontDark`
															}
															contentEditable={user._id !== singleNoteData.owner ? false : true}
															suppressContentEditableWarning
															spellCheck={false}
															onInput={e => handleBlockText(idx, e)}
															onKeyDown={e => manageBlockByKey(e, elm, idx)}
															onBlur={() => {
																setOffset(undefined)
																setClickedBlockId("")
															}}
															ref={el => (blockRef.current[idx] = el)}
															onClick={() => setClickedBlockId(idx)}
														>
															{elm.content}
														</div>
													) : (
														<figure>
															<img
																className="blockImg"
																src={elm.imageUrl}
																alt=""
																name={`block${idx}`}
																onKeyDown={e => manageBlockByKey(e, elm, idx)}
																onBlur={() => {
																	setOffset(undefined)
																	setClickedBlockId("")
																}}
																ref={el => (blockRef.current[idx] = el)}
																onClick={() => setClickedBlockId(idx)}
															/>
															{elm.content && (
																<figcaption
																	contentEditable={user._id !== singleNoteData.owner ? false : true}
																	suppressContentEditableWarning
																	spellCheck={false}
																	onInput={e => handleBlockText(idx, e)}
																	onKeyDown={e => manageBlockByKey(e, elm, idx)}
																	ref={el => (blockRef.current[idx] = el)}
																	onClick={() => setClickedBlockId(idx)}
																>
																	{elm.content}
																</figcaption>
															)}
														</figure>
													)}
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
				<Modal className={darkMode && "modal-dark"} show={showImgModal} onHide={closeImgModal}>
					<Modal.Header closeButton>
						<Modal.Title>Add image</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<NewBlockImageForm setShowImgModal={setShowImgModal} changeImgUrl={changeImgUrl} blockId={blockId} clikedBlockId={clikedBlockId} />
					</Modal.Body>
				</Modal>
			</section>
		</article>
	)
}

export default TextEditor
