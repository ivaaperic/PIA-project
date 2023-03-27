
import express from "express";
import { KnjigaController } from "../controllers/knjiga.controller";

const knjigaRouter = express.Router();

knjigaRouter.route('/dohvatiSveKnjige').get((req,res)=>new KnjigaController().dohvatiSveKnjige(req,res))

knjigaRouter.route('/dohvatiKnjigu').post(
    (req,res) => new KnjigaController().dohvatiKnjigu(req,res)
);

knjigaRouter.route("/dodajKnjigu").post((req, res) => new KnjigaController().dodajKnjigu(req, res));
// knjigaRouter.route('/updateNaStnju').post(
//     (req,res) => new KnjigaController().updateNaStanju(req,res)
// );
knjigaRouter.route("/filtriraj").post((req, res) => new KnjigaController().filtriraj(req, res));
knjigaRouter.route("/filtrirajNapredna").post((req, res) => new KnjigaController().filtrirajNapredna(req, res));

knjigaRouter.route('/getall').post(
    (req,res) => new KnjigaController().getAll(req,res)
)

knjigaRouter.route('/izmeniKnjigu').post(
    (req, res) => new KnjigaController().izmeniKnjigu(req, res)
)

knjigaRouter.route('/izmeniKnjiguOcena').post(
    (req, res) => new KnjigaController().izmeniKnjiguOcena(req, res)
)

knjigaRouter.route('/izmeniNazivKnjige').post(
    (req, res) => new KnjigaController().izmeniNazivKnjige(req, res)
)

knjigaRouter.route('/izmeniAutoraKnjige').post(
    (req, res) => new KnjigaController().izmeniAutoraKnjige(req, res)
)

knjigaRouter.route('/izmeniZanrKnjige').post(
    (req, res) => new KnjigaController().izmeniZanrKnjige(req, res)
)

knjigaRouter.route('/izmeniIzdavacaKnjige').post(
    (req, res) => new KnjigaController().izmeniIzdavacaKnjige(req, res)
)

knjigaRouter.route('/izmeniGodinuIzdanjaKnjige').post(
    (req, res) => new KnjigaController().izmeniGodinuIzdanjaKnjige(req, res)
)

knjigaRouter.route('/izmeniJezikKnjige').post(
    (req, res) => new KnjigaController().izmeniJezikKnjige(req, res)
)

knjigaRouter.route('/izmeniNaStanjuKnjige').post(
    (req, res) => new KnjigaController().izmeniNaStanjuKnjige(req, res)
)

knjigaRouter.route('/updatestatus').post(
    (req,res) => new KnjigaController().updateStatus(req,res)
  );

knjigaRouter.route('/izmeniSlikuKnjige').post(
    (req, res) => new KnjigaController().izmeniSlikuKnjige(req, res)
)
knjigaRouter.route('/smanjiStanje').post(
    (req, res) => new KnjigaController().smanjiStanje(req, res)
)
knjigaRouter.route('/povecajStanje').post(
    (req, res) => new KnjigaController().povecajStanje(req, res)
)

knjigaRouter.route('/getWithStatus').post(
    (req,res) => new KnjigaController().getWithStatus(req,res)
);
knjigaRouter.route('/getWithNaziv').post(
    (req,res) => new KnjigaController().getWithNaziv(req,res)
);



export default knjigaRouter;