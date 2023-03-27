import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Ocena = new Schema({
    ocena: {type: String},
    username: {type: String},
    idKnjige: {type: Number}
})

export default mongoose.model("OcenaModel", Ocena, "ocene")