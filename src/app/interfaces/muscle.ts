export interface Muscle {
    id: string,
    name: string,//nombre del musculo que quiere entrenar (espalda, biceps, ...)
    training: string,//nombre del entrenamiento que quiere realizar (culturismo, calistenia, ...)
    exercises: Array<string>,//ejercicios que se realizará para entrenar ese músculo
    icon: string;
}