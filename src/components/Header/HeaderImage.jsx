function HeaderImage({ isSidebarOpen }) {
	return (
		<div style={!isSidebarOpen ? { paddingLeft: "80px", transition: "0.3s ease" } : { paddingLeft: "230px", transition: "0.4s ease" }}>
			<img className="headerImg" src="https://res.cloudinary.com/dhws4e2ty/image/upload/v1670076521/gradienta-PRgmOiN9jIE-unsplash_nexkln.jpg" alt="" />
		</div>
	)
}

export default HeaderImage
