import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autor } from '../model/autor';
import { BrojDana } from '../model/brojDana';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { ZaduzenaKnjiga } from '../model/zaduzenaKnjiga';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';
import { ZaduzenaKnjigaService } from '../services/zaduzena-knjiga.service';
import { SveKnjigeComponent } from '../sve-knjige/sve-knjige.component';

@Component({
  selector: 'app-zaduzene-knjige',
  templateUrl: './zaduzene-knjige.component.html',
  styleUrls: ['./zaduzene-knjige.component.css'],
})
export class ZaduzeneKnjigeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private knjigaService: KnjigaService,
    private router: Router,
    private zaduzeneService: ZaduzenaKnjigaService
  ) {}

  dohvatiBroj(){
    this.userService.dohvatiBrojDana().subscribe((resp: BrojDana[]) => {
      this.brojDanaZaVracanjeKnjige = resp[0].brojDana;
      this.brojDanaZaProduzavanje = resp[0].produzava;
    });
  }

  ngOnInit(): void {
    this.dohvatiBroj()
    

    this.porukaZaduziDa = '';
    this.porukaZaduziNe = '';
    this.porukaProduzeno = '';
    this.userService
      .dohvatiKorisnika(sessionStorage.getItem('user'))
      .subscribe((resp: User) => {
        this.korisnik = resp;

        this.zaduzeneService
          .dohvatiMojeZaduzeneKnjige(this.korisnik.username)
          .subscribe((k: ZaduzenaKnjiga[]) => {
            if (k) {
              this.zaduzene1 = k;
              for (let i = 0; i < this.zaduzene1.length; i++) {
                if (this.zaduzene1[i].datumVracanja == null) {
                  this.zaduzene.push(this.zaduzene1[i]);
                }
              }
              for (let i = 0; i < this.zaduzene.length; i++) {
                var datum1 = this.danas.getTime();
                var datumIzBaze = this.zaduzene[i].datumUzimanja;
                var pomocniDatum2 = new Date(datumIzBaze);
                var datum2 = pomocniDatum2.getTime();
                var razlika = (datum1 - datum2) / (24 * 3600 * 1000);
                var konacno = this.zaduzene[i].brojDana - razlika;
                konacno = konacno | 0;
                this.zaduzene[i].rok = konacno;
              }
            }
          });
      });
    if (this.zaduzene.length == 0) {
      this.message = 'Korisnik nema zaduzenih knjiga.';
    } else {
      this.message = 'nista';
    }
  }

  brojDanaZaVracanjeKnjige: number;
  brojDanaZaProduzavanje: number=14

  porukaZaduziDa: string;
  porukaZaduziNe: string;
  porukaProduzeno: string;

  autoriKnjige: Array<Autor>;
  nazivKnjige: string;
  rok: number;

  sveKjige: Knjiga[] = [];
  osoba: string;
  danas: Date = new Date();

  mojaIstorija: ZaduzenaKnjiga[] = [];

  message: string;

  zaduzene: ZaduzenaKnjiga[] = [];
  zaduzene1: ZaduzenaKnjiga[] = [];
  korisnik: User = new User();

  detalji(idKnjige) {
    localStorage.setItem('knjiga', JSON.stringify(idKnjige));
    this.router.navigate(['/knjiga-detalji']);
  }

  razduzi(id, datumUzimanja, naziv) {
    let danas = new Date();

    this.zaduzeneService
      .razduziKnjigu(id, datumUzimanja, danas)
      .subscribe((resp) => {
        if (resp['poruka'] == 'ok') {
          this.porukaZaduziDa = 'Uspešno razduživanje knjige.';
        } else {
          this.porukaZaduziNe = 'Neuspešno razduživanje knjige. Greška.';
        }

        this.knjigaService.povecajStanje(naziv).subscribe((resp) => {});

        this.zaduzene = [];
        this.zaduzeneService
          .dohvatiMojeZaduzeneKnjige(this.korisnik.username)
          .subscribe((zad: ZaduzenaKnjiga[]) => {
            if (zad) {
              this.mojaIstorija = zad;
              for (let j = 0; j < zad.length; j++) {
                if (zad[j].datumVracanja == null) {
                  this.zaduzene.push(zad[j]);
                }
              }
              for (let i = 0; i < this.zaduzene.length; i++) {
                var datum1 = this.danas.getTime();
                var datumIzBaze = this.zaduzene[i].datumUzimanja;
                var pomocniDatum2 = new Date(datumIzBaze);
                var datum2 = pomocniDatum2.getTime();
                var razlika = (datum1 - datum2) / (24 * 3600 * 1000);
                var konacno = this.zaduzene[i].brojDana - razlika;
                konacno = konacno | 0;
                this.zaduzene[i].rok = konacno;
              }
              for (let i = 0; i < zad.length; i++) {
                var datumBaza = new Date(zad[i].datumUzimanja);
                var godinaUzimanja = datumBaza.getFullYear();
                var mesecUzimanja = datumBaza.getMonth();
                mesecUzimanja = mesecUzimanja + 1;
                var danUzimanja = datumBaza.getDate();
                var datumString =
                  danUzimanja +
                  '.' +
                  mesecUzimanja +
                  '.' +
                  godinaUzimanja +
                  '.';
                this.mojaIstorija[i].datumUzimanjaString = datumString;
                if (zad[i].datumVracanja == null) {
                  this.mojaIstorija[i].datumVracanjaString = null;
                } else {
                  var datumBaza2 = new Date(zad[i].datumVracanja);
                  var godinaVracanja = datumBaza2.getFullYear();
                  var mesecVracanja = datumBaza2.getMonth();
                  mesecVracanja = mesecVracanja + 1;
                  var danVracanja = datumBaza2.getDate();
                  var datumString2 =
                    danVracanja +
                    '.' +
                    mesecVracanja +
                    '.' +
                    godinaVracanja +
                    '.';
                  this.mojaIstorija[i].datumVracanjaString = datumString2;
                }
              }
            }
          });
      });
  }

  produzi(idKnjige, username) {
    this.zaduzeneService
      .dohvatiKnjiguKorImeId(username, idKnjige)
      .subscribe((zaduzeno: ZaduzenaKnjiga) => {
        if (zaduzeno) {
          var brojDana = zaduzeno.brojDana;
          console.log(this.brojDanaZaProduzavanje)

          this.zaduzeneService
            .produzi(username, idKnjige, brojDana + this.brojDanaZaProduzavanje)
            .subscribe((resp) => {
              if (resp['poruka'] == 'ok') {
                this.porukaProduzeno = 'Uspešno produženo.';
                for (let i = 0; i < this.zaduzene.length; i++) {
                  if (
                    this.zaduzene[i].username == username &&
                    this.zaduzene[i].idKnjige == idKnjige
                  ) {
                    this.zaduzene[i].rok = this.zaduzene[i].rok + this.brojDanaZaProduzavanje;
                    this.zaduzene[i].produzeno = true;
                  }
                }
              }
            });
        }
      });
  }

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate(['']);
  }
}
