import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Autor } from '../model/autor';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { ZaduzenaKnjiga } from '../model/zaduzenaKnjiga';
import { Zanr } from '../model/zanr';
import { AdminService } from '../services/admin.service';
import { KnjigaService } from '../services/knjiga.service';
import { OcenaService } from '../services/ocena.service';
import { UserService } from '../services/user.service';
import { ZaduzenaKnjigaService } from '../services/zaduzena-knjiga.service';

@Component({
  selector: 'app-adminazurirajknjigu',
  templateUrl: './adminazurirajknjigu.component.html',
  styleUrls: ['./adminazurirajknjigu.component.css']
})
export class AdminazurirajknjiguComponent implements OnInit {

  constructor(
    private knjigaServis: KnjigaService,
    private router: Router,
    private userService:UserService,
    private zaduzeneService:ZaduzenaKnjigaService,
    private adminService:AdminService,
    private ocenaService:OcenaService
  ) {}

  ngOnInit(): void {
    this.prosecnaOcena=0;
    this.slikaOk=false;
    //let id=this.ruta.snapshot.paramMap.get('id');

    // this.knjigaService.dohvatiKnjigu(id).subscribe((k:Knjiga)=>{
    //   this.knjiga = k;
    // })

    this.userService.dohvatiKorisnika(sessionStorage.getItem("admin")).subscribe((resp:User)=>{
      this.korisnik = resp;
    })
    
    this.myID = JSON.parse(localStorage.getItem('knjiga'));
    console.log(this.myID)

    this.knjigaServis.dohvatiKnjigu(this.myID).subscribe((k: Knjiga) => {
      this.knjiga = k;
      this.izmenaNaziv=this.knjiga.naziv
      this.izmenaAutor=this.knjiga.autori
      this.izmenaZanr=this.knjiga.zanrovi
      this.izmenaIzdavac=this.knjiga.izdavac
      this.izmenaGodinaIzdanja=this.knjiga.godinaIzdavanja
      this.izmenaJezik=this.knjiga.jezik
      this.izmenaNaStanju=this.knjiga.naStanju
      this.izmenaSlika=this.knjiga.slikaKorice
      
    });

    
    this.statusPorukaObrisi=-1
  }

  porukaObrisi:string=''

  statusPorukaObrisi:number


  obrisiKnjigu(){
    //proveri da li je knjiga trenutno zaduzena
    this.zaduzeneService.dohvatiKnjiguId(this.knjiga.id).subscribe((k: ZaduzenaKnjiga[]) => {
      if (k) {
        if (k.length > 0) {
          this.statusPorukaObrisi = 1;
          this.porukaObrisi = "Nije moguće obrisati ovu knjigu jer je trenutno zadužena.";
        } else {
          this.adminService.obrisiKnjigu(this.knjiga.id).subscribe(resp => {
            if (resp['poruka'] == 'ok') {
              

              this.ocenaService.obrisiOceneKnjige(this.knjiga.id).subscribe(resp => {
                if (resp['poruka'] == 'ok') {
                  this.statusPorukaObrisi = 2;

                  this.porukaObrisi = "Knjiga je uspešno obrisana."
                  this.router.navigate(['/sve-knjige'])
                }
              })
            } else {
              this.statusPorukaObrisi = 0;
              this.porukaObrisi = "Neuspesno brisanje knjige. Greska."
            }
          })

        }

      }
    })
  }



  logout() {
    sessionStorage.clear();
    localStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }

  korisnik:User=new User()
  prosecnaOcena:number;
  prosecnaOcenaString:string;
  

  user:User
  myID: number;
  knjiga: Knjiga = new Knjiga();

  izmenaNazivBoolean: string;
  izmenaNaziv: string;
  izmenaAutorBoolean: string;
  izmenaAutor: Array<Autor>;
  izmenaZanrBoolean: string;
  izmenaZanr: Array<Zanr>;
  izmenaIzdavacBoolean: string;
  izmenaIzdavac: string;
  izmenaGodinaIzdanjaBoolean: string;
  izmenaGodinaIzdanja: number;
  izmenaJezikBoolean: string;
  izmenaJezik: string;
  izmenaNaStanjuBoolean: string;
  izmenaNaStanju: number;
  izmenaSlikaBoolean: string;
  izmenaSlika: any;

  porukaSlika: string;

  porukaIzmena: string;

  brojDanaZaVracanjeKnjige: number;

  azurirajKomentarBoolean: boolean = false;

  noviKomentar: string;

  danas: Date;

  mojeZaduzeneKnjige: ZaduzenaKnjiga[] = [];

  url: string;
  slikaOk: boolean;
  

  form: FormGroup;

  selectFile(event: any) {
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = () => {
      this.slikaOk = true;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.izmenaSlika = event.target.result;
      };
    };
  }

  azurirajKnjigu() {
    this.porukaIzmena = "";

    if (this.izmenaNazivBoolean == "da") {
      this.knjigaServis.izmeniNazivKnjige(this.knjiga.id, this.izmenaNaziv).subscribe(resp => {
        this.porukaIzmena = this.porukaIzmena + " Uspešno izmenjen naziv."

      })
    }

    if (this.izmenaAutorBoolean == "da") {
      this.knjigaServis.izmeniAutoraKnjige(this.knjiga.id, this.izmenaAutor).subscribe(resp => {
        this.porukaIzmena = this.porukaIzmena + " Uspešno izmenjen autor."

      })
    }

    if (this.izmenaZanrBoolean == "da") {
      this.knjigaServis.izmeniZanrKnjige(this.knjiga.id, this.izmenaZanr).subscribe(resp => {
        this.porukaIzmena = this.porukaIzmena + " Uspešno izmenjen žanr."

      })
    }

    if (this.izmenaIzdavacBoolean == "da") {
      this.knjigaServis.izmeniIzdavacaKnjige(this.knjiga.id, this.izmenaIzdavac).subscribe(resp => {
        this.porukaIzmena = this.porukaIzmena + " Uspešno izmenjen izdavač."
      })
    }

    if (this.izmenaGodinaIzdanjaBoolean == "da") {
      this.knjigaServis.izmeniGodinuIzdanjaKnjige(this.knjiga.id, this.izmenaGodinaIzdanja).subscribe(resp => {
        this.porukaIzmena = this.porukaIzmena + " Uspešno izmenjena godina izdanja."

      })
    }

    if (this.izmenaJezikBoolean == "da") {
      this.knjigaServis.izmeniJezikKnjige(this.knjiga.id, this.izmenaJezik).subscribe(resp => {
        this.porukaIzmena = this.porukaIzmena + " Uspešno izmenjen jezik."

      })
    }

    if (this.izmenaNaStanjuBoolean == "da") {
      this.knjigaServis.izmeniNaStanjuKnjige(this.knjiga.id, this.izmenaNaStanju).subscribe(resp => {
        this.porukaIzmena = this.porukaIzmena + " Uspešno izmenjen broj knjiga na stanju."

      })
    }

    if (this.izmenaSlikaBoolean == "da") {
      this.knjigaServis.izmeniSlikuKnjige(this.knjiga.id, this.izmenaSlika).subscribe(resp => {
        this.porukaIzmena = this.porukaIzmena + " Uspešno izmenjena slika."

      })
    }
  }

  zahtevi(){
    this.router.navigate(['/zahtevimoderator'])
  }

  azurirajStranicu(){
    this.ngOnInit();
  }


}


