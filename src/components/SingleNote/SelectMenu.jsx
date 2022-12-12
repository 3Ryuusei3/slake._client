import { useEffect, useState } from "react"

function SelectMenu({ close, onSelect, position }) {
	const MENU_HEIGHT = 150
	const allowedTags = [
		{
			id: "page-title",
			htmlTag: "h1",
			label: "Page Title",
		},
		{
			id: "heading",
			htmlTag: "h2",
			label: "Heading",
		},
		{
			id: "subheading",
			htmlTag: "h3",
			label: "Subheading",
		},
		{
			id: "paragraph",
			htmlTag: "p",
			label: "Paragraph",
		},
	]

	const [menu, setMenu] = useState({
		command: "",
		items: allowedTags,
		selectedItem: 0,
	})

	const { command, items, selectedItem } = menu

	const keyDownHandler = e => {
		switch (e.key) {
			case "Enter":
				e.preventDefault()
				onSelect(items[selectedItem].htmlTag)
				break
			case "Backspace":
				if (!command) close()
				setMenu({
					command: command.substring(0, command.length - 1),
				})
				break
			case "ArrowUp":
				e.preventDefault()
				const prevSelected = selectedItem === 0 ? items.length - 1 : selectedItem - 1
				setMenu({ selectedItem: prevSelected })
				break
			case "ArrowDown":
			case "Tab":
				e.preventDefault()
				const nextSelected = selectedItem === items.length - 1 ? 0 : selectedItem + 1
				setMenu({ selectedItem: nextSelected })
				break
			default:
				setMenu({ command: command + e.key })
				break
		}
	}

	useEffect(() => {
		setMenu()
		document.removeEventListener("keydown", keyDownHandler)
	}, [])

	const x = position.x
	const y = position.y - MENU_HEIGHT
	const positionAttributes = { top: y, left: x }

	return (
		<div className="SelectMenu" style={positionAttributes}>
			<div className="Items">
				{items.map((item, idx) => {
					const isSelected = items.indexOf(item) === selectedItem
					return (
						<div className={isSelected ? "Selected" : null} key={idx} role="button" tabIndex="0" onClick={() => onSelect(item.tag)}>
							{item.label}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SelectMenu
