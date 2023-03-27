import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrojDana } from '../model/brojDana';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.dohvBrojeve()

    this.userService.dohvatiKorisnika(sessionStorage.getItem('admin')).subscribe((userFromDB:User)=>{
      this.korisnik = userFromDB;
 
      
    })
    this.statusPorukaIzmena=-1
    this.statusPorukaIzmena2=-1

    
  }
  

  dohvBrojeve(){
    this.userService.dohvatiBrojDana().subscribe((resp:BrojDana[])=>{
      this.brojObjekat=resp[0]
      this.brojZaduzivanje=resp[0].brojDana
      this.brojProduzava=resp[0].produzava
  })

  }
  brojObjekat:BrojDana=new BrojDana()
  statusPorukaIzmena:number
  porukaIzmena:string
  statusPorukaIzmena2:number
  porukaIzmena2:string

  brojZaduzivanje:number;
  brojProduzava:number;

  promeni() {
    if(this.brojZaduzivanje != this.brojObjekat.brojDana) {
      this.adminService.izmeniBrojDana(this.brojZaduzivanje).subscribe((resp)=>{
        this.statusPorukaIzmena = 2;
        
        this.porukaIzmena = "Uspeh! Novi broj dana za zaduzivanje je " + this.brojZaduzivanje;

      })
      
    } else {
      this.statusPorukaIzmena = 1;
      this.porukaIzmena = "Nema izmene.";
    }
  }

  promeniProduzava() {
    if(this.brojProduzava != this.brojObjekat.produzava) {
      this.adminService.izmeniBrojProduzava(this.brojProduzava).subscribe((resp)=>{
        this.statusPorukaIzmena2 = 2;
        
        this.porukaIzmena2 = "Uspeh! Novi broj dana za produzavanje je " + this.brojProduzava;

      }) 
      
    } else {
      this.statusPorukaIzmena2 = 1;
      this.porukaIzmena2 = "Nema izmene.";

    }
  }

  default(){
    this.adminService.izmeniBrojProduzava(14).subscribe((resp)=>{})
    this.adminService.izmeniBrojDana(14).subscribe((resp)=>{})
    this.ngOnInit()


  }

  azuriraj(){
    this.ngOnInit()
  }



  trenutniBrojZaduzivanje(){
    this.userService.dohvatiBrojDana().subscribe((resp:BrojDana)=>{
      this.brojObjekat=resp
      this.brojZaduzivanje=resp.brojDana
    })
  }
  trenutniBrojProduzava(){
    this.userService.dohvatiBrojDana().subscribe((resp:BrojDana)=>{
      this.brojObjekat=resp
      this.brojProduzava=resp.produzava
    })
  }
  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate(['adminlogin'])
  }

  sveKnjige:Knjiga[]=[]

  korisnik:User=new User()

  ime: string;
  prezime: string;
  username: string;
  password: string;
  passwordAgain: string;
  telefon: string;
  email: string;
  ulicaBrojGrad:string;

  

  drzava: string;
  grad: string;
  postanskiBroj: string;
  ulica: string;
  broj: number;
  pib: number;

  



  

}

    
    /*this.knjigaService.dohvatiKnjigu(this.id).subscribe((data:Knjiga)=>{
      if(data==null){
        this.knjigaService.dodajKnjigu(this.slikaKorice,this.id,this.naziv,this.autori,this.zanrovi,this.izdavac,this.godinaIzdavanja,this.jezik).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.porukaStatus = 2;
            this.message = 'Knjiga je dodata'
            this.router.navigate(['/'])
          }
          else{
            this.porukaStatus = 0;
            this.message = 'Postoji duplikat. Greska!'
          }
        });
      } else {
        alert('postoji knjiga sa tim id u sistemu')
        return;
      }
    })*/

