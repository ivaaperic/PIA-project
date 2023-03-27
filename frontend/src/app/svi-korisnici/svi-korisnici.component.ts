import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-svi-korisnici',
  templateUrl: './svi-korisnici.component.html',
  styleUrls: ['./svi-korisnici.component.css']
})
export class SviKorisniciComponent implements OnInit {

  constructor(
    private router: Router,
    private userService:UserService
    
  ) { }

  sviKorisnici:User[]=[]
  broj:number
  korisnik:User=new User()
  privilegijaKorisnik:User=new User()

  username:string=''
  statusPoruka:number
  

  promeniPrivilegiju(username){
    this.userService.dohvatiKorisnika(username).subscribe((resp: User)=>{
      this.privilegijaKorisnik=resp
      if(this.privilegijaKorisnik.tip=="citalac"){
        this.userService.updateType(username, "moderator").subscribe((resp)=>{
          if(resp["message"]=="ok") {
            this.statusPoruka= 1;

          }
          this.ngOnInit()
        })
      }
      else if(this.privilegijaKorisnik.tip=="moderator"){
        this.userService.updateType(username, "citalac").subscribe((resp)=>{
          if(resp["message"]=="ok") {
            this.statusPoruka= 1;
          }
          this.ngOnInit()
        })
      } else{
        alert("ne mozete promeniti tip admina.")
      }
    })
  }


  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }



  azuriraj(username) {
    localStorage.setItem('user', username);
    sessionStorage.setItem('admin', this.korisnik.username);
    this.router.navigate(['/adminazurirajkorisnika'])
    console.log(username)
  }



  ngOnInit(): void {
    this.userService.dohvatiKorisnika(sessionStorage.getItem("admin")).subscribe((resp: User)=>{
      this.korisnik = resp;
    })

    this.userService.getUsers().subscribe((data:User[])=>{
      this.sviKorisnici=data;
      this.broj=data.length;

    })

    this.statusPoruka = 0;


    
  }




  deleteItem() {
    //ovde ide uslov da korisnik nema zaduzene knjige!!
    //this.username.delete(this.username).subscribe((resp)=>{
      //ovde bi islo brisanje svih knjiga koje su zaduzene kod korisnika ali to ne sme!!!
        /*this.knjigaService.getAll(this.user.username).subscribe((resp: Knjiga[])=>{
          this.sveKnjige = resp
        })*/
    //});

    //i ovde idu uslovi za brisanje knjige ako je korisnik zaduzio vec
    //this.userService.deleteBook(this.user.username, this.id).subscribe((resp)=>{

    //});
  }

}
