export interface User {
    id?: string,
    userName: string, //nombre de usuario
    name: string, //nombre
    surname: string, //apellidos
    email: string, //email
    password: string, //contraseña
    age: number, //edad
    weight: number, //peso
    genre: string, //género
    height: number, //altura
    days: number, //días que entrena a la semana
    weightObjective: number, //peso objetivo (peso al que desea llegar)
    goal:string, //id de goal
    training: string, //id de training
}
