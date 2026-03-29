import s from '../App.module.css'
import {Chart} from "../components/Chart/Chart.tsx";
import {useCallback, useState} from "react";
import {SectorList} from "../components/SectorList/SectorList.tsx";
import {getInitialSectors, type Sector} from "../model/sectors.ts";

export const ChartPage = () => {
    const [sectors, setSectors] = useState<Sector[]>(getInitialSectors)

    const addSector = useCallback((sector: Sector) => {
        setSectors(prev => [...prev, sector]);
    }, []);


    return (
        <section className={s.panel}>
            <h1>Круговая диаграмма</h1>
            <div className={s.chartWrapper}>
                <SectorList data={sectors} addSector={addSector}/>
                <Chart data={sectors}/>
            </div>
        </section>
    )
}
