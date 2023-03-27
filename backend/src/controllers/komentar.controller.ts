import express from 'express'
import { brotliDecompress } from 'zlib';
import KomentarModel from '../models/komentar'

export class KomentarController {

    dohvatiKomentare = (req: express.Request, res: express.Response) => {
        let idKnjige = req.body.idKnjige;

        KomentarModel.find({ 'idKnjige': idKnjige }, (err, komentari) => {
            komentari.sort((kom1, kom2) => {
                if (kom1.datum < kom2.datum) {
                    return 1
                } else if (kom1.datum == kom2.datum) {
                    return 0;
                } else return -1;
            })
            if (err) console.log(err)
            else res.json(komentari)
        })
    }

    dodajKomentar = (req: express.Request, res: express.Response) => {
        let noviKomentar = new KomentarModel({
            idKnjige: req.body.idKnjige,
            tekst: req.body.tekst,
            username: req.body.username,
            datum: req.body.datum,
            azurirano: false,
            datumAzuriranja: null
        })

        noviKomentar.save((err, resp) => {
            if (err) {
                console.log(err);
                res.json({ "poruka": "greska" })
            }
            else res.json({ "poruka": "ok" })
        })

    }

    dohvatiKomentarKorImeId = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let idKnjige = req.body.idKnjige;

        KomentarModel.findOne({ 'username': username, 'idKnjige': idKnjige }, (err, komentar) => {
            if (err) console.log(err)
            else res.json(komentar)
        })
    }

    izmeniKomentar = (req: express.Request, res: express.Response) => {
        let idKnjige = req.body.idKnjige;
        let tekst = req.body.tekst;
        let username = req.body.username;
        let azurirano = req.body.azurirano;
        let datumAzuriranja = req.body.datumAzuriranja;

        KomentarModel.updateOne({ 'idKnjige': idKnjige, 'username': username }, { $set: { 'tekst': tekst, 'azurirano': azurirano, 'datumAzuriranja': datumAzuriranja } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

}