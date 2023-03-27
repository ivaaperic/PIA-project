import express, { response } from "express";
import UserModel from "../models/user";
import BrojDanaModel from "../models/brojDana";

import KnjigaModel from "../models/knjiga";

export class UserController {
  prijava = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;

    UserModel.findOne(
      { username: username, password: password },
      (err, korisnik) => {
        if (err) console.log(err);
        else res.json(korisnik);
      }
    );
  };
  getWithUsername = (req:express.Request, res: express.Response) => {
    let username = req.body.username;
    UserModel.findOne({'username':username},(err,user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
  }

  
  registrujSe = (req: express.Request, res: express.Response) => {
    let newModel = new UserModel({
      username: req.body.username,
      password: req.body.password,
      ime: req.body.ime,
      prezime: req.body.prezime,
      ulicaBrojGrad: req.body.ulicaBrojGrad,
      telefon:req.body.telefon,
      email: req.body.email,
      slikaUrl: req.body.slikaUrl,
      tip: req.body.tip,
      status: req.body.status
    });
    newModel.save((err,resp)=>{
      if(err) res.status(400).json({ message: "error" });
      else res.json({message:"ok"})
    })
  }

  updateStatus = (req:express.Request, res:express.Response) => {
    let username = req.body.username;
    let status = req.body.status;
    UserModel.updateOne({'username':username},{$set:{'status':status}},(err,comp)=>{
        if(err) console.log(err);
        else res.json({"message":"ok"});
    })
  }

  izmeniBrojDana = (req:express.Request, res:express.Response) => {
    let brojDana = req.body.brojDana;
    BrojDanaModel.updateOne({'izmena':1},{$set:{'brojDana':brojDana}},(err,comp)=>{
        if(err) console.log(err);
        else res.json({"message":"ok"});
    })
  }
  izmeniBrojProduzava = (req:express.Request, res:express.Response) => {
    let produzava = req.body.produzava;
    BrojDanaModel.updateOne({'izmena':1},{$set:{'produzava':produzava}},(err,comp)=>{
        if(err) console.log(err);
        else res.json({"message":"ok"});
    })
  }
  dohvatiBrojDana = (req:express.Request, res:express.Response) => {

    BrojDanaModel.find({},(err,comp)=>{
        if(err) console.log(err);
        else res.json(comp);
    })
  }

  obrisiKorisnika = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    UserModel.deleteOne({ 'username': username }, (err, resp) => {
        if (err) console.log(err);
        else res.json({ 'poruka': 'ok' })
    })

  }

  obrisiKnjigu = (req: express.Request, res: express.Response) => {
    let id = req.body.id;

    KnjigaModel.deleteOne({ 'id': id }, (err, resp) => {
        if (err) console.log(err);
        else res.json({ 'poruka': 'ok' })
    })

  }
  

getWithStatus = (req:express.Request, res:express.Response) => {
  let status = req.body.status;
  UserModel.find({'status':status},(err,comp)=>{
      if(err) console.log(err);
      else res.json(comp);
  })
}

deleteBook = (req:express.Request, res:express.Response) => {
  let username = req.body.username;
  let id = req.body.id;

  //ovde bih mogla da napravim sadrzi, ova metoda se nalazi u sadrzi zapravo
  UserModel.deleteMany({'username':username,'id':id},(err,list)=>{
      if(err) console.log(err);
      else res.json(list);
  })
}

  


    /*if (req.file != undefined) {
            const url = req.protocol + "://" + req.get("host");
            slikaUrl = url + "/images/" + req.file.filename;
        } else {
            slikaUrl = "http://localhost:4000/images/anonymous-user.png";
        }*/



  dohvatiKorisnika = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    UserModel.findOne({ username: username }, (err, korisnik) => {
      if (err) console.log(err);
      else res.json(korisnik);
    });
  };

  updateUsername = (req:express.Request, res:express.Response) => {
        let usernameStaro = req.body.usernameStaro;
        let usernameNovo = req.body.usernameNovo;
        UserModel.updateOne({'username':usernameStaro},{$set: {'username':usernameNovo}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }

    updateEmail = (req:express.Request, res:express.Response) => {
        let emailStari = req.body.emailStari;
        let emailNovi = req.body.emailNovi;
        UserModel.updateOne({'email':emailStari},{$set: {'email':emailNovi}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }

    updatePassword = (req:express.Request, res:express.Response) => {
      let username = req.body.username;
      let password1 = req.body.password1;
      UserModel.updateOne({'username':username},{$set: {'password':password1}},(err,resp)=>{
          if(err) console.log(err);
          else res.json({"message":"ok"});
      })
  }

    updateTelefon = (req:express.Request, res:express.Response) => {
        let username = req.body.username;
        let telefonNovi = req.body.telefonNovi;
        UserModel.updateOne({'username':username},{$set: {'telefon':telefonNovi}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }
    updateAdresu = (req:express.Request, res:express.Response) => {
        let username = req.body.username;
        let ulicaBrojGrad = req.body.ulicaBrojGrad;
        UserModel.updateOne({'username':username},{$set: {'ulicaBrojGrad':ulicaBrojGrad}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({"message":"ok"});
        })
    }

  dohvatiMejl = (req: express.Request, res: express.Response) => {
    let email = req.body.email;
    UserModel.findOne({ email: email }, (err, korisnik) => {
      if (err) console.log(err);
      else res.json(korisnik);
    });
  };

  unos = (req: express.Request, res: express.Response) => {
    let kor = new UserModel({
      username: req.body.username,
      password: req.body.password,
      ime: req.body.ime,
      prezime: req.body.prezime,
      tip: "citalac",
      telefon: req.body.telefon,
    });
    kor.save((err, resp) => {
      if (err) {
        // console.log('There was a duplicate key error');
        return res.status(400).json({ message: "error" });
      } else {
        res.json({ message: "ok" });
      }
    });
  };

  prihvati = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    UserModel.updateOne(
      { username: username },
      { $set: { odobreno: true } },
      (err, resp) => {
        if (err) console.log(err);
        else res.json({ message: "ok" });
      }
    );
  };

  sviKorisnici = (req: express.Request, res: express.Response) => {
    UserModel.find({}, (err, svi) => {
      if (err) console.log(err);
      else res.json(svi);
    });
  };

  odblokiraj = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    UserModel.updateOne(
      { username: username },
      { $set: { aktivno: true } },
      (err, resp) => {
        if (err) console.log(err);
        else res.json({ message: "ok" });
      }
    );
  };

  prviLog = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    UserModel.updateOne(
      { username: username },
      { $set: { prvi: true } },
      (err, user) => {
        if (err) console.log(err);
        else res.json(user);
      }
    );
  };
  ostaliLog = (req: express.Request, res: express.Response) => {
    let username = req.body.username;

    UserModel.updateOne(
      { username: username },
      { $set: { prvi: false } },
      (err, user) => {}
    );
    UserModel.updateOne(
      { username: username },
      { $set: { ostali: true } },
      (err, user) => {
        if (err) console.log(err);
        else res.json(user);
      }
    );
  };

  blokiraj = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    UserModel.updateOne(
      { username: username },
      { $set: { aktivno: false } },
      (err, resp) => {
        if (err) console.log(err);
        else res.json({ message: "ok" });
      }
    );
  };
  odbij = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    UserModel.deleteOne({ username: username }, (err, resp) => {
      if (err) console.log(err);
      else res.json({ message: "ok" });
    });
  };

  dohvSveKnjige = (req: express.Request, res: express.Response) => {

    let username = req.body.username;

    KnjigaModel.find({ person: username }, (err, user) => {
      if (err) console.log(err);
      else res.json(user);
    });
  };

  razduzi = (req: express.Request, res: express.Response) => {
    let id = req.body.id;

    console.log(id);

    KnjigaModel.updateOne(
      { id: id },
      { $set: { person: null, deadline: null } },
      (err, resp) => {
        if (err) console.log(err);
        else res.json({ message: "updated" });
      }
    );
  };

  filtriraj1 = (req: express.Request, res: express.Response) => {
    let naziv = req.body.naziv;
    let autor = req.body.autor;
    console.log(naziv);

    KnjigaModel.find(
      { title: { $regex: naziv }, author: { $regex: autor } },
      (err, resp) => {
        if (err) console.log(err);
        else res.json(resp);
      }
    );
  };

  zaduzi = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    let username = req.body.username;
    let date = req.body.date;

    console.log(id + " " + username + " " + date);

    KnjigaModel.updateOne(
      { id: id },
      { $set: { person: username, deadline: date } },
      (err, resp) => {
        if (err) console.log(err);
        else res.json({ message: "updated" });
      }
    );
  };


  
updateInfo = (req:express.Request, res:express.Response) => {
    
    let username = req.body.username;
    let ime1 = req.body.ime1;
    let prezime1 = req.body.prezime1;
    let telefon1 = req.body.telefon1;

    UserModel.updateOne({'username':username},{$set: {'ime':ime1, 'prezime':prezime1,'telefon':telefon1}},(err,resp)=>{
        if(err) console.log(err);
        else res.json({"message":"ok"});
    })
}

updateType = (req:express.Request, res:express.Response) => {
    
    let username = req.body.username;
    let tip = req.body.tip;

    UserModel.updateOne({'username':username},{$set: {'tip':tip}},(err,resp)=>{
        if(err) console.log(err);
        else res.json({"message":"ok"});
    })
}



 

  basSve = (req: express.Request, res: express.Response) => {
    KnjigaModel.find({}, (err, user) => {
      if (err) console.log(err);
      else res.json(user);
    });
  };
}
