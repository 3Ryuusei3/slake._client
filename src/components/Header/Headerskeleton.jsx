
import { useContext } from 'react'
import ContentLoader from 'react-content-loader'
import { SidebarContext } from '../../context/sidebar.context'


function HeaderSkeleton() {

    const { isSidebarOpen } = useContext(SidebarContext)

    return (
        <ContentLoader viewBox="0 0 200 100" className={!isSidebarOpen ? "leftPaddingSm" : "leftPaddingLg"}>
            <rect x="0" y="0" rx="5" ry="5" width="400" height="80" />
            <rect x="0" y="90" rx="5" ry="5" width="100" height="13" />
        </ContentLoader>
    )

}

export default HeaderSkeleton