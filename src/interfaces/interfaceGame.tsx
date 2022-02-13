import { Treasure } from "./interfaceTreasure";

export interface Game {
    _id: string;
    active: boolean;
    name: string;
    description: string;
    organizer_id: string;
    winner?: string;
    area: {
        coordinates: {
            latitude: number;
            longitude: number;
        }[]
    },
    treasures: Treasure[]
}