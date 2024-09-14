export class Usuario{
    clave?:string;
    mail?:string | null;

    constructor(mail:string | null,clave:string){
        this.clave = clave;
        this.mail = mail;
    }
}