import s from './SectorModal.module.css'
import {HexColorPicker} from "react-colorful";
import {type ChangeEvent, useState} from "react";
import type {Sector} from "../../model/sectors.ts";
import {v1} from 'uuid'

type Props = {
    sector?: Sector
    onClose: () => void
    onSubmit: (sector: Sector) => void
}

type Errors = {
    label?: string
    value?: string
}

export const SectorModal = ({onClose, sector, onSubmit}: Props) => {
    const [color, setColor] = useState(sector?.color ?? '#000000');
    const [label, setLabel] = useState(sector?.label ?? '');
    const [value, setValue] = useState(sector?.value ?? 0);

    const [errors, setErrors] = useState<Errors>({});

    const [isOpen, setIsOpen] = useState(false);

    const isSubmitDisabled =
        label.trim() === '' || value <= 0 || value > 100;

    const validate = () => {
        const errors: Errors = {}
        if (label.trim() === '') errors.label = 'Введите название сектора'
        if (value <= 0) errors.value = 'Значение должно быть больше нуля'
        if (value > 100) errors.value = 'Максимум 100'
        return errors
    }

    const onSubmitHandler = () => {
        const errors = validate()
        setErrors(errors)
        if (Object.keys(errors).length > 0) return
        onSubmit({label, value, color, id: sector?.id ?? v1()})
        onClose()
    }

    const onChangeInputLabelHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const label = e.currentTarget.value
        setLabel(label)
        setErrors(prev => ({
            ...prev,
            label: label.trim() === '' ? 'Введите название сектора' : undefined
        }));
    }

    const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value;
        setValue(value);

        let valueError: string | undefined;

        if (value <= 0) {
            valueError = 'Значение должно быть больше нуля';
        } else if (value > 100) {
            valueError = 'Максимум 100';
        }

        setErrors(prev => ({
            ...prev,
            value: valueError
        }));
    };

    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={s.modalTitle}>Добавление сектора</h3>
                <input className={s.input} type="text" value={label} placeholder={'Наименование'}
                       onChange={onChangeInputLabelHandler}/>
                {errors.label && <span className={s.textError}>{errors.label}</span>}
                <input className={s.input} type="number" value={value} placeholder={'Значение'} max={100} min={0}
                       onChange={onChangeInputValueHandler}/>
                {errors.value && <span className={s.textError}>{errors.value}</span>}
                <div className={s.colorInputWrapper}>
                    <input
                        className={s.input}
                        type="text"
                        value={color}
                        readOnly
                        onClick={() => setIsOpen(prev => !prev)}
                    />

                    <div
                        className={s.colorPreview}
                        style={{backgroundColor: color}}
                    />
                </div>
                {isOpen && <HexColorPicker color={color} onChange={setColor}/>}
                <button className={s.button} onClick={onSubmitHandler} disabled={isSubmitDisabled}>Добавить сектор</button>
            </div>
        </div>
    );
};