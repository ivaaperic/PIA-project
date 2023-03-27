import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Komentar = new Schema({
    idKnjige: {type: Number},
    tekst: {type: String},
    username: {type: String},
    datum: {type: Date},
    azurirano: {type: Boolean},
    datumAzuriranja: {type: Date}

})

export default mongoose.model("KomentarModel", Komentar, "komentari")