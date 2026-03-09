export type Status = 'inProgress' | 'success' | 'error' | 'warning'

type Props = {
    value: number
    status: Status
}

export const ProgressBar = ({value, status}: Props) => {

    const radius = 75
    const length = 2 * Math.PI * radius
    const offset = length - (length * value / 100)

    const progressColors = {
        inProgress: '#209ffd',
        success: '#12cc65',
        error: '#fd4848',
        warning: '#e5a13d',
    }

    const baseStrokeColor = '#f4f5f8'

    return (
        <div style={{position: 'relative', marginTop: '40px'}}>
            <div style={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <svg width={160} height={160}>
                    <circle cx="80" cy="80" r={radius} fill={'none'} stroke={baseStrokeColor} strokeWidth="8"
                            strokeDasharray={length} strokeDashoffset={0}></circle>
                    <circle cx="80" cy="80" r={radius} fill={'none'}
                            stroke={progressColors[status]}
                            strokeWidth="8" strokeDasharray={length} strokeDashoffset={offset}
                            style={{transform: 'rotate(-90deg)', transformOrigin: '80px 80px '}}></circle>
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