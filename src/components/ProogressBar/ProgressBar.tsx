import s from './ProgressBar.module.css'

export type Status = 'inProgress' | 'success' | 'error' | 'warning'

type Props = {
    value: number
    status: Status
    type?: 'circle' | 'dashboard'
    radius?: number
}

const getColor = (value: number) => {
    if (value < 30) return s.error
    if (value < 50) return s.warning
    if (value <= 99) return s.inProgress
    return s.success
}

export const ProgressBar = ({value, status, type = 'circle', radius = 75}: Props) => {

    const strokeWidth = 8
    const size = radius * 2 + strokeWidth
    const center = size / 2

    const fullLength = 2 * Math.PI * radius
    const arcLength = type === 'circle' ? fullLength : (0.75 * fullLength)
    const offset = arcLength - (arcLength * value / 100)


    const strokeColor = status === 'inProgress' ? getColor(value) : s[status]
    const strokeDasharray = type === 'circle' ? fullLength : `${arcLength} ${fullLength}`

    const renderContent = () => {
        switch (status) {
            case "inProgress":
                return <p className={s.inProgressText}>{value}%</p>
            case 'error':
                return <span className={s.errorText}>х</span>
            case 'warning':
                return <span className={s.warningText}>!</span>
            case 'success':
                return <span className={s.successText}>✓</span>
        }
    }


    return (
        <div className={s.progressBox}>
            <svg width={size} height={size} className={type === 'circle' ? s.svgCircle : s.svgDashboard}>
                <circle cx={center} cy={center} r={radius} className={s.backgroundCircle}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={0}>
                </circle>
                <circle cx={center} cy={center} r={radius} className={`${s.progressCircle} ${strokeColor}`}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={offset}>
                </circle>
            </svg>

            <div className={s.progressContent}>
                {renderContent()}
            </div>
        </div>
    )
}
