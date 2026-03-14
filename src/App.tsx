import s from './App.module.css'
import {ProgressBar, type Status} from "./ProgressBar.tsx";
import {type ChangeEvent, useState} from "react";

export const App = () => {

    const [value, setValue] = useState(0)
    const [status, setStatus] = useState<Status>('inProgress')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {
        const value = +e.target.value
        setValue(value)
        if (value === 100) {
            setStatus('success')
        } else {
            setStatus('inProgress')

        }
    }

    return (
        <div className={s.app}>
            <input type="number" min={0} max={100} value={value} onChange={onChangeHandler}/>
            <span>set progress</span>
            <ProgressBar value={value} status={status} type={'dashboard'}/>
        </div>

    )
}