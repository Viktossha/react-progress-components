export type Status = 'inProgress' | 'success' | 'error' | 'warning'

type Props = {
    value: number
    status: Status
    type?: 'circle' | 'dashboard'
}

export const ProgressBar = ({value, status, type = 'circle'}: Props) => {

    const radius = 75
    const fullLength = 2 * Math.PI * radius
    const arcLength = type === 'circle' ? fullLength : (6 / 8 * fullLength)
    const offset = arcLength - (arcLength * value / 100)

    const baseStrokeColor = '#f4f5f8'
    const progressColors = {
        inProgress: '#209ffd',
        success: '#12cc65',
        error: '#fd4848',
        warning: '#e5a13d',
    }

    const strokeDasharray = type === 'circle' ? fullLength : `${arcLength} ${fullLength}`
    const startPosition = type === 'circle' ? 'rotate(-90deg)' : 'rotate(-225deg)'


    return (
        <div style={{position: 'relative', marginTop: '40px'}}>
            <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <svg width={160} height={160}>
                    <circle cx="80" cy="80" r={radius} fill={'none'} stroke={baseStrokeColor} strokeWidth="8"
                            strokeDasharray={strokeDasharray} strokeDashoffset={0} strokeLinecap={'round'}
                            style={{
                                transform: startPosition,
                                transformOrigin: '80px 80px'
                    }}>
                    </circle>
                    <circle cx="80" cy="80" r={radius} fill={'none'}
                            stroke={progressColors[status]}
                            strokeWidth="8" strokeDasharray={strokeDasharray} strokeDashoffset={offset}
                            strokeLinecap={'round'}
                            style={{
                                transform: startPosition,
                                transformOrigin: '80px 80px',
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
                    <p>{value}<span>%</span></p>
                </div>
            </div>
        </div>

    )
}