import { Button } from "react-bootstrap"


const SetPomodoro = () => {

    return (
        <div>
            <form noValidate>
                <div>
                    <input name="work" onChange={handleChange} value={work} />
                    <input name="shorBreak" onChange={handleChange} value={work} />
                    <input name="longBreak" onChange={handleChange} value={work} />
                </div>
                <Button title="Set Timer" callback={handleSubmit} />
            </form>
        </div>
    )

}

export default SetPomodoro