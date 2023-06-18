import { Muscle } from "./muscle";

export interface History {
    id?: string,
    userName: string, //userName del usuario que lo ha entrenado
    nameMuscle: string, //nombre del músculo que se ha entrenado
    date: number, //fecha del día en la que se ha entrenado
    training: string //tipo de entrenamiento que ha realizado
}