import { useContext } from "react"
import { DarkModeContext } from "../../context/darkmode.context"

const Slider = () => {
	const { darkMode } = useContext(DarkModeContext)

	return (
		<div className={!darkMode ? "carousel" : "carousel-dark"}>
			<div
				className="sliderTrack"
				style={!darkMode ? { "--slideText": "var(--text-primary)", "--slideBg": "var(--bg-primary)" } : { "--slideText": "var(--dark-text-primary)", "--slideBg": "var(--dark-bg-primary)" }}
			>
				<div className="slide slide-regular">slake.</div>
				<div className="slide slide-purple-outline">slake.</div>
				<div className="slide slide-outline">slake.</div>
				<div className="slide slide-purple">slake.</div>

				<div className="slide slide-purple-outline">slake.</div>
				<div className="slide slide-regular">slake.</div>
				<div className="slide slide-outline">slake.</div>
				<div className="slide slide-purple">slake.</div>

				<div className="slide slide-purple-outline">slake.</div>
				<div className="slide slide-regular">slake.</div>
				<div className="slide slide-purple">slake.</div>
				<div className="slide slide-outline">slake.</div>

				<div className="slide slide-purple-outline">slake.</div>
				<div className="slide slide-regular">slake.</div>
				<div className="slide slide-purple">slake.</div>
				<div className="slide slide-outline">slake.</div>

				<div className="slide slide-purple-outline">slake.</div>
				<div className="slide slide-regular">slake.</div>
				<div className="slide slide-purple">slake.</div>
				<div className="slide slide-outline">slake.</div>
			</div>
		</div>
	)
}

export default Slider
