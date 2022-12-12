import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import ContentLoader from "react-content-loader"

const PrivateRoute = () => {
	const { user, isLoading } = useContext(AuthContext)

	const HeaderSkeleton = () => (
		<ContentLoader viewBox="0 0 400 475">
			<rect y="5" rx="5" ry="5" width="345" height="60" />
			<rect x="0" y="70" rx="5" ry="5" width="100" height="13" />
		</ContentLoader>
	)

	if (isLoading) {
		return <HeaderSkeleton />
	}

	if (!user) {
		return <Navigate to="/login" />
	}

	return <Outlet />
}

export default PrivateRoute
