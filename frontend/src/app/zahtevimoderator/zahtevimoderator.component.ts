import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-zahtevimoderator',
  templateUrl: './zahtevimoderator.component.html',
  styleUrls: ['./zahtevimoderator.component.css']
})
export class ZahtevimoderatorComponent implements OnInit {

  constructor(private userService: UserService,
    private knjigaService:KnjigaService,
    private router: Router) { }

  requests: Knjiga[]=[]
  prihvacene: Knjiga[]=[]
  odbijene: Knjiga[]=[]
  korisnik:User=new User()
  

  ngOnInit(): void {

    this.userService.dohvatiKorisnika(sessionStorage.getItem('user')).subscribe((userFromDB:User)=>{
      this.korisnik = userFromDB;
    })

    this.knjigaService.getWithStatus('ceka').subscribe((list:Knjiga[])=>{
      this.requests = list;
    })

    this.knjigaService.getWithStatus('prihvacena').subscribe((list:Knjiga[])=>{
      this.prihvacene = list;
    })

    this.knjigaService.getWithStatus('odbijena').subscribe((list:Knjiga[])=>{
      this.odbijene = list;
    })

  }

  updateStatus(status, id) {
    this.knjigaService.updateStatus(status, id).subscribe((resp)=>{
      this.ngOnInit();
    })
  }

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])

  }


}
