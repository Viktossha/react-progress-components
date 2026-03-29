import {useState} from "react";
import s from "./SectorList.module.css";
import {createPortal} from "react-dom";
import {SectorItem} from "./SectorItem/SectorItem.tsx";
import {SectorModal} from "../SectorModal/SectorModal.tsx";
import type {Sector} from "../../model/sectors.ts";

type Props = {
    data: Sector[];
    addSector: (sector: Sector) => void
}
export const SectorList = ({data, addSector}: Props) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <div className={s.sectors}>
                {data.map(sector => <SectorItem key={sector.id} {...sector}/>)}
                <button type="button" className={s.button} onClick={openModal}>Добавить сектор</button>
            </div>
            {showModal && createPortal(<SectorModal onSubmit={addSector}
                                                    onClose={closeModal}/>, document.body)}
        </>

    );
};