import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminrequests',
  templateUrl: './adminrequests.component.html',
  styleUrls: ['./adminrequests.component.css']
})
export class AdminrequestsComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  requests: User[];
  deactivated: User[];
  active: User[];
  korisnik:User
  

  ngOnInit(): void {

    this.userService.dohvatiKorisnika(sessionStorage.getItem('admin')).subscribe((userFromDB:User)=>{
      this.korisnik = userFromDB;
    })

    this.userService.getWithStatus('ceka').subscribe((list:User[])=>{
      this.requests = list;
    })

    this.userService.getWithStatus('neaktivan').subscribe((list:User[])=>{
      this.deactivated = list;
    })

    this.userService.getWithStatus('aktivan').subscribe((list:User[])=>{
      this.active = list;
      /*this.userService.getWithStatus(2).subscribe((list2:User[])=>{
        this.active = this.active.concat(list2);
      })*/
    })
  }

  updateStatus(status, username) {
    this.userService.updateStatus(status, username).subscribe((resp)=>{
      this.ngOnInit();
    })
  }

  logout() {
    sessionStorage.clear();
    //localStorage.clear()
    this.router.navigate([''])

  }
}
