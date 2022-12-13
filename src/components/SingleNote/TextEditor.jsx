import { useState, useContext } from "react"

import { SidebarContext } from "../../context/sidebar.context"
import singleNoteService from "../../services/singleNote.service"

function TextEditor({ singleNoteData, noteId }) {
	const [block, setBlock] = useState([...singleNoteData.block])
	const [blockId, setBlockId] = useState("")
	const [showMenu, setShowMenu] = useState(false)

	const { isSidebarOpen } = useContext(SidebarContext)

	const handleBlockUpdate = newBlock => {
		singleNoteService
			.getNoteByNoteId(noteId)
			.then(res => {
				return singleNoteService.updateBlocks(res.data._id, [...newBlock])
			})
			.catch(err => console.log({ message: "Internal server error:", err }))
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
		newBlockList.splice(idx, 1)
		setBlock(newBlockList)
		handleBlockUpdate(newBlockList)
	}

	const handleBlockText = (i, e) => {
		let blocksCopy = [...block]
		blocksCopy[i].content = e.target.value
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	// Mouse and menu handle
	const handleMouseOver = id => {
		setBlockId(id)
	}

	const handleMouseOut = () => {
		setBlockId("")
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

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm my-3" : "leftPaddingLg my-3"} style={{ marginRight: "80px" }}>
			<div className="blockList pt-2 pb-5">
				<ul className="blockUl">
					{block.map((elm, idx) => {
						return (
							<li className="block" key={idx} onMouseOver={() => handleMouseOver(idx)} onMouseOut={handleMouseOut}>
								{blockId === idx && (
									<button
										className="blockHandler"
										onClick={() => {
											handleBlockMenu()
										}}
									>
										<i className="bi bi-grid-3x2-gap"></i>
									</button>
								)}
								{blockId === idx && showMenu && (
									<div className="blockMenu" onMouseOut={handleMenuOut} onMouseOver={handleMenuIn}>
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
											<li className="me-3">
												<button onClick={() => changeIntoP(blockId)}>
													<i className="bi bi-paragraph"></i>
												</button>
											</li>
											<li>
												<button onClick={() => deleteType(blockId)}>
													<i class="bi bi-fonts"></i>
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
								<div style={{ width: "100%" }}>
									<input
										type="text"
										className={`${elm.htmlTag}Block color${elm.style} ${elm.type}Block`}
										name={`block${idx}`}
										value={elm.content}
										onKeyDown={e => manageBlockByKey(e, elm, idx)}
										onChange={e => handleBlockText(idx, e)}
									/>
								</div>
								{blockId === idx && block.length > 1 && (
									<button className="deleteBlock" onClick={() => deleteBlock(idx)}>
										<i className="bi bi-trash3"></i>
									</button>
								)}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default TextEditor

/* 

autoFocus={idx === blockId + 1 ? true : false}

*/
