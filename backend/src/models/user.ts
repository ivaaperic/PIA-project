import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User=new Schema({
    username:{type: String},
    password:{type: String},
    ime:{type: String},
    prezime:{type: String},
    ulicaBrojGrad:{type: String},
    telefon:{type: String},
    email:{type: String},
    slikaUrl:{type: String},
    tip:{type: String},
    status:{type:String}
}) 

export default mongoose.model('UserModel',User,'user')