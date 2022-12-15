import { useEffect, useState, useContext } from "react"
import quotesData from "./data.json"

import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"

function Quote() {
	const [quotes, setQuotes] = useState()

	const randomNumber = Math.floor(Math.random() * quotesData.length - 1) + 1
	const [rndNum, setRndNum] = useState(randomNumber)

	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)

	useEffect(() => {
		setQuotes(quotesData)
	}, [])

	const genNewQuote = e => {
		e.preventDefault()
		setRndNum(randomNumber)
	}

	return (
		<>
			{quotes && (
				<div className={!isSidebarOpen ? "leftPaddingSm pb-1 mt-1" : "leftPaddingLg pb-1 mt-1"}>
					<h3 className="pt-4">Quote of the day</h3>
					<div className={!darkMode ? "Callout py-3" : "Callout-dark py-3"}>
						<button onClick={genNewQuote}>🎈</button>
						<div>
							<p style={{ fontSize: "16px", fontStyle: "italic", marginLeft: "8px" }}>
								"{quotes[rndNum].phrase}" - {quotes[rndNum].author} 2022
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Quote
