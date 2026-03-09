import './App.css'
import {ProgressBar, type Status} from "./ProgressBar.tsx";
import {type ChangeEvent, useState} from "react";

export const App = () => {

    const [value, setValue] = useState(0)
    const [status, setStatus] = useState<Status>('inProgress')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {
        const value = +e.target.value
        setValue(value)
        if (value > 0 && value <= 99) {
            setStatus('inProgress')
        }
        if (value === 100) {
            setStatus('success')
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <input type="number" min={0} max={100} value={value} onChange={onChangeHandler}/>
            <span>set progress</span>
            <ProgressBar value={value} status={status}/>
        </div>

    )
}