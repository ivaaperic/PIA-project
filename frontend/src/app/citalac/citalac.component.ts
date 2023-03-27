import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-citalac',
  templateUrl: './citalac.component.html',
  styleUrls: ['./citalac.component.css']
})
export class CitalacComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private knjigaService:KnjigaService) { }

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.date = yyyy + "-" + mm + "-" + dd

    this.filtrirane = []

    this.userService.dohvatiKorisnika(sessionStorage.getItem("user")).subscribe((resp:User)=>{
      this.korisnik = resp;
    })
    // this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));

    //this.userService.prijava(this.korisnik.username, this.korisnik.password).subscribe((kor: User) => {
      //this.korisnik = kor;
      //console.log(this.korisnik.username, this.korisnik.password)

      this.userService.dohvSveKnjige(this.korisnik.username).subscribe((kor: Knjiga[]) => {
        this.sveKnjige = kor;
        
        this.kDana(this.sveKnjige);
      })

    //})
    //this.knjigaDana=this.sveKnjige[Math.floor(Math.random()*this.sveKnjige.length)]

    

    console.log(this.date);
  }

  izaberi(id){
    localStorage.setItem("knjiga", JSON.stringify(id));
    this.router.navigate(['/knjiga-detalji'])
  }


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



  username:string;
  password:string;
  ime:string;
  prezime:string;
  ulicaBrojGrad:string;
  telefon:string;
  email:string;
  date: string;
  ocena:number;
  prosecnaOcena:number
  prosecnaOcenaString:string
  oceniKomentarisiKnjiga: Knjiga;
  oceniKomentarisiBoolean: boolean = false;

  oceneDana:string[]
  ocenaK: number;
  ocenitiBoolean: string;


  sveKnjige: Knjiga[] = [];
  korisnik: User=new User()

  razduzi(id) {
    /*
    this.sveKnjige.forEach(d=>{
    if(d.id==id){
    d.person=null;
    d.deadline=null;
    }
    
    })
    */
    // this.userService.razduzi(id).subscribe(data=>{
    //   this.ngOnInit();
    // })
    


  }
  slikaKorice:any;
  slikaUrl: any; 
	msg = "";
	
	selectFile(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
      
			this.msg = "";
			//this.url = reader.result;
      this.slikaUrl=_event.target.result; 
		}
	}

  updateKor(){


   this.userService.izmeniKorisnika(this.slikaUrl,this.username,this.password,this.ime,this.prezime,this.ulicaBrojGrad,this.telefon, this.email).subscribe();
   this.userService.ostaliLog(this.username).subscribe(res=>{
    this.ngOnInit();
   })
  }



  naziv: string = "";
  autori: string = ""

  filtrirane: Knjiga[] = []
  pretrazi() {
    this.knjigaService.filtriraj(this.naziv, this.autori).subscribe((d: Knjiga[]) => {
      this.filtrirane = d
    })
  }

  message: string = ""


  zaduzi(deadline, id) {
    if (deadline != null) {
      this.message = "knjiga je vec zaduzena"
      return;
    }

    if (this.sveKnjige.length >= 3) {
      this.message = "vec ste zaduzili 3 knjige"
      return;
    }

    var currentTime = new Date();
    currentTime.setDate(currentTime.getDate() + 14);



    var dd = String(currentTime.getDate()).padStart(2, '0');
    var mm = String(currentTime.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentTime.getFullYear();
    var date = yyyy + "-" + mm + "-" + dd


    this.userService.zaduzi(id, this.korisnik.username, date).subscribe(data=>{
      this.ngOnInit();
    })
    // console.log(date)



  }

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])
  }

}
