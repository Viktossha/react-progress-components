import s from './SectorItem.module.css'
import type {Sector} from "../../../model/sectors.ts";

export const SectorItem = ({value, color, label}: Sector) => {
    return (
        <div className={s.sector}>
            <span className={s.label}>{label}</span>
            <span className={s.value}>{value}</span>
            <div
                className={s.colorPreview}
                style={{backgroundColor: color}}
            />
        </div>
    )
}