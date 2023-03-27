import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  korisnik:User=new User()

  ngOnInit(): void {
    this.userService.dohvatiKorisnika(sessionStorage.getItem("user")).subscribe((resp:User)=>{
      this.korisnik = resp;
    })
  }

  username:string;
  password:string;
  ime:string;
  prezime:string;
  ulicaBrojGrad:string;
  telefon:string;
  email:string;



  slikaUrl: any; 
	msg = "";
	
	

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }

  azurirajProfil(){
    this.router.navigate(['/azuriraj'])
  }


}
