import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route('/getusername').post(
    (req,res) => new UserController().getWithUsername(req,res)
);

userRouter.route('/updateusername').post(
  (req,res) => new UserController().updateUsername(req,res)
);

userRouter.route('/updateemail').post(
  (req,res) => new UserController().updateEmail(req,res)
);

userRouter.route('/updatetelefon').post(
  (req,res) => new UserController().updateTelefon(req,res)
);
userRouter.route('/updateadresu').post(
  (req,res) => new UserController().updateAdresu(req,res)
);

userRouter.route('/updatepassword').post(
  (req,res) => new UserController().updatePassword(req,res)
);
userRouter.route('/updateInfo').post(
  (req,res) => new UserController().updateInfo(req,res)
);
userRouter.route('/updateType').post(
  (req,res) => new UserController().updateType(req,res)
);

userRouter.route('/updatestatus').post(
  (req,res) => new UserController().updateStatus(req,res)
);
userRouter.route('/izmeniBrojDana').post(
  (req,res) => new UserController().izmeniBrojDana(req,res)
);
userRouter.route('/izmeniBrojProduzava').post(
  (req,res) => new UserController().izmeniBrojProduzava(req,res)
);

userRouter.route('/getstatus').post(
  (req,res) => new UserController().getWithStatus(req,res)
);
userRouter.route('/dohvatiBrojDana').get(
  (req,res) => new UserController().dohvatiBrojDana(req,res)
);

userRouter.route('/obrisiKorisnika').post(
  (req, res) => new UserController().obrisiKorisnika(req, res)
)
userRouter.route('/obrisiKnjigu').post(
  (req, res) => new UserController().obrisiKnjigu(req, res)
)

userRouter.route("/prijava").post((req, res) => new UserController().prijava(req, res));

userRouter.route("/dohvatiKorisnika").post((req, res) => new UserController().dohvatiKorisnika(req, res));
userRouter.route("/dohvatiMejl").post((req, res) => new UserController().dohvatiMejl(req, res));

userRouter.route("/registrujSe").post((req, res) => new UserController().registrujSe(req, res));

userRouter.route("/sviKorisnici").get((req, res) => new UserController().sviKorisnici(req, res));
userRouter.route("/unos").post((req, res) => new UserController().unos(req, res));

userRouter.route("/odblokiraj").post((req, res) => new UserController().odblokiraj(req, res));
userRouter.route("/blokiraj").post((req, res) => new UserController().blokiraj(req, res));
userRouter.route("/prihvati").post((req, res) => new UserController().prihvati(req, res));
userRouter.route("/odbij").post((req, res) => new UserController().odbij(req, res));

userRouter.route('/prviLog').post((req, res)=> new UserController().prviLog(req,res))
userRouter.route('/ostaliLog').post((req, res)=> new UserController().ostaliLog(req,res))

userRouter.route("/dohvSveKnjige").post((req, res) => new UserController().dohvSveKnjige(req, res));

userRouter.route("/razduzi").post((req, res) => new UserController().razduzi(req, res));

userRouter.route("/filtriraj1").post((req, res) => new UserController().filtriraj1(req, res));
userRouter.route("/zaduzi").post((req, res) => new UserController().zaduzi(req, res));



userRouter.route("/basSve").post((req, res) => new UserController().basSve(req, res));

export default userRouter;
