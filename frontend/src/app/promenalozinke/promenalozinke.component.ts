import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-promenalozinke',
  templateUrl: './promenalozinke.component.html',
  styleUrls: ['./promenalozinke.component.css']
})
export class PromenalozinkeComponent implements OnInit {
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.dohvatiKorisnika(sessionStorage.getItem("user")).subscribe((resp: User)=>{
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

  //   if(this.password1!=this.password2){
  //     this.message = "Lozinka nisu iste";
      
  //     alert("lozinke nisu iste!!")
      
  //     return;
  //   }
  //   if(!this.pswPattern.test(this.password1)){
  //     this.message = "Lozinka 1 nije u odgovarajućem formatu.";
  //     console.log(this.password1)
  //     let pom=this.password1

  //     //alert('neispravna lozinka 1')
  //     alert(pom)
  //     return;
  //   }
  //   if(!this.pswPattern.test(this.password2)){
  //     this.message = "Lozinka 2 nije u odgovarajućem formatu.";

  //     alert('neispravna lozinka 2')
  //     return;
  //   }
    
  //   this.userService.promeniLoz(this.stara,this.password1).subscribe(resp=>{
  //     alert(resp['message'])
  //   });
  //   localStorage.getItem('ulogovan');
  //   this.router.navigate(['']);

    
  // }

}
