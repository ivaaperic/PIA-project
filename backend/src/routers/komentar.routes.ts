import express from 'express'
import { KomentarController } from '../controllers/komentar.controller';

const komentarRuter = express.Router();

komentarRuter.route('/dohvatiKomentare').post(
    (req, res) => new KomentarController().dohvatiKomentare(req, res)
)

komentarRuter.route('/dodajKomentar').post(
    (req, res) => new KomentarController().dodajKomentar(req, res)
)

komentarRuter.route('/dohvatiKomentarKorImeId').post(
    (req, res) => new KomentarController().dohvatiKomentarKorImeId(req, res)
)

komentarRuter.route('/izmeniKomentar').post(
    (req, res) => new KomentarController().izmeniKomentar(req, res)
)



export default komentarRuter; 