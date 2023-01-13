import { useContext } from "react"

import CalIndexContext from "../../context/calindex.context"

const Tags = () => {

    const { labels, updateLabel } = useContext(CalIndexContext)

    return (
        <div>
            <p>TAGS</p>
            {labels.map(({ label: lbl, checked }, idx) => (
                <label key={idx}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => updateLabel({ label: lbl, checked: !checked })}
                        className={`colorText${lbl} eventBlock`}
                    />
                    <span>{lbl}</span>
                </label>
            ))}
        </div>
    )
}

export default Tags

