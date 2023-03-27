import express from 'express'
import { ZaduzenaKnjigaController } from '../controllers/zaduzenaKnjiga.controller';

const zaduzenaKnjigaRuter = express.Router();

zaduzenaKnjigaRuter.route('/zaduziKnjigu').post(
    (req, res) => new ZaduzenaKnjigaController().zaduziKnjigu(req, res)
)

zaduzenaKnjigaRuter.route('/dohvatiSveZaduzeneKnjige').get(
    (req, res) => new ZaduzenaKnjigaController().dohvatiSveZaduzeneKnjige(req, res)
)

zaduzenaKnjigaRuter.route('/dohvatiMojeZaduzeneKnjige').post(
    (req, res) => new ZaduzenaKnjigaController().dohvatiMojeZaduzeneKnjige(req, res)
)

zaduzenaKnjigaRuter.route('/razduziKnjigu').post(
    (req, res) => new ZaduzenaKnjigaController().razduziKnjigu(req, res)
)

zaduzenaKnjigaRuter.route('/dohvatiKnjiguPoNazivu').post(
    (req, res) => new ZaduzenaKnjigaController().dohvatiKnjiguPoNazivu(req, res)
)

zaduzenaKnjigaRuter.route('/dohvatiKnjiguKorImeId').post(
    (req, res) => new ZaduzenaKnjigaController().dohvatiKnjiguKorImeId(req, res)
)

zaduzenaKnjigaRuter.route('/dohvatiKnjiguId').post(
    (req, res) => new ZaduzenaKnjigaController().dohvatiKnjiguId(req, res)
)

zaduzenaKnjigaRuter.route('/produzi').post(
    (req, res) => new ZaduzenaKnjigaController().produzi(req, res)
)

export default zaduzenaKnjigaRuter;