export interface Routine {
    id: string,
    training: string,//nombre del entrenamiento que quiere realizar (culturismo, calistenia, ...)
    days: number,//días de la semana que se entrenará
    monday: Array<string>,//entrenamietnos que se realizarán el primer día de la semana
    tuesday: Array<string>,//entrenamientos que se realizarán el segundo día de la semana
    wednesday: Array<string>,//entrenamientos que se realizarán el tercer día de la semana
    thursday: Array<string>,//entrenamientos que se realizarán el cuarto día de la semana
    friday: Array<string>,//entrenamientos que se realizarán el quinto día de la semana
}
