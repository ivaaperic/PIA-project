import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-azuriraj',
  templateUrl: './azuriraj.component.html',
  styleUrls: ['./azuriraj.component.css']
})
export class AzurirajComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.dohvatiKorisnika(sessionStorage.getItem("user")).subscribe((resp:User)=>{
      this.korisnik = resp;
      this.ime = this.korisnik.ime;
      this.prezime = this.korisnik.prezime;
      this.username = this.korisnik.username;
      this.telefon = this.korisnik.telefon;
      this.email = this.korisnik.email;
      this.ulicaBrojGrad = this.korisnik.ulicaBrojGrad;
    })
    this.statusPoruka = 0;
    this.statusPorukaKorisnicko = -1;
    this.statusPorukaEmail = -1;
    this.statusPorukaLozinka = 0;
    this.statusPorukaLokacija = 0;
  }
  korisnik:User=new User()
  porukaKorisnicko: string;
  porukaEmail: string;
  porukaTelefon: string;
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
  pswPattern = new RegExp(
    '^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,11}$'
  );
  telefonPattern = new RegExp('^[0]{1}[6]{1}[0-6]{1}[0-9]{7}$');
  emailPattern = new RegExp('^[a-z][a-z0-9]*@[a-z]+\\.[a-z]+$');

  statusPorukaKorisnicko: number;
  statusPorukaEmail: number;
  statusPorukaLozinka: number;
  logout() {
    sessionStorage.clear();
    localStorage.clear()
    this.router.navigate([''])
  }



  updateOwner() {
    if(!this.telefonPattern.test(this.telefon)){
      this.statusPoruka = 2;
      this.porukaTelefon = "Neispravan format telefona.";
    }else
    if(this.telefon == this.korisnik.telefon &&this.ime==this.korisnik.ime&&this.prezime==this.korisnik.prezime) {
      this.statusPoruka = 3;
      this.porukaTelefon = "Nema promene.";
    }else{
      this.userService.updateInfo(this.korisnik.username, this.ime, this.prezime, this.telefon).subscribe((resp)=>{
        if(resp["message"]=="ok") {
          this.statusPoruka = 1;
        }
      })
    }
    
    
  }

  

  updateUsername() {
    if(this.username != this.korisnik.username) {
      this.userService.updateUsername(this.korisnik.username, this.username).subscribe((resp)=>{
              this.logout();
      })
    } else {
      this.statusPorukaKorisnicko = 1;
      this.porukaKorisnicko = "Nema izmene.";
    }
  }

  updateEmail() {
    if(!this.emailPattern.test(this.email)){
      this.statusPorukaEmail = 0;
      this.porukaEmail = "Neispravan mejl.";
    } else
    if(this.email != this.korisnik.email) {
      this.userService.updateEmail(this.korisnik.email, this.email).subscribe((resp)=>{
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
      if(this.passwordOld != this.korisnik.password) {
        this.statusPorukaLozinka = -1;
        this.porukaLozinka = "Stara lozinka je neispravna.";
      } else {
        const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,12}$');
        if(!regex.test(this.passwordNova)) {
          this.statusPorukaLozinka = -1;
          this.porukaLozinka = "Nova lozinka nije u odgovarajućem formatu.";
        } else {
          this.userService.promeniLoz(this.korisnik.username, this.passwordNova).subscribe(resp=>{
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
    this.userService.updateAdresu(this.korisnik.username, this.ulicaBrojGrad).subscribe((resp)=>{
      if(resp["message"]="ok") {
        this.statusPorukaLokacija = 1;
      } else {
        this.statusPorukaLokacija = -1;
      }
    })
  }


}
