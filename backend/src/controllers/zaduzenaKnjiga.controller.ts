import express from 'express'
import ZaduzenaKnjigaModel from '../models/zaduzenaKnjiga'

export class ZaduzenaKnjigaController {

    zaduziKnjigu = (req: express.Request, res: express.Response) => {
        let model = new ZaduzenaKnjigaModel({
            idKnjige: req.body.idKnjige,
            slikaKnjige: req.body.slikaKnjige,
            nazivKnjige: req.body.nazivKnjige,
            autoriKnjige: req.body.autoriKnjige,
            username: req.body.username,
            datumUzimanja: req.body.datumUzimanja,
            datumVracanja: null,
            brojDana: req.body.brojDana,
            produzeno: false
        })

        model.save((err, resp) => {
            if (err) {
                console.log(err);
                res.json({ "poruka": "greska" })
            }
            else res.json({ "poruka": "ok" })

        })
    }

    promeniBrojDana = (req: express.Request, res: express.Response) => {
        let brojDana = req.body.brojDana;

        ZaduzenaKnjigaModel.updateMany({}, { $set: { 'brojDana': brojDana } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    dohvatiSveZaduzeneKnjige = (req: express.Request, res: express.Response) => {
        ZaduzenaKnjigaModel.find({}, (err, knjige) => {
            if (err) console.log(err)
            else res.json(knjige)
        })
    }

    dohvatiMojeZaduzeneKnjige = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        ZaduzenaKnjigaModel.find({ 'username': username }, (err, knjige) => {
            if (err) console.log(err)
            else res.json(knjige)
        })
    }

    razduziKnjigu = (req: express.Request, res: express.Response) => {
        let idKnjige = req.body.idKnjige;
        let datumUzimanja = req.body.datumUzimanja;
        let datumVracanja = req.body.datumVracanja;

        ZaduzenaKnjigaModel.updateOne({ $and: [{ 'idKnjige': idKnjige }, { 'datumUzimanja': datumUzimanja }] }, { $set: { 'datumVracanja': datumVracanja } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

    dohvatiKnjiguPoNazivu = (req: express.Request, res: express.Response) => {
        let nazivKnjige = req.body.nazivKnjige;

        ZaduzenaKnjigaModel.find({ 'nazivKnjige': nazivKnjige }, (err, knjige) => {
            if (err) console.log(err)
            else res.json(knjige)
        })
    }

    dohvatiKnjiguKorImeId = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let idKnjige = req.body.idKnjige;

        ZaduzenaKnjigaModel.findOne({ 'username': username, 'idKnjige': idKnjige }, (err, knjiga) => {
            if (err) console.log(err)
            else res.json(knjiga)
        })
    }

    dohvatiKnjiguId = (req: express.Request, res: express.Response) => {
        let idKnjige = req.body.idKnjige;

        ZaduzenaKnjigaModel.find({ 'idKnjige': idKnjige }, (err, knjige) => {
            if (err) console.log(err)
            else res.json(knjige)
        })
    }

    produzi = (req: express.Request, res: express.Response) => {
        let idKnjige = req.body.idKnjige;
        let username = req.body.username;
        let brojDana = req.body.brojDana;
        let produzeno = true;

        ZaduzenaKnjigaModel.updateOne({ 'idKnjige': idKnjige, 'username': username }, { $set: { 'brojDana': brojDana, 'produzeno': produzeno } }, (err, knjige) => {
            if (err) console.log(err)
            else res.json({ 'poruka': 'ok' })
        })
    }

}