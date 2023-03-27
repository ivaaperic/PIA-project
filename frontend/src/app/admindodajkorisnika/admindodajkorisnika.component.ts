import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admindodajkorisnika',
  templateUrl: './admindodajkorisnika.component.html',
  styleUrls: ['./admindodajkorisnika.component.css']
})
export class AdmindodajkorisnikaComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.slikaOk = false;
    this.porukaStatus = 1;
    this.status = 1;
    this.userService.dohvatiKorisnika(sessionStorage.getItem("admin")).subscribe((user:User)=>{
      this.korisnik=user
    })
  }
  korisnik:User=new User();

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])

    //localStorage.removeItem('ulogovan');
    //this.router.navigate(['']);
  }

  slikaOk:boolean;
  porukaStatus:number;
  status:number;
  username: string;
  password: string;
  passwordAgain: string;
  ime: string;
  prezime: string;
  ulicaBrojGrad: string;
  telefon: string;
  email: string;
  greska: string;
  

  message: string;
  tip: string;

  pswPattern = new RegExp(
    '^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,11}$'
  )
  /*pswPattern = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,12}$'
  );*/
  telefonPattern = new RegExp('^[0]{1}[6]{1}[0-6]{1}[0-9]{7}$');
  emailPattern = new RegExp('^[a-z][a-z0-9]*@[a-z]+\\.[a-z]+$');

  slikaUrl: any;
  msg='';
  form: FormGroup;

  selectFile(event: any) {
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = () => {
      
      this.slikaOk = true;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.slikaUrl = event.target.result;
      }
        
    }
  }

  register(){
    let status="aktivan";
    if(!this.slikaOk || this.ime==null || this.prezime == null || this.username == null || this.password == null ||
      this.passwordAgain == null || this.telefon == null || this.email == null  || this.ulicaBrojGrad == null||this.tip==null) {
      this.porukaStatus = 0;
      this.message = "Sva polja su obavezna.";
    }

    if(this.password!=this.passwordAgain){
      this.porukaStatus = 0;
      this.message = "Lozinka nisu iste";
      alert("lozinke nisu iste!!")
      return;
    }
    if(!this.pswPattern.test(this.password)){
      this.porukaStatus = 0;
      this.message = "Lozinka nije u odgovarajućem formatu.";
      console.log(this.password)

      alert('neispravna lozinka')
      return;
    }
    if(!this.emailPattern.test(this.email)){
      this.porukaStatus = 0;
      this.message = "Neispravan mejl.";

      alert('neispravni mejl')
      return;
    }
    if(!this.telefonPattern.test(this.telefon)){
      this.porukaStatus = 0;
      this.message = "Telefon nije u odgovarajucem formatu.";
      alert('los format telefona')
      return;

    }
    this.userService.dohvatiKorisnika(this.username).subscribe((data:User)=>{
      if(data==null){
        this.userService.dohvatiMejl(this.email).subscribe((data1:User)=>{
          if(data1==null){
            
            this.userService.registrujSe(this.slikaUrl,this.username,this.password,this.ime,this.prezime,this.ulicaBrojGrad,this.telefon,this.email,this.tip, status).subscribe(respObj=>{
              if(respObj['message']=='ok'){
                this.porukaStatus = 2;
                this.message = 'Korisnik je dodat'
                this.router.navigate(['/'])
              }
              else{
                this.porukaStatus = 0;
                this.message = 'Postoji duplikat. Greska!'
              }
            });
          }
          else{
            this.porukaStatus = 0;
            this.message = "Email adresa je već u upotrebi.";
            alert('postoji mejl u sistemu');
            return;
          }
        })
      }else {
        alert('postoji korisnicko ime u sistemu')
        return;
      }
    })
   
  }


}
