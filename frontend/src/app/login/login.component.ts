import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    if (this.tip == null || this.password == null || this.username == null) {
      this.message = "unesite sva polja"
      return;
      
    } else{
      this.userService.prijava(this.username, this.password).subscribe((kor: User) => {
       
        if (kor) {
          sessionStorage.clear();
          
          if (kor.tip == 'citalac') {
            sessionStorage.setItem('user', kor.username);
            
            this.router.navigate(['/citalac']);
          } else if (kor.tip == 'moderator') {
            sessionStorage.setItem('user', kor.username);
            this.router.navigate(['/moderator']);
          }
        } else {
          this.greska = 'Greska';
        }
      });

    }
  
  }

  
  



}
