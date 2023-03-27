import express from 'express'
import OcenaModel from '../models/ocena'

export class OcenaController {

    dodajOcenu = (req: express.Request, res: express.Response) => {
        let novaOcena = new OcenaModel({
            ocena: req.body.ocena,
            username: req.body.username,
            idKnjige: req.body.idKnjige
        })

        novaOcena.save((err, resp) => {
            if (err) {
                console.log(err);
                res.json({ "poruka": "greska" })
            }
            else res.json({ "poruka": "ok" })
        })
    }

    dohvatiSveOcene = (req: express.Request, res: express.Response) => {
        OcenaModel.find({}, (err, ocene) => {
            if (err) console.log(err)
            else res.json(ocene)
        })
    }

    dohvatiOceneJedneKnjige = (req: express.Request, res: express.Response) => {
        let idKnjige = req.body.idKnjige;

        OcenaModel.find({ 'idKnjige': idKnjige }, (err, ocene) => {
            if (err) console.log(err)
            else res.json(ocene)
        })
    }

    dohvatiOcenuKorImeId = (req: express.Request, res: express.Response) => {
        let idKnjige = req.body.idKnjige;
        let username=req.body.username;

        OcenaModel.find({ 'idKnjige': idKnjige , 'username':username}, (err, komentari) => {

            if (err) console.log(err)
            else res.json(komentari)
        })
    }

    obrisiOceneKnjige = (req: express.Request, res: express.Response) => {
        let idKnjige = req.body.idKnjige;

        OcenaModel.deleteMany({ 'idKnjige': idKnjige }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'poruka': 'ok' })
        })
    }

}