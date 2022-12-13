import { useState, useContext } from "react"

import { SidebarContext } from "../../context/sidebar.context"
import singleNoteService from "../../services/singleNote.service"

function TextEditor({ singleNoteData, noteId }) {
	const [block, setBlock] = useState([...singleNoteData.block])
	const [input, setInput] = useState("")
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

	const addBlock = item => {
		const newBlock = {
			content: item,
			htmlTag: "p",
		}
		setBlock([...block, newBlock])
		handleBlockUpdate([...block, newBlock])
		setInput("")
	}

	const deleteBlock = idx => {
		let newBlockList = [...block]
		newBlockList.splice(idx, 1)
		setBlock(newBlockList)
		handleBlockUpdate(newBlockList)
	}

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

	const handleBlockText = (i, e) => {
		let blocksCopy = [...block]
		blocksCopy[i].content = e.target.value
		setBlock(blocksCopy)
		handleBlockUpdate(blocksCopy)
	}

	const createNewBlock = e => {
		console.log("keydown")
		if (e.key === "Enter") {
			addBlock("")
		}
	}

	const handleBlockMenu = () => {
		setShowMenu(!showMenu)
	}

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

	return (
		<div className={!isSidebarOpen ? "leftPaddingSm my-3" : "leftPaddingLg my-3"}>
			<div className="todoList pt-2 pb-5">
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
										<i class="bi bi-grid-3x2-gap"></i>
									</button>
								)}
								{blockId === idx && showMenu && (
									<div className="blockMenu" onMouseOut={handleMenuOut} onMouseOver={handleMenuIn}>
										<ul>
											<li>
												<button onClick={() => changeIntoH1(blockId)}>
													<i class="bi bi-type-h1"></i>
												</button>
											</li>
											<li>
												<button onClick={() => changeIntoH2(blockId)}>
													<i class="bi bi-type-h2"></i>
												</button>
											</li>
											<li>
												<button onClick={() => changeIntoH3(blockId)}>
													<i class="bi bi-type-h3"></i>
												</button>
											</li>
											<li>
												<button onClick={() => changeIntoP(blockId)}>
													<i class="bi bi-paragraph"></i>
												</button>
											</li>
										</ul>
									</div>
								)}
								<div style={{ width: "100%" }}>
									<input
										type="text"
										className={`${elm.htmlTag}block`}
										name={`block${idx}`}
										value={elm.content}
										onKeyDown={createNewBlock}
										onChange={e => handleBlockText(idx, e)}
										autoFocus={idx === block.length - 1 ? true : false}
									/>
								</div>
								{blockId === idx && (
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
