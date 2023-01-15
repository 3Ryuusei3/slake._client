const tags = [
	{ tag: "h1", icon: "bi-type-h1" },
	{ tag: "h2", icon: "bi-type-h2" },
	{ tag: "h3", icon: "bi-type-h3" },
	{ tag: "p", icon: "bi-paragraph" },
	{ tag: "ul", icon: "bi-list-ul" },
	{ tag: "callout", icon: "bi-lightning-fill" },
	{ tag: "img", icon: "bi-image" },
]

const types = [
	{ type: "", icon: "bi-fonts" },
	{ type: "bold", icon: "bi-type-bold" },
	{ type: "italic", icon: "bi-type-italic" },
	{ type: "underline", icon: "bi-type-underline" },
]

const colors = [
	{ color: "", class: "TextNone" },
	{ color: "Theme", class: "None" },
	{ color: "Blue", class: "TextBlue" },
	{ color: "Red", class: "TextRed" },
	{ color: "Yellow", class: "TextYellow" },
	{ color: "Green", class: "TextGreen" },
	{ color: "Orange", class: "TextOrange" },
	{ color: "Purple", class: "TextPurple" },
]

module.exports = {
	tags,
	types,
	colors,
}
