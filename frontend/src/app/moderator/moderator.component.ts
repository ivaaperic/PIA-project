import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private knjigaService:KnjigaService) { }
  //isto ce biti storage user

  korisnik: User=new User()

  ngOnInit(): void {



    this.filtrirane = []
    this.userService.dohvatiKorisnika(sessionStorage.getItem("user")).subscribe((resp:User)=>{
      this.korisnik = resp;
    })

    this.userService.dohvSveKnjige(this.korisnik.username).subscribe((kor: Knjiga[]) => {
      this.sveKnjige = kor;
      
      this.kDana(this.sveKnjige);
    })
  }

  message: string = ""
  knjigaDana:Knjiga=new Knjiga();

  kDana(sveKnjige){
    this.knjigaDana=sveKnjige[Math.floor(Math.random()*sveKnjige.length)]
    this.oceneDana=this.knjigaDana.ocena;
    let suma = 0;
    for (let i = 0; i < this.knjigaDana.ocena.length; i++) {
      let sabirak = this.oceneDana[i];
      suma += parseInt(sabirak);
    }
    this.prosecnaOcena = suma / this.knjigaDana.ocena.length;
    this.prosecnaOcenaString = this.prosecnaOcena.toFixed(2);
  }

  naziv: string = "";
  autori: string = ""

  ocena:number;
  prosecnaOcena:number
  prosecnaOcenaString:string
  oceniKomentarisiKnjiga: Knjiga;
  oceniKomentarisiBoolean: boolean = false;

  oceneDana:string[]
  ocenaK: number;
  ocenitiBoolean: string;


  sveKnjige: Knjiga[] = [];

  filtrirane: Knjiga[] = []
  pretrazi() {
    this.knjigaService.filtriraj(this.naziv, this.autori).subscribe((d: Knjiga[]) => {
      this.filtrirane = d
    })
  }

  izaberi(id){
    localStorage.setItem("knjiga", JSON.stringify(id));
    this.router.navigate(['/knjiga-detalji'])
  }



  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }

  

}
