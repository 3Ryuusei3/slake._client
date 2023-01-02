import { useContext, useState } from "react"
import { PomodoroContext } from "../../context/pomodoro.context"



const SettingPomodoro = () => {

    const { updateExecute } = useContext(PomodoroContext)

    const [newTimer, setNewTimer] = useState({
        work: 45,
        break: 10,
        active: 'work'
    })

    const handleChange = input => {

        const { name, value } = input.target

        switch (name) {
            case "work":
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break
            case "break":
                setNewTimer({
                    ...newTimer,
                    break: parseInt(value)
                })
                break
        }
        console.log(newTimer)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateExecute(newTimer)
    }

    return (
        <div>
            <form noValidate onSubmit={handleSubmit}>
                <div>
                    <input name="work" onChange={handleChange} value={newTimer.work} />
                    <input name="break" onChange={handleChange} value={newTimer.break} />
                </div>
                <button type="input">Set Timer</button>
            </form>
        </div>
    )

}

export default SettingPomodoro


