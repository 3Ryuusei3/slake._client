import { useEffect, useState, useContext } from "react"

import { DarkModeContext } from "../../context/darkmode.context"
import { SidebarContext } from "../../context/sidebar.context"

import quotesData from "./data.json"

function Quote() {
	const [quotes, setQuotes] = useState()
	const [rndNum, setRndNum] = useState()

	const { isSidebarOpen } = useContext(SidebarContext)
	const { darkMode } = useContext(DarkModeContext)

	const updateRndNmb = () => {
		setRndNum(Math.floor(Math.random() * quotesData.length))
	}

	useEffect(() => {
		setQuotes(quotesData)
		updateRndNmb()
	}, [])

	const genNewQuote = e => {
		e.preventDefault()
		updateRndNmb()
	}

	return (
		<>
			{quotes && rndNum !== undefined && (
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
