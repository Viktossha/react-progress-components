import { v1 } from 'uuid';

export type Sector = {
    id: string
    label: string
    color: string
    value: number
}

export const getInitialSectors = (): Sector[] => [
    { id: v1(), label: 'Сектор 1', color: '#ac5858', value: 25 },
    { id: v1(), label: 'Сектор 2', color: '#6058ac', value: 25 },
    { id: v1(), label: 'Сектор 3', color: '#60ac58', value: 25 },
];