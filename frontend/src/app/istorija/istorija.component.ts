import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { ZaduzenaKnjiga } from '../model/zaduzenaKnjiga';
import { UserService } from '../services/user.service';
import { ZaduzenaKnjigaService } from '../services/zaduzena-knjiga.service';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private zaduzeneService:ZaduzenaKnjigaService) { }

  ngOnInit(): void {

    this.userService.dohvatiKorisnika(sessionStorage.getItem("user")).subscribe((resp:User)=>{
      this.korisnik = resp;
      this.dohvatiMojuIstoriju();
    })

    


    
  }


  

  mojaIstorija:ZaduzenaKnjiga[]=[]


  korisnik:User= new User()

  dohvatiMojuIstoriju(){
    this.mojaIstorija=[]
    this.zaduzeneService.dohvatiMojeZaduzeneKnjige(this.korisnik.username).subscribe((zad: ZaduzenaKnjiga[]) => {
      if (zad) {
        this.mojaIstorija = zad;

        for (let i = 0; i < zad.length; i++) {
          var datumBaza = new Date(zad[i].datumUzimanja);
          var godinaUzimanja = datumBaza.getFullYear();
          var mesecUzimanja = datumBaza.getMonth();
          mesecUzimanja = mesecUzimanja + 1;
          var danUzimanja = datumBaza.getDate();
          var datumString = danUzimanja + "." + mesecUzimanja + "." + godinaUzimanja + ".";
          this.mojaIstorija[i].datumUzimanjaString = datumString;
          if (zad[i].datumVracanja == null) {
            this.mojaIstorija[i].datumVracanjaString = null;
          } else {
            var datumBaza2 = new Date(zad[i].datumVracanja);
            var godinaVracanja = datumBaza2.getFullYear();
            var mesecVracanja = datumBaza2.getMonth();
            mesecVracanja = mesecVracanja + 1;
            var danVracanja = datumBaza2.getDate();
            var datumString2 = danVracanja + "." + mesecVracanja + "." + godinaVracanja + ".";
            this.mojaIstorija[i].datumVracanjaString = datumString2;

          }
        }
      }
      this.zaduzeneService.sortirajPoDatumuVracanja(this.mojaIstorija);

    })

  }

  sortirajPoDatumuUzimanja(){
    this.zaduzeneService.sortirajPoDatumuUzimanja(this.mojaIstorija);
  }

  sortirajPoDatumuVracanja(){
    this.zaduzeneService.sortirajPoDatumuVracanja(this.mojaIstorija);


  }
  sortirajPoNazivuKnjige(){
    this.zaduzeneService.sortirajPoNazivuKnjige(this.mojaIstorija);


  }

  sortirajPoAutoruKnjige(){
    this.zaduzeneService.sortirajPoAutoruKnjige(this.mojaIstorija);

  }

  pregled(idKnjige){
    localStorage.setItem("knjiga", JSON.stringify(idKnjige));
    this.router.navigate(['/knjiga-detalji'])
  }



  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }

}
