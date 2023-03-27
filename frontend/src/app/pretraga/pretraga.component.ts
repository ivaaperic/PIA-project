import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { Zanr } from '../model/zanr';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private router:Router, private knjigaService:KnjigaService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.filtrirane=[]
    this.zanrovi=[]
    
    this.filtriranePrviKrug= []
    this.filtriraneDrugiKrug = []
    this.godinaDo=null;
    this.godinaOd=null;


    this.message=''

    this.userService.dohvatiKorisnika(sessionStorage.getItem("user")).subscribe((resp:User)=>{
      this.korisnik = resp;
    })
    this.porukaStatus=-1
    
    this.sviZanrovi = this.knjigaService.dohvatiSveZanrove();
  }

  korisnik:User=new User()
  naziv:string=''
  autori:string=''
  izdavac:string=''

  zanrovi:Zanr[];
  sviZanrovi:Zanr[]=[]

  godinaOd:number
  godinaDo:number
  
  porukaStatus:number
  message:string
  

  filtriranePrviKrug: Knjiga[] = []
  filtriraneDrugiKrug: Knjiga[] = []
  filtrirane:Knjiga[]=[]

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }

  pretrazi() {
    this.filtrirane=[]
    this.filtriranePrviKrug= []
    this.filtriraneDrugiKrug = []
    this.knjigaService.filtrirajNapredna(this.naziv, this.autori, this.izdavac).subscribe((d: Knjiga[]) => {
      this.filtriranePrviKrug = d

      if(this.zanrovi.length==0){
        this.filtriraneDrugiKrug=this.filtriranePrviKrug
      } else{
        for (let i = 0; i < this.filtriranePrviKrug.length; i++) {
          for(let j=0; j<this.filtriranePrviKrug[i].zanrovi.length;j++){
            for(let k=0; k<this.zanrovi.length;k++){
              if(this.filtriranePrviKrug[i].zanrovi[j]==this.zanrovi[k]){
                this.filtriraneDrugiKrug.push(this.filtriranePrviKrug[i]);
              }
            }
          }
        }
      }
      

      if (this.godinaDo == null) {
        this.godinaDo = 2022;
      } 
      if (this.godinaOd == null) {
        this.godinaOd = 0;
      }
      if (this.godinaOd > this.godinaDo) {
        this.porukaStatus=0
        this.message = "Nekorektan unos perioda od-do. Gornja granica mora biti veca od donje."
      }


      for (let i = 0; i < this.filtriraneDrugiKrug.length; i++) {
        if (this.filtriraneDrugiKrug[i].godinaIzdavanja >= this.godinaOd && this.filtriraneDrugiKrug[i].godinaIzdavanja <= this.godinaDo) {
          this.filtrirane.push(this.filtriraneDrugiKrug[i])
        }
      }

      
      


    })
  }

  obrisiPretragu(){
    this.filtrirane=[]
    this.naziv=''
    this.autori=''
  

    this.zanrovi=[];

    this.godinaOd=null
    this.godinaDo=null
    this.izdavac=''
    this.ngOnInit()

  }

  prikaziSveKnjige(){
    this.knjigaService.dohvatiSveKnjige().subscribe((d: Knjiga[]) => {
      this.filtrirane = d
    })

  }

  detalji(id) {
    localStorage.setItem("knjiga", JSON.stringify(id));
    this.router.navigate(['/knjiga-detalji'])
    
  }

}
