import mongoose from "mongoose";

const Schema = mongoose.Schema;

let BrojDana = new Schema({
    izmena:{type:Number},
    brojDana:{type:Number},
    produzava:{type:Number}
})

export default mongoose.model("BrojDanaModel", BrojDana, "brojDana")