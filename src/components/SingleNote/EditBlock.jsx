import { useEffect, useState, useRef } from "react"
import ContentEditable from "react-contenteditable"
import SelectMenu from "./SelectMenu"

function EditBlock({ id, htmlTag, content, updatedPage, addBlock, deleteBlock }) {
	const [menuIsOpen, setIsMenuOpen] = useState(true)
	const [menuPosition, setMenuPosition] = useState({
		x: null,
		y: null,
	})

	const contentEditable = useRef()

	const onKeyDownHandler = e => {
		if (e.key === "Enter") {
			e.preventDefault()

			addBlock({
				id: id,
				ref: contentEditable,
			})
		}
		if (e.key === "Backspace" && content === "") {
			e.preventDefault()

			deleteBlock({
				id: id,
				ref: contentEditable,
			})
		}
	}

	const onKeyUpHandler = e => {
		if (e.key === "/") {
			openSelectMenuHandler(true)
		}
	}

	const getCaretCoordinates = () => {
		let x, y
		const selection = window.getSelection()
		if (selection.rangeCount !== 0) {
			const range = selection.getRangeAt(0).cloneRange()
			range.collapse(false)
			const rect = range.getClientRects()[0]
			if (rect) {
				x = rect.left
				y = rect.top
			}
		}
		return { x, y }
	}

	const openSelectMenuHandler = () => {
		const { x, y } = getCaretCoordinates()
		setIsMenuOpen(true)
		setMenuPosition({
			x,
			y,
		})
		document.addEventListener("click", closeSelectMenuHandler)
	}

	const setCaretToEnd = element => {
		const range = document.createRange()
		const selection = window.getSelection()
		range.selectNodeContents(element)
		range.collapse(false)
		selection.removeAllRanges()
		selection.addRange(range)
		element.focus()
	}

	const closeSelectMenuHandler = () => {
		setIsMenuOpen(false)
		setMenuPosition({
			x: null,
			y: null,
		})
		document.removeEventListener("click", this.closeSelectMenuHandler)
	}

	const tagSelectionHandler = tag => {
		htmlTag = tag

		setCaretToEnd(contentEditable.current)
		this.closeSelectMenuHandler()
	}

	return (
		<>
			{menuIsOpen && <SelectMenu position={menuPosition} onSelect={tagSelectionHandler} close={closeSelectMenuHandler} />}
			<ContentEditable className="block" ref={contentEditable} html={content} tagName={htmlTag} onKeyDown={onKeyDownHandler} onKeyUp={onKeyUpHandler} />
		</>
	)
}

export default EditBlock
