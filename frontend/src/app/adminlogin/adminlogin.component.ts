import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.message="nista"
  }

  username: string;
  password: string;
  passwordAgain: string;
  greska: string;

  message: string;
  tip: string;
  slikaUrl: string;
  msg='';

  form: FormGroup

  
  login() {
    if (this.password == null || this.username == null) {
      this.message = "unesite sva polja"
      return;
      
    } else{
      this.userService.prijava(this.username, this.password).subscribe((kor: User) => {
       
        if (kor) {
          localStorage.setItem('ulogovan', JSON.stringify(kor));
          if (kor.tip == 'admin' && kor!=null) {
            sessionStorage.setItem('admin', this.username);
            this.router.navigate(['admin']);
          } else {
            this.message = "nije admin"
            return;
          }
        } else {
          this.greska = 'Greska';
        }
      });

    }
  
  }

}
