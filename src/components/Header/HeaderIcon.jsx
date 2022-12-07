import EmojiPicker, { EmojiStyle, Emoji } from "emoji-picker-react"
import { useState } from "react"

function HeaderIcon({ isSidebarOpen, dashboardData }) {
	const [selectedEmoji, setSelectedEmoji] = useState("\u1F642")
	const [showPicker, setShowPicker] = useState(false)

	function onClick(emojiData) {
		setSelectedEmoji(emojiData.unified)
		setShowPicker(false)
	}

	return (
		<div style={{ position: "relative" }} className={!isSidebarOpen ? "leftPaddingSm mb-5" : "leftPaddingLg mb-5"}>
			<h1 className="headerIcon" onClick={() => setShowPicker(val => !val)}>
				{selectedEmoji ? <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={70} /> : <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f440.png" alt="" />}
			</h1>
			{showPicker && <EmojiPicker width="270px" height="350px" onEmojiClick={onClick} previewConfig={{ showPreview: false }} />}
		</div>
	)
}

export default HeaderIcon
