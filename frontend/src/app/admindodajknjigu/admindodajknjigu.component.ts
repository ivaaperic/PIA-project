import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Autor } from '../model/autor';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { Zanr } from '../model/zanr';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admindodajknjigu',
  templateUrl: './admindodajknjigu.component.html',
  styleUrls: ['./admindodajknjigu.component.css'],
})
export class AdmindodajknjiguComponent implements OnInit {
  constructor(
    private router: Router,
    private knjigaService: KnjigaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .dohvatiKorisnika(sessionStorage.getItem('admin'))
      .subscribe((userFromDB: User) => {
        this.korisnik = userFromDB;
      });

    this.userService
      .dohvSveKnjige(this.korisnik.username)
      .subscribe((kor: Knjiga[]) => {
        this.sveKnjige = kor;
        this.sveKnjige.sort((a, b) => b.id - a.id);
        this.id = this.sveKnjige[0].id + 1;
      });

    this.status = 'prihvacena';

    this.sviAutori = this.knjigaService.dohvatiSveAutore();
    this.sviZanrovi = this.knjigaService.dohvatiSveZanrove();
  }

  korisnik: User = new User();
  sveKnjige: Knjiga[] = [];
  naziv: string;
  id: number;
  autori: Array<Autor>;
  zanrovi: Array<Zanr>;
  izdavac: string;
  godinaIzdavanja: number;
  jezik: string;
  slikaKorice: any;
  naStanju: string;
  message: string;
  porukaStatus: number;
  url: string;
  slikaOk: boolean;

  sviZanrovi: Zanr[] = [];
  sviAutori: Autor[] = [];

  dodajKolicinu: number;

  msg = '';
  form: FormGroup;

  selectFile(event: any) {
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = () => {
      this.slikaOk = true;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.slikaKorice = event.target.result;
      };
    };
  }

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate(['']);
  }
  status: String;

  dodajKnjigu() {
    if (
      !this.naziv ||
      this.id == null ||
      this.autori == null ||
      this.zanrovi == null ||
      this.izdavac == null ||
      this.godinaIzdavanja == null ||
      this.jezik == null ||
      this.naStanju
    ) {
      this.porukaStatus = 0;
      this.message = 'Sva polja su obavezna.';
    }
    if (this.zanrovi.length > 3) {
      this.porukaStatus = 0;
      this.message = 'Dozvoljeno je maksimalno 3 zanra.';
    }

    this.knjigaService.dohvatiSveKnjige().subscribe((data: Knjiga[]) => {
      this.sveKnjige = data;

      this.sveKnjige.forEach((d1) => {
        if (d1.id == this.id) {
          this.porukaStatus = 0;
          this.message = 'Postoji duplikat. Greska!';
          return;

          // this.naStanju+=this.dodajKolicinu;
          // console.log(this.naStanju)

          // this.knjigaService.promeniKolicinu(this.id, this.naStanju).subscribe((resp)=>{
          //   alert(resp['message'])

          // })
        }
      });
      this.knjigaService
        .dodajKnjigu(
          this.slikaKorice,
          this.id,
          this.naziv,
          this.autori,
          this.zanrovi,
          this.izdavac,
          this.godinaIzdavanja,
          this.jezik,
          this.status,
          this.korisnik.username
        )
        .subscribe((respObj) => {
          if (respObj['message'] == 'ok') {
            this.porukaStatus = 2;
            this.message = 'Knjiga je dodata';
            this.router.navigate(['login']);
          } else {
            this.porukaStatus = 0;
            this.message = 'Postoji duplikat. Greska!';
          }
        });
    });
  }
}
