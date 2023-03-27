
import express from 'express'
import { OcenaController } from '../controllers/ocena.controller';

const ocenaRuter = express.Router();

ocenaRuter.route('/dodajOcenu').post(
    (req, res) => new OcenaController().dodajOcenu(req, res)
)

ocenaRuter.route('/dohvatiSveOcene').get(
    (req, res) => new OcenaController().dohvatiSveOcene(req, res)
)

ocenaRuter.route('/dohvatiOceneJedneKnjige').post(
    (req, res) => new OcenaController().dohvatiOceneJedneKnjige(req, res)
)

ocenaRuter.route('/obrisiOceneKnjige').post(
    (req, res) => new OcenaController().obrisiOceneKnjige(req, res)
)

ocenaRuter.route('/dohvatiOcenuKorImeId').post(
    (req, res) => new OcenaController().dohvatiOcenuKorImeId(req, res)
)


export default ocenaRuter;