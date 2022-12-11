import { createContext, useState } from "react"

const SkeletonContext = createContext()

function SkeletonProviderWrapper(props) {

    const [skeleton, setSkeleton] = useState(true)

    return <SkeletonContext.Provider value={{ setSkeleton, skeleton }}>{props.children}</SkeletonContext.Provider>
}

export { SkeletonContext, SkeletonProviderWrapper }