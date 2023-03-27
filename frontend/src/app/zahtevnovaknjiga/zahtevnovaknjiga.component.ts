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
  selector: 'app-zahtevnovaknjiga',
  templateUrl: './zahtevnovaknjiga.component.html',
  styleUrls: ['./zahtevnovaknjiga.component.css']
})
export class ZahtevnovaknjigaComponent implements OnInit {

  constructor(private userService:UserService, private knjigaService:KnjigaService, private router:Router) { }

  ngOnInit(): void {
    this.userService
      .dohvatiKorisnika(sessionStorage.getItem('user'))
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

     if(this.korisnik.tip=='citalac'){
      this.status = 'ceka';
     } else if(this.korisnik.tip=='moderator' || this.korisnik.tip=='admin'){
      this.status=='prihvacena'
     } else {
      this.message=='Ovaj korisnik ne moze da dodaje knjigu.'
     }
    

    this.slikaKorice="data:image/png;base64,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TZiTh4eHdZ1W8IMWPKzX6w0Gg7W1tY2NjU14yNZ3Ozs7e3t7w+Hw/Py80grc04JfrKyshK5fXV2lXwOdoQXR+vr62dnZ58+f6zo5BJ5R11sQDgEuLi7SnUKHdboFR0dHdgTgXsUtCMf26TndXL/fv7y8TPcF1NuCu7u78HxOz+yG1tbW6vrDcsigcy0Io6r+4Af+ks61wKEBPKhbLTg+Pk7jgV91qAXr6+thVBoP/KpDLXAeAczRlRZsbGykkcBDutKC6i4yA5l1pQU3NzdpJDyTyWQSXmMODg7u/2Bxf38/fPtfhVcuuNeJFgwGgzQMnsmnT59WV1fTDPvJysrK9fV1WqgqnWjB0dFRGgbP4cuXL3NOgQ83hVKkRevRiRZU2mnKFObe+vp6mluP2N7eTkvXY/lb0Ov16j2Eo0Dj8TjNrbnCvkMaUInlb0HYYdMCntFwOExza67Xr1+nAZVY/haExbSAZ7S5uZnm1lyvXr3yP9Ry0AJeyoITL5hMJmlMDSpuwYOf6PzOMQLPa/ELavmf6zmEFqytraVVPlev13PBAp7R4i2o65I5tbYgHIkteNgWfPjwIQ2D1rSgODs7O2mV/0l17+hSMi0ozoIf7QRh43nLgOeiBcW5uLhIq3wBLm3Gc9GC4tze3qZVvoDRaJSGQTtaUKKtra201v9kZWWlrg1DsbSgRG/fvk1rfQH7+/tpGLSgBSW6vr5Oa30BYRP6g0Xa04ISTafTxU8IDQaDgSMFWtKCQjX6NCHY29tLI+FJtKBQYddgwT9M+OHg4ODOP0rgqbSgXKPRKK37hb1+/bquvyGjHFpQrvCs7vV6afUvbH193cmIPIEWFO34+Dit/ib6/X4Y6HiBRrSgaLe3t3OuSztf2EEYj8cOGViQFpTu6uoqbYEnCRt4OBy60gF/pAUVODg4SBuhhbW1tb29vcPDw5OTk4uLi/fwq8XfnNKCFxP28xe82BFkoAUvqdFZyfBXacELG4/Hix/Rwd+jBS8vHOo/4YwDeF5aUISzs7O0QeCFaEERptPp+fn5k086gPb8f4SCfPz4cTAYpC0DedV1kvuStyAIbV786unwXF69epWmYCWWvwX3wvGCUw/Iqbpr6nWlBcHd3d1wOPQOAnlUd0G9DrXgXjhkOD4+9okjf9XGxkaacPXoXAvuTSaTs7OzsBdnN4Fn1+/3P378mKZaPTragh+m0+l4PN7b2xsMBqEL9hdoI8yftbW1m5ubNL2q0vUW/HB3d/f169ewFT98+HBycjIajcJew/b29ib8ye7u7nA4DHuanz9/Dq8uaUrVRguASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuASAuAb9++fft/OZ3QYt1Q+DgAAAAASUVORK5CYII="

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
  jezik: string=''
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
    this.slikaKorice=''
    img.onload = () => {
      
      this.slikaOk = true;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.slikaKorice = event.target.result;
      }
        
    }
    
  }

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate(['']);
  }
  status: String=''

  dodajKnjigu() {
    if (
      !this.naziv ||
      !this.id == null ||
      !this.autori == null ||
      !this.zanrovi == null ||
      !this.izdavac == null ||
      !this.godinaIzdavanja == null ||
      !this.jezik == null 
    ) {
      this.porukaStatus = 0;
      this.message = 'Sva polja su obavezna.';
      return;
    }
    if (this.zanrovi.length > 3) {
      this.porukaStatus = 0;
      this.message = 'Dozvoljeno je maksimalno 3 zanra.';
      return;
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
          this.jezik,
          this.status,
          this.slikaKorice,
          this.id,
          this.naziv,
          this.autori,
          this.zanrovi,
          this.izdavac,
          this.godinaIzdavanja,
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
