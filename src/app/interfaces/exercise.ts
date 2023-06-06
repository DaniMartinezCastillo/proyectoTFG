export interface Exercise {
    id: string,
    name: string,//nombre del ejercicio que quiere entrenar (press banca, dominadas, ...)
    repetitions: number,//numero de repeticiones que tiene que hacer en cada serie del ejercicio
    series: number,//numero de series que va a hacer del ejercicio
    img1: string,//imagen uno de referencia del ejercicio(ejercicio sin realizar)
    img2: string,//imagen dos de referencia del ejercicio(ejercicio ya realizado)
}