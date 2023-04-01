export interface User {
    id: number,
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
    idGoal: number, //id de goal
    idTraining: number, //id de type
}
