import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZaduzenaKnjiga = new Schema({
    idKnjige: {type: Number},
    slikaKnjige: {type: String},
    nazivKnjige: {type: String},
    autoriKnjige: {type: Array<String>},
    username: {type: String},
    datumUzimanja: {type: Date},
    datumVracanja: {type: Date},
    brojDana: {type: Number},
    produzeno: {type: Boolean}
})

export default mongoose.model("ZaduzenaKnjigaModel", ZaduzenaKnjiga, "zaduzeneKnjige")