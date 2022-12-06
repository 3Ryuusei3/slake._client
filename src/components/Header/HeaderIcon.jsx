import EmojiPicker, { EmojiStyle, Emoji } from "emoji-picker-react"
import { useState } from "react"

function HeaderIcon() {
	const [selectedEmoji, setSelectedEmoji] = useState("")
	const [showPicker, setShowPicker] = useState(false)

	function onClick(emojiData) {
		setSelectedEmoji(emojiData.unified)
		setShowPicker(false)
	}

	return (
		<div style={{ position: "relative" }} className="mb-5 pb-3">
			<h1 className="headerIcon" onClick={() => setShowPicker(val => !val)}>
				{selectedEmoji ? <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={60} /> : "👀"}
			</h1>
			{showPicker && <EmojiPicker width="300px" height="350px" position="absolute" onEmojiClick={onClick} previewConfig={{ showPreview: false }} />}
		</div>
	)
}

export default HeaderIcon
