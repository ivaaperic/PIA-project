import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../model/autor';
import { BrojDana } from '../model/brojDana';
import { Knjiga } from '../model/knjiga';
import { Komentar } from '../model/komentar';
import { Ocena } from '../model/ocena';
import { User } from '../model/user';
import { ZaduzenaKnjiga } from '../model/zaduzenaKnjiga';
import { Zanr } from '../model/zanr';
import { KnjigaService } from '../services/knjiga.service';
import { KomentarService } from '../services/komentar.service';
import { OcenaService } from '../services/ocena.service';
import { UserService } from '../services/user.service';
import { ZaduzenaKnjigaService } from '../services/zaduzena-knjiga.service';

@Component({
  selector: 'app-knjiga-detalji',
  templateUrl: './knjiga-detalji.component.html',
  styleUrls: ['./knjiga-detalji.component.css'],
})
export class KnjigaDetaljiComponent implements OnInit {
  @Input() myBook: Knjiga;

  constructor(
    private knjigaServis: KnjigaService,
    private router: Router,
    private userService:UserService,
    private zaduzenaService:ZaduzenaKnjigaService,
    private ocenaService:OcenaService,
    private komentarService:KomentarService
  ) {}


  ngOnInit(): void {
    this.userService.dohvatiBrojDana().subscribe((resp:BrojDana[])=>{
      this.brojDanaZaVracanjeKnjige=resp[0].brojDana
      this.brojDanaZaProduzavanje=resp[0].produzava
    })

    this.prosecnaOcena=0;
    this.slikaOk=false;
    this.danas=new Date();

    this.porukaZaduziDa=''
    this.porukaZaduziNe=''
    //let id=this.ruta.snapshot.paramMap.get('id');

    // this.knjigaService.dohvatiKnjigu(id).subscribe((k:Knjiga)=>{
    //   this.knjiga = k;
    // })

    this.userService.dohvatiKorisnika(sessionStorage.getItem("user")).subscribe((resp:User)=>{
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
      
      let suma = 0;
        let ocene = this.knjiga.ocena;
        for (let i = 0; i < this.knjiga.ocena.length; i++) {
          let sabirak = ocene[i];
          suma += parseInt(sabirak);
        }
        this.prosecnaOcena = suma / this.knjiga.ocena.length;
        this.prosecnaOcenaString = this.prosecnaOcena.toFixed(2);

        this.ocenaService.dohvatiOceneJedneKnjige(this.knjiga.id).subscribe((ocene: Ocena[]) => {
          if (ocene) {
            this.sveOceneKnjige = ocene;
          }
        })

        this.komentarService.dohvatiKomentare(this.knjiga.id).subscribe((komentari: Komentar[]) => {
          if (komentari) {
            this.sviKomentari = komentari;

            for (let i = 0; i < this.sviKomentari.length; i++) {
              let datum = new Date(this.sviKomentari[i].datum);
              this.sviKomentari[i].godina = datum.getFullYear();
              this.sviKomentari[i].mesec = datum.getMonth() + 1;
              this.sviKomentari[i].dan = datum.getDate();
              this.sviKomentari[i].sati = datum.getHours();
              this.sviKomentari[i].minuti = datum.getMinutes();

              this.sviKomentari[i].godinaString = "" + this.sviKomentari[i].godina;
              if (this.sviKomentari[i].mesec < 10) { this.sviKomentari[i].mesecString = "0" + this.sviKomentari[i].mesec; }
              else this.sviKomentari[i].mesecString = "" + this.sviKomentari[i].mesec;
              if (this.sviKomentari[i].dan < 10) { this.sviKomentari[i].danString = "0" + this.sviKomentari[i].dan; }
              else this.sviKomentari[i].danString = "" + this.sviKomentari[i].dan;
              if (this.sviKomentari[i].sati < 10) { this.sviKomentari[i].satiString = "0" + this.sviKomentari[i].sati; }
              else this.sviKomentari[i].satiString = "" + this.sviKomentari[i].sati;
              if (this.sviKomentari[i].minuti < 10) { this.sviKomentari[i].minutiString = "0" + this.sviKomentari[i].minuti; }
              else this.sviKomentari[i].minutiString = "" + this.sviKomentari[i].minuti;

              if (this.sviKomentari[i].azurirano) {
                let datumA = new Date(this.sviKomentari[i].datumAzuriranja);
                this.sviKomentari[i].godinaA = datumA.getFullYear();
                this.sviKomentari[i].mesecA = datumA.getMonth() + 1;
                this.sviKomentari[i].danA = datumA.getDate();
                this.sviKomentari[i].satiA = datumA.getHours();
                this.sviKomentari[i].minutiA = datumA.getMinutes();

                this.sviKomentari[i].godinaAString = "" + this.sviKomentari[i].godinaA;
                if (this.sviKomentari[i].mesecA < 10) { this.sviKomentari[i].mesecAString = "0" + this.sviKomentari[i].mesecA; }
                else this.sviKomentari[i].mesecAString = "" + this.sviKomentari[i].mesecA;
                if (this.sviKomentari[i].danA < 10) { this.sviKomentari[i].danAString = "0" + this.sviKomentari[i].danA; }
                else this.sviKomentari[i].danAString = "" + this.sviKomentari[i].danA;
                if (this.sviKomentari[i].satiA < 10) { this.sviKomentari[i].satiAString = "0" + this.sviKomentari[i].satiA; }
                else this.sviKomentari[i].satiAString = "" + this.sviKomentari[i].satiA;
                if (this.sviKomentari[i].minutiA < 10) { this.sviKomentari[i].minutiAString = "0" + this.sviKomentari[i].minutiA; }
                else this.sviKomentari[i].minutiAString = "" + this.sviKomentari[i].minutiA;

              }
            }
          }
        })
      
    });

    this.zaduzenaService.dohvatiMojeZaduzeneKnjige(this.korisnik.username).subscribe((knjige: ZaduzenaKnjiga[]) => {
      if (knjige) {
        for (let i = 0; i < knjige.length; i++) {
          if (knjige[i].datumVracanja == null) {
            this.mojeZaduzeneKnjige.push(knjige[i]);
          }
        }
        for (let i = 0; i < this.mojeZaduzeneKnjige.length; i++) {
          var datum1 = this.danas.getTime();
          var datumIzBaze = knjige[i].datumUzimanja;
          var pomocniDatum = new Date(datumIzBaze);
          var datum2 = pomocniDatum.getTime();
          var razlika = (datum1 - datum2) / (24 * 3600 * 1000);
          var konacno = knjige[i].brojDana - razlika;
          konacno = konacno | 0;
          this.mojeZaduzeneKnjige[i].rok = konacno;
        }
      }
    })


  }

  oceniKomentarisiKnjiga: Knjiga;
  oceniKomentarisiBoolean: boolean = false;

  ocenaK: number;
  ocenitiBoolean: string;
  porukaOK:string

  oceniKomentarisi(id) {
    this.oceniKomentarisiBoolean = false;
    this.knjigaServis.dohvatiKnjigu(id).subscribe((k: Knjiga) => {
      if (k) {
        this.oceniKomentarisiKnjiga = k;
        this.oceniKomentarisiBoolean = true;
      }
    })
  }



  logout() {
    sessionStorage.clear();
    localStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }
  komentarisatiBoolean: string;
  komentar: string;


  dugme() {
    this.porukaOK = "";
    if (this.ocenitiBoolean == "da") {
      this.zaduzenaService.dohvatiKnjiguKorImeId(this.korisnik.username, this.oceniKomentarisiKnjiga.id).subscribe((k: ZaduzenaKnjiga) => {
        if(k){
          this.ocenaService.dohvatiOceneJedneKnjige(this.oceniKomentarisiKnjiga.id).subscribe((o: Ocena[]) => {
            let cnt=0;
            for(let i=0; i<o.length;i++){
              if(o[i].username==this.korisnik.username){
                cnt++
              }
            }
            if(cnt>0){
              this.porukaOK = this.porukaOK + " Već ste ocenili ovu knjigu, nije moguće oceniti je ponovo.";
              return;
            } else{
              this.ocenaService.dodajOcenu(this.ocenaK, this.korisnik.username, this.oceniKomentarisiKnjiga.id).subscribe(resp => {
                this.knjigaServis.izmeniKnjiguOcena(this.oceniKomentarisiKnjiga.id, this.ocenaK).subscribe(resp => {
                  this.porukaOK = this.porukaOK + " Ocena je uspešno dodata."
                });
        
              });

            }
          })
        }
      })
      
    }

    if (this.komentarisatiBoolean == "da") {
      this.zaduzenaService.dohvatiKnjiguKorImeId(this.korisnik.username, this.oceniKomentarisiKnjiga.id).subscribe((k: ZaduzenaKnjiga) => {
        if (k) {
          this.komentarService.dohvatiKomentarKorImeId(this.korisnik.username, this.oceniKomentarisiKnjiga.id).subscribe((kom: Komentar) => {
            if (kom) {
              this.porukaOK = this.porukaOK + " Već ste komentarisali ovu knjigu, nije moguće komentarisati je ponovo.";
              return;
            } else {
              //dodaj komentar
              let datum = new Date();
              this.komentarService.dodajKomentar(this.oceniKomentarisiKnjiga.id, this.komentar, this.korisnik.username, datum).subscribe(resp => {
                this.porukaOK = this.porukaOK + " Komentar je uspešno dodat."
              });
            }
          })
        } else {
          this.porukaOK = this.porukaOK + " Ne možete dodati komentar jer niste zaduživali ovu knjigu.";
        }
      })


    }

  }

  korisnik:User=new User()
  prosecnaOcena:number;
  prosecnaOcenaString:string;
  

  porukaZaduziDa: string;
  porukaZaduziNe: string;
  myID: number;
  knjiga: Knjiga = new Knjiga();
  datumUzimanja:Date=new Date();
  datumVracanja:Date=new Date();

  sveOceneKnjige: Ocena[] = [];
  sviKomentari: Komentar[] = [];

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
  brojDanaZaProduzavanje: number;

  azurirajKomentarBoolean: boolean = false;

  noviKomentar: string;

  danas: Date=new Date()
  mozeSeZaduziti: boolean = true;

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

  azurirajKomentar() {
    this.azurirajKomentarBoolean = true;
  }

  potvrdiAzuriranje(idKnjige) {
    this.azurirajKomentarBoolean = false;
    let danas = new Date();

    this.komentarService.izmeniKomentar(this.korisnik.username, idKnjige, this.noviKomentar, danas).subscribe(resp => {
      this.ngOnInit();
    })
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


  zaduzi() {
    this.mojeZaduzeneKnjige = [];
    this.zaduzenaService.dohvatiMojeZaduzeneKnjige(this.korisnik.username).subscribe((knjigeZ: ZaduzenaKnjiga[]) => {
      if (knjigeZ) {
        for (let i = 0; i < knjigeZ.length; i++) {
          if (knjigeZ[i].datumVracanja == null) {
            this.mojeZaduzeneKnjige.push(knjigeZ[i]);
          }
        }

        for (let i = 0; i < this.mojeZaduzeneKnjige.length; i++) {
          var datum1 = this.danas.getTime();
          var datumIzBaze = this.mojeZaduzeneKnjige[i].datumUzimanja;
          var pomocniDatum2 = new Date(datumIzBaze);
          var datum2 = pomocniDatum2.getTime();
          var razlika = (datum1 - datum2) / (24 * 3600 * 1000);
          var konacno = this.mojeZaduzeneKnjige[i].brojDana - razlika;
          konacno = konacno | 0;
          this.mojeZaduzeneKnjige[i].rok = konacno;

        }
        if (this.mojeZaduzeneKnjige.length >= 3) {
          this.mozeSeZaduziti = false;
          this.porukaZaduziNe = "Ne možete zadužiti knjigu jer već imate 3 zadužene knjige.";
          return;
        }
        for (let i = 0; i < this.mojeZaduzeneKnjige.length; i++) {
          if (this.mojeZaduzeneKnjige[i].rok < 0) {
            this.mozeSeZaduziti = false;
            this.porukaZaduziNe = "Ne možete zadužiti knjigu jer kod sebe imate knjige kojima je istekao rok za vraćanje.";
            return;
          }
        }
        //imam vec zaduzenu
        for (let i = 0; i < this.mojeZaduzeneKnjige.length; i++) {
          if (this.mojeZaduzeneKnjige[i].nazivKnjige == this.knjiga.naziv) {
            this.mozeSeZaduziti=false;
            this.porukaZaduziNe = "Ne možete zadužiti knjigu jer ovu knjigu već imate zaduženu."
            return;
          }
        }
        this.knjigaServis.dohvatiKnjigu(this.knjiga.id).subscribe((knjigaN: Knjiga) => {
          if (knjigaN) {
            if(knjigaN.naStanju<1){
              this.mozeSeZaduziti=false;
              this.porukaZaduziNe = "Ne možete zadužiti knjigu jer je nema na stanju.";
              return;

            } else if (this.mozeSeZaduziti && knjigaN.naStanju>=1) {
              //zaduzi knjigu
              //smanji stanje
              //let danas = new Date();
              if(knjigaN.naStanju<1){
                this.mozeSeZaduziti=false;
                this.porukaZaduziNe = "Ne možete zadužiti knjigu jer je nema na stanju.";
                return;
              } else{
                this.zaduzenaService.zaduziKnjigu(this.knjiga.id, this.korisnik.username, this.danas, this.knjiga.slikaKorice, this.knjiga.naziv, this.knjiga.autori, this.brojDanaZaVracanjeKnjige).subscribe(resp => {
                  if (resp['poruka'] == 'ok') {
                    this.porukaZaduziDa = "Uspešno zaduživanje knjige."
                    this.knjigaServis.smanjiStanje(this.knjiga.naziv).subscribe(resp => {
                      if (resp['poruka'] == 'ok') {
                        this.porukaZaduziDa = "Uspešno zaduživanje knjige."
                      } else {
                        this.porukaZaduziNe = "Neuspešno zaduživanje knjige. Greška."
                      }
                      this.ngOnInit();
                    })
                  } else {
                    this.porukaZaduziNe = "Neuspešno zaduživanje knjige. Greška."
                  }
                })
              }
            }

          }
        })

      }
    })
  }

}
