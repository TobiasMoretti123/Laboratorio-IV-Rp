export class Usuario{
    clave?:string;
    mail?:string;

    constructor(mail:string,clave:string){
        this.clave = clave;
        this.mail = mail;
    }
}