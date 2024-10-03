export class Usuario{
    clave?:string;
    mail?:string | null | undefined;
    apellido?:string;
    nombre?:string;
    edad?:number;
    telefono?:number;

    constructor(mail:string | null,clave:string,apellido:string,nombre:string,edad:number,telefono:number){
        this.clave = clave;
        this.mail = mail;
        this.apellido = apellido
        this.nombre = nombre
        this.edad = edad
        this.telefono = telefono
    }
}