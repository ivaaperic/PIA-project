import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Knjiga=new Schema({


    id:{type: Number},
    naziv:{type: String},
    autori:{type: Array<String>},
    zanrovi:{type: Array<String>},
    izdavac:{type: String},
    godinaIzdavanja:{type: Number},
    jezik:{type: String},
    osoba:{type: String},
    deadline:{type: String},
    slikaKorice:{type:String},
    brojUzimanja:{type:Number},
    status:{type:String},
    naStanju:{type:Number},
    ocena:{type:Array}


}) 

export default mongoose.model('KnjigaModel',Knjiga,'book')