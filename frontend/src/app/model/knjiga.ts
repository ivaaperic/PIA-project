import { Autor } from "./autor";
import { User } from "./user";
import { Zanr } from "./zanr";

export class Knjiga{
    id:number;
    naziv:string;
    autori:Array<Autor>;
    zanrovi: Array<Zanr>;
    izdavac:string;
    godinaIzdavanja: number;
    jezik:string;
    slikaKorice: string
    brojUzimanja:number;
    naStanju:number;
    osoba: string;
    ocena:string[]
    status:string

    
}