import { useContext, useState } from "react"
import { PomodoroContext } from "../../context/pomodoro.context"
import Button from "./Button"


const SetPomodoro = () => {

    const { updateExecute } = useContext(PomodoroContext)

    const [newTimer, setNewTimer] = useState({
        work: 50,
        short: 5,
        long: 15,
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
            case "shortBreak":
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break
            case "longBreak":
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break
            default:
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
            <form noValidate>
                <div>
                    <input name="work" onChange={handleChange} value={newTimer.work} />
                    <input name="shortBreak" onChange={handleChange} value={newTimer.short} />
                    <input name="longBreak" onChange={handleChange} value={newTimer.long} />
                </div>
                <Button title="Set Timer" _callback={handleSubmit} />
            </form>
        </div>
    )

}

export default SetPomodoro


