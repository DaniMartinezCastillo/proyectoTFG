export interface Communication {
    id?: string,
    idUser: string,//id del usuario
    idMuscle: string,//id del músculo que selecciona para pasar los datos de de portal a routine
    routine: Array<string>,//rutina del día que pulsa para pasar los datos de portal a routine
    numPage: number,//numero de la página en la que está el usuario para crear breadcrum en navbar
}