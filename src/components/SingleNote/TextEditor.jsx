import { useContext, useId, useState } from "react"

import { SidebarContext } from "../../context/sidebar.context"

import EditBlock from "./EditBlock"

function TextEditor() {
	const rId = () => {
		return Date.now().toString(36) + Math.random().toString(36).substring(2)
	}

	const initialBlock = {
		id: rId(),
		content: "Hola",
		htmlTag: "h3",
	}

	const [blocks, setBlocks] = useState([initialBlock])

	const { isSidebarOpen } = useContext(SidebarContext)

	const updatePageHandler = updatedBlock => {
		const idx = blocks.map(elm => elm.id).indexOf(updatedBlock.id)
		const updatedBlocks = [...blocks]
		updatedBlocks[idx] = {
			...updatedBlocks[idx],
			htmlTag: updatedBlock.htmlTag,
			content: updatedBlock.content,
		}
		setBlocks(updatedBlocks)
	}

	const addBlockHandler = currentBlock => {
		const newBlock = { id: rId(), htmlTag: "p", content: "" }
		const idx = blocks.map(elm => elm.id).indexOf(currentBlock.id)
		const updatedBlocks = [...blocks]
		updatedBlocks.splice(idx + 1, 0, newBlock)
		setBlocks(updatedBlocks)
	}

	const deleteBlockHandler = currentBlock => {
		if (blocks.length > 1) {
			const idx = blocks.map(elm => elm.id).indexOf(currentBlock.id)
			const updatedBlocks = [...blocks]
			updatedBlocks.splice(idx, 1)
			setBlocks(updatedBlocks)
		}
	}

	return (
		<>
			{blocks && (
				<div className={!isSidebarOpen ? "leftPaddingSm my-3" : "leftPaddingLg my-3"} style={{ marginRight: "70px" }}>
					{blocks.map((block, idx) => {
						return <EditBlock key={idx} id={block.id} htmlTag={block.htmlTag} content={block.content} updatedPage={updatePageHandler} addBlock={addBlockHandler} deleteBlock={deleteBlockHandler} />
					})}
				</div>
			)}
		</>
	)
}

export default TextEditor

/* 

const rId = () => {
		return Date.now().toString(36) + Math.random().toString(36).substring(2)
	}

	const initialBlock = {
		id: rId(),
		content: "Hola",
		htmlTag: "h1",
	}

	const [blocks, setBlocks] = useState([initialBlock])


	return (
		<div key={idx} id={block.id}>
			HTMLTag: {block.htmlTag}, Content: {block.content}
		</div>
	)

*/
