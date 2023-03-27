import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminpromenalozinke',
  templateUrl: './adminpromenalozinke.component.html',
  styleUrls: ['./adminpromenalozinke.component.css']
})
export class AdminpromenalozinkeComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.dohvatiKorisnika(sessionStorage.getItem("admin")).subscribe((resp: User)=>{
      this.korisnik = resp;
    })
    this.message="nista"
  }


  korisnik:User

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate(['/login'])
  }
  stara:string;
  password1:string;
  password2:string;
  message:string;
  msg:''
  form:FormGroup
  pswPattern = new RegExp('^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,11}$');
  
  change(){

    if(this.password1 != this.password2) {
      this.message = "Lozinke se ne slažu.";
    } else {
      if(this.stara != this.korisnik.password) {
        this.message = "Stara lozinka je neispravna.";
      } else {
        const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,12}$');
        if(!regex.test(this.password1)) {
          this.message = "Nova lozinka nije u odgovarajućem formatu.";
        } else {
          this.userService.promeniLoz(this.korisnik.username, this.password1).subscribe(resp=>{
            if(resp["message"]=="ok") {
              this.logout();
            } else {
              this.message = "Greška."; 
            }
          })
        }
      }
    }
  }

}
