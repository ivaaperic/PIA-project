import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sve-knjige',
  templateUrl: './sve-knjige.component.html',
  styleUrls: ['./sve-knjige.component.css']
})
export class SveKnjigeComponent implements OnInit {


  //ovo je za admina!!! ovo sam nasla u carticlesupdate.component 

  constructor(private knjigaService:KnjigaService,
    private router: Router,
    private userService:UserService
    
  ) { }
  
  ngOnInit(): void {
    this.userService.dohvatiKorisnika(sessionStorage.getItem('admin')).subscribe((userFromDB:User)=>{
      this.korisnik = userFromDB;
    })

    this.knjigaService.dohvatiSveKnjige().subscribe((data:Knjiga[])=>{
      this.sveKnjige=data;
      this.broj=data.length;


    })
  }

  sveKnjige:Knjiga[]
  broj:number
  id:number
  korisnik:User=new User()
  naziv:string


  idzabrisanje:number;


  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }


  detalji(id) {
    localStorage.setItem("knjiga", JSON.stringify(id));
    this.router.navigate(['/adminazurirajknjigu'])
    
  }

  

}
