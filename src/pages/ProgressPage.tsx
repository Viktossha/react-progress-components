import {type ChangeEvent, useState} from 'react'
import {ProgressBar, type Status} from '../components/ProogressBar/ProgressBar.tsx'
import s from '../App.module.css'

export const ProgressPage = () => {
    const [value, setValue] = useState(0)
    const [status, setStatus] = useState<Status>('inProgress')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value
        setValue(value)
        setStatus(value === 100 ? 'success' : 'inProgress')
    }

    return (
        <section className={s.panel}>
            <label className={s.label} htmlFor="progress-value">
                Set progress
            </label>
            <input
                id="progress-value"
                className={s.input}
                type="number"
                min={0}
                max={100}
                value={value}
                onChange={onChangeHandler}
            />
            <ProgressBar value={value} status={status} type="circle"/>
        </section>
    )
}
