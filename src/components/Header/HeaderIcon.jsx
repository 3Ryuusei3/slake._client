import { useContext, useState } from "react"
import { SidebarContext } from "../../context/sidebar.context"

import EmojiPicker, { EmojiStyle, Emoji } from "emoji-picker-react"

function HeaderIcon({ headerIcon }) {
	const [selectedEmoji, setSelectedEmoji] = useState()
	const [showPicker, setShowPicker] = useState(false)

	const { isSidebarOpen } = useContext(SidebarContext)

	function onClick(emojiData) {
		setSelectedEmoji(emojiData.unified)
		setShowPicker(false)
	}

	return (
		<div style={{ position: "relative" }} className={!isSidebarOpen ? "leftPaddingSm mb-5" : "leftPaddingLg mb-5"}>
			<h1 className="headerIcon" onClick={() => setShowPicker(val => !val)}>
				{selectedEmoji ? <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={80} /> : headerIcon}
			</h1>
			{showPicker && <EmojiPicker width="270px" height="350px" onEmojiClick={onClick} previewConfig={{ showPreview: false }} />}
		</div>
	)
}

export default HeaderIcon
