import express, { response } from "express";
import UserModel from "../models/user";

import KnjigaModel from "../models/knjiga";
import knjiga from "../models/knjiga";

export class KnjigaController {
    dohvatiSveKnjige=(req: express.Request, res: express.Response)=>{
        KnjigaModel.find({},(err,knjige)=>{
            if(err) console.log(err)
            else res.json(knjige)
        })
    }

    getWithStatus = (req:express.Request, res:express.Response) => {
        let status = req.body.status;
        KnjigaModel.find({'status':status},(err,comp)=>{
            if(err) console.log(err);
            else res.json(comp);
        })
      }
      getWithNaziv = (req:express.Request, res:express.Response) => {
        let naziv = req.body.naziv;
        KnjigaModel.find({'naziv':naziv},(err,comp)=>{
            if(err) console.log(err);
            else res.json(comp);
        })
      }

    dohvatiKnjigu = (req:express.Request, res: express.Response) => {
        let id = req.body.id;
        KnjigaModel.findOne({'id':id},(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
      
    }

    smanjiStanje=(req:express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        KnjigaModel.updateOne({'naziv':naziv}, { $inc: { 'naStanju': -1, 'brojUzimanja': 1 } },(err,comp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })

    }
    povecajStanje=(req:express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        KnjigaModel.updateOne({'naziv':naziv}, { $inc: { 'naStanju': 1} },(err,comp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })

    }

    updateStatus = (req:express.Request, res:express.Response) => {
        let id = req.body.id;
        let status = req.body.status;
        KnjigaModel.updateOne({'id':id},{$set:{'status':status}},(err,comp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    
      
      
    dodajKnjigu = (req: express.Request, res: express.Response) => {
        let newModel = new KnjigaModel({
          status:req.body.status,
          jezik: req.body.jezik,
          id: req.body.id,
          naziv: req.body.naziv,
          autori: req.body.autori,
          zanrovi: req.body.zanrovi,
          izdavac: req.body.izdavac,
          godinaIzdavanja: req.body.godinaIzdavanja,
          slikaKorice: req.body.slikaKorice,
          osoba:req.body.osoba,
          
          deadline: "null",
          brojUzimanja:0,
          

          
        });
        newModel.save((err,resp)=>{
          if(err) res.status(400).json({ message: "error" });
          else res.json({message:"ok"})
        })
      
    }


    delete = (req:express.Request, res:express.Response) => {
        let id = req.body.id;
        KnjigaModel.deleteOne({'id':id},(err,resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })
    }

    // updateNaStanju = (req:express.Request, res:express.Response) => {
    //     let id = req.body.id;
    //     let novoStanje = req.body.naStanju;
    //     KnjigaModel.updateOne({'id':id},{$set: {'naStanju':novoStanje}},(err,resp)=>{
    //         if(err) console.log(err);
    //         else res.json({"message":"ok"});
    //     })
    // }
    getAll = (req:express.Request, res:express.Response) => {
        let id = req.body.id;
        KnjigaModel.find({'id':id},(err,list)=>{
            if(err) console.log(err);
            else res.json(list);
        })
    }

    filtriraj = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let autor = req.body.autor;
    
        KnjigaModel.find(
          { naziv: { $regex: naziv }, autori: { $regex: autor } },
          (err, resp) => {
            if (err) console.log(err);
            else res.json(resp);
          }
        );
      };
      filtrirajNapredna = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let autor = req.body.autor;
        let izdavac = req.body.izdavac;
    
        KnjigaModel.find(
          { naziv: { $regex: naziv }, autori: { $regex: autor }, izdavac: { $regex: izdavac } },
          (err, resp) => {
            if (err) console.log(err);
            else res.json(resp);
          }
        );
      };


      izmeniKnjigu = (req: express.Request, res: express.Response) => {
        let slikaKorice = req.body.slikaKorice;
        let naStanju = req.body.naStanju;
        let id = req.body.id;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'naStanju': naStanju, 'slikaKorice': slikaKorice } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })

        })
    }

    izmeniKnjiguOcena = (req: express.Request, res: express.Response) => {
        let ocena = req.body.ocena;
        let id = req.body.id;

        KnjigaModel.updateOne({ 'id': id }, { $push: { 'ocena': ocena } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })

        })



    }

    izmeniNazivKnjige = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let naziv = req.body.naziv;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'naziv': naziv } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    izmeniAutoraKnjige = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let autori = req.body.autori;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'autori': autori } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    izmeniZanrKnjige = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let zanrovi = req.body.zanrovi;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'zanrovi': zanrovi } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    izmeniIzdavacaKnjige = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let izdavac = req.body.izdavac;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'izdavac': izdavac } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    izmeniGodinuIzdanjaKnjige = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let godinaIzdavanja = req.body.godinaIzdavanja;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'godinaIzdavanja': godinaIzdavanja } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    izmeniJezikKnjige = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let jezik = req.body.jezik;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'jezik': jezik } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    izmeniNaStanjuKnjige = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let naStanju = req.body.naStanju;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'naStanju': naStanju } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    izmeniSlikuKnjige = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let slikaKorice = req.body.slikaKorice;

        KnjigaModel.updateOne({ 'id': id }, { $set: { 'slikaKorice': slikaKorice } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }



}