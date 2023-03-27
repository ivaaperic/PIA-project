import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BrojDana } from '../model/brojDana';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private AdminOsluskivac = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  prijava(username, password){
    const podaci={
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/user/prijava`, podaci);
  }

  izmeniBrojDana(brojDana){
    const podaci={
      brojDana:brojDana
    }
    return this.http.post(`${this.uri}/user/izmeniBrojDana`, podaci);
  }
  izmeniBrojProduzava(produzava){
    const podaci={
      produzava:produzava
    }
    return this.http.post(`${this.uri}/user/izmeniBrojProduzava`, podaci);
  }

  obrisiKorisnika(username) {
    const podatak = {
      username: username
    }

    return this.http.post(`${this.uri}/user/obrisiKorisnika`, podatak)
  }
  obrisiKnjigu(id) {
    const podatak = {
      id: id
    }

    return this.http.post(`${this.uri}/user/obrisiKnjigu`, podatak)
  }

}
