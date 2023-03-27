import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { ZaduzenaKnjiga } from '../model/zaduzenaKnjiga';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { ZaduzenaKnjigaService } from '../services/zaduzena-knjiga.service';

@Component({
  selector: 'app-adminazurirajkorisnika',
  templateUrl: './adminazurirajkorisnika.component.html',
  styleUrls: ['./adminazurirajkorisnika.component.css']
})
export class AdminazurirajkorisnikaComponent implements OnInit {

  constructor(private router:Router, private userService:UserService,
    private zaduzeneService:ZaduzenaKnjigaService,
    private adminService:AdminService) { }

  zaIzmenuKorisnik:User=new User()
  ngOnInit(): void {

    this.userService.dohvatiKorisnika(localStorage.getItem('user')).subscribe((user:User)=>{
      this.zaIzmenuKorisnik=user;
      this.ime = this.zaIzmenuKorisnik.ime;
      this.prezime = this.zaIzmenuKorisnik.prezime;
      this.username = this.zaIzmenuKorisnik.username;
      this.telefon = this.zaIzmenuKorisnik.telefon;
      this.email = this.zaIzmenuKorisnik.email;
      this.ulicaBrojGrad = this.zaIzmenuKorisnik.ulicaBrojGrad;
      
    })
  

    this.userService.dohvatiKorisnika(sessionStorage.getItem('admin')).subscribe((user:User)=>{
      
      this.korisnik=user
    })
    
    this.statusPoruka = 0;
    this.statusPorukaKorisnicko = -1;
    this.statusPorukaEmail = -1;
    this.statusPorukaLozinka = 0;
    this.statusPorukaLokacija = 0;
    this.statusPorukaObrisi=-1
  }
  porukaKorisnicko: string;
  porukaEmail: string;
  porukaLozinka: string;
  ime: string;
  prezime: string;
  username: string;
  passwordNova: string;
  passwordAgain: string;
  passwordOld: string;
  telefon: string;
  email: string;
  naziv: string;
  ulicaBrojGrad: string;

  statusPoruka: number;
  statusPorukaLokacija: number;

  porukaObrisi:string;
  statusPorukaObrisi:number;

  statusPorukaKorisnicko: number;
  statusPorukaEmail: number;
  statusPorukaLozinka: number;
  korisnik:User=new User()
  logout() {
    sessionStorage.clear();
    localStorage.clear()
    this.router.navigate([''])
  }



  updateOwner() {
    this.userService.updateInfo(this.zaIzmenuKorisnik.username, this.ime, this.prezime, this.telefon).subscribe((resp)=>{
      if(resp["message"]=="ok") {
        this.statusPoruka = 1;
      }
    })
  }

  obrisiKorisnika(){
    this.zaduzeneService.dohvatiMojeZaduzeneKnjige(this.zaIzmenuKorisnik.username).subscribe((zaduzeneK: ZaduzenaKnjiga[]) => {
      if (zaduzeneK) {
        if (zaduzeneK.length == 0) {
          //moze se brisati
          this.adminService.obrisiKorisnika(this.zaIzmenuKorisnik.username).subscribe(resp => {
            if (resp['poruka'] == 'ok') {
              this.statusPorukaObrisi = 2;
              this.porukaObrisi = "Korisnik je uspešno obrisan.";

              this.router.navigate(['/svi-korisnici'])
            }
          })
        } else {
          //ne moze 
          this.statusPorukaObrisi = 1;
          this.porukaObrisi = "Ne možete obrisati ovog korisnika jer ima zadužene knjige.";
        }
      }
    })

  }

  

  updateUsername() {
    if(this.username != this.zaIzmenuKorisnik.username) {
      this.userService.updateUsername(this.zaIzmenuKorisnik.username, this.username).subscribe((resp)=>{
              this.logout();
      })
    } else {
      this.statusPorukaKorisnicko = 1;
      this.porukaKorisnicko = "Nema izmene.";
    }
  }

  updateEmail() {
    if(this.email != this.zaIzmenuKorisnik.email) {
      this.userService.updateEmail(this.zaIzmenuKorisnik.email, this.email).subscribe((resp)=>{
            this.statusPorukaEmail = 2;
            this.porukaEmail = "Uspeh!";
      })
    } else {
      this.statusPorukaEmail = 1;
      this.porukaEmail = "Nema izmene.";
    }
  }

  updatePassword() {
    if(this.passwordNova != this.passwordAgain) {
      this.statusPorukaLozinka = -1;
      this.porukaLozinka = "Lozinke se ne slažu.";
    } else {
      if(this.passwordOld != this.zaIzmenuKorisnik.password) {
        this.statusPorukaLozinka = -1;
        this.porukaLozinka = "Stara lozinka je neispravna.";
      } else {
        const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,12}$');
        if(!regex.test(this.passwordNova)) {
          this.statusPorukaLozinka = -1;
          this.porukaLozinka = "Nova lozinka nije u odgovarajućem formatu.";
        } else {
          this.userService.promeniLoz(this.zaIzmenuKorisnik.username, this.passwordNova).subscribe(resp=>{
            if(resp["message"]=="ok") {
              this.logout();
            } else {
              this.statusPorukaLozinka = -1;
              this.porukaLozinka = "Greška."; 
            }
          })
        }
      }
    }
    
  }

  updateAdresu() {
    this.userService.updateAdresu(this.zaIzmenuKorisnik.username, this.ulicaBrojGrad).subscribe((resp)=>{
      if(resp["message"]="ok") {
        this.statusPorukaLokacija = 1;
      } else {
        this.statusPorukaLokacija = -1;
      }
    })
  }



}
