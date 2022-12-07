function Todo({ isSidebarOpen }) {
	return (
		<div className={!isSidebarOpen ? "leftPaddingSm my-3" : "leftPaddingLg my-3"}>
			<h3>To-do</h3>
			<ul>
				<li>
					<input type="checkbox" />
					Buy tomatoes
				</li>
			</ul>
		</div>
	)
}

export default Todo
