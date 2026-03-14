export type Status = 'inProgress' | 'success' | 'error' | 'warning'

type Props = {
    value: number
    status: Status
    type?: 'circle' | 'dashboard'
    radius?: number
}

const progressColors = {
    inProgress: '#209ffd',
    success: '#12cc65',
    error: '#fd4848',
    warning: '#e5a13d',
}

const baseStrokeColor = '#f4f5f8'

const getColor = (value: number) => {
    if (value < 30) return progressColors.error
    if (value < 50) return progressColors.warning
    if (value <= 99) return progressColors.inProgress
    return progressColors.success
}

export const ProgressBar = ({value, status, type = 'circle', radius = 75}: Props) => {

    const strokeWidth = 8
    const size = radius * 2 + strokeWidth
    const center = size / 2

    const fullLength = 2 * Math.PI * radius
    const arcLength = type === 'circle' ? fullLength : (0.75 * fullLength)
    const offset = arcLength - (arcLength * value / 100)


    const color = status === 'inProgress' ? getColor(value) : progressColors[status]

    const strokeDasharray = type === 'circle' ? fullLength : `${arcLength} ${fullLength}`
    const startPosition = type === 'circle' ? 'rotate(-90deg)' : 'rotate(-225deg)'

    const renderContent = () => {
        switch (status) {
            case "inProgress":
                return <p>{value}<span>%</span></p>
            case 'error':
                return <span style={{color: progressColors.error}}>х</span>
            case 'warning':
                return <span style={{
                    color: '#fff',
                    border: `1px solid ${progressColors.warning}`,
                    backgroundColor: progressColors.warning,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '16px',
                    height: '16px'
                }}>!</span>
            case 'success':
                return <span style={{color: progressColors.success}}>✓</span>
        }
    }


    return (
        <div style={{position: 'relative', marginTop: '40px'}}>
            <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <svg width={size} height={size} style={{transform: startPosition, transformOrigin: 'center'}}>
                    <circle cx={center} cy={center} r={radius} fill={'none'} stroke={baseStrokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray} strokeDashoffset={0} strokeLinecap={'round'}>
                    </circle>
                    <circle cx={center} cy={center} r={radius} fill={'none'}
                            stroke={color}
                            strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} strokeDashoffset={offset}
                            strokeLinecap={'round'}
                            style={{
                                transition: 'stroke-dashoffset 0.5s, stroke 0.5s'
                            }}>
                    </circle>
                </svg>

                <div style={{
                    color: '#7e7f82',
                    fontWeight: 'bold',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}>
                    {renderContent()}
                </div>
            </div>
        </div>

    )
}