import ChartJS from 'chart.js/auto';
import {useEffect, useRef} from "react";
import s from './Chart.module.css'
import type {Sector} from "../../model/sectors.ts";

type Props = {
    data: Sector[];
}

export const Chart = ({data}: Props) => {

    const canvasRef = useRef(null)

    useEffect(() => {

        if (!canvasRef.current) return;

        const chart = new ChartJS(
            canvasRef.current,
            {
                type: 'pie',
                data: {
                    labels: data.map(row => row.label),
                    datasets: [
                        {
                            data: data.map(row => row.value),
                            backgroundColor: data.map(row => row.color),
                        }
                    ],
                },
                options: {
                    // responsive: true,
                    // maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 30,
                            }
                        },
                    },
                }
            }
        );

        return () => chart.destroy();
    }, [data])
    return (
        <div className={s.chartWrapper}>
            <canvas ref={canvasRef}>
            </canvas>
        </div>
    )

}