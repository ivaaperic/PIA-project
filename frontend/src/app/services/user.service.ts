import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  uri = 'http://localhost:4000';

  prijava(username,password){
    const podaci={
      username:username,
      password:password
    }
    return this.http.post(`${this.uri}/user/prijava`, podaci);
  }

  dohvatiKorisnika(username){
    const podaci={
      username: username
    }

    return this.http.post(`${this.uri}/user/dohvatiKorisnika`, podaci);
  }
  dohvatiMejl(email){
    const podaci={
      email: email
    }

    return this.http.post(`${this.uri}/user/dohvatiMejl`, podaci);
  }

  updateStatus(status, username) {
    const data = {
      status: status,
      username: username
    }
    return this.http.post("http://localhost:4000/user/updatestatus", data);
  }

  deleteBook(username,id) {
    const data = {
      username: username,
      id: id
    }
    return this.http.post("http://localhost:4000/user/delete", data);
  }

  getWithStatus(status) {
    const data = {
      status: status
    }
    return this.http.post("http://localhost:4000/user/getstatus", data);
  }
  
  registrujSe(slikaUrl,username, password, ime, prezime, ulicaBrojGrad, telefon, email,tip, status){
    //let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={
      username: username,
      password: password,
      ime:ime,
      prezime:prezime,
      ulicaBrojGrad:ulicaBrojGrad,
      email:email,
      telefon:telefon,
      tip:tip,
      slikaUrl:slikaUrl,
      status: status
      
    
    }

    return this.http.post(`${this.uri}/user/registrujSe`, podaci);
  }
  unesi(username, password,ime,prezime, telefon){
    
    const podaci={
      username: username,
      password: password,
      ime:ime,
      prezime:prezime,
      telefon:telefon
  
    }
    return this.http.post(`${this.uri}/user/unos`, podaci);
  }

  getUsers(){
    return this.http.get(`${this.uri}/user/sviKorisnici`)
  }

  dohvatiBrojDana(){
    return this.http.get("http://localhost:4000/user/dohvatiBrojDana");
  }

  promeniLoz(username, password1) {
    const data = {
      username: username,
      password1: password1
    }
    return this.http.post("http://localhost:4000/user/updatepassword", data);
  }

  updateUsername(usernameStaro, usernameNovo) {
    const data = {
      usernameStaro: usernameStaro,
      usernameNovo: usernameNovo
    }
    return this.http.post("http://localhost:4000/user/updateusername", data);
  }

  updateEmail(emailStari, emailNovi) {
    const data = {
      emailStari: emailStari,
      emailNovi: emailNovi
    }
    return this.http.post("http://localhost:4000/user/updateemail", data);
  }

  updateInfo(username, ime, prezime, telefon) {
    const data = {
      username: username,
      ime1: ime,
      prezime1: prezime,
      telefon1: telefon
    }
    return this.http.post("http://localhost:4000/user/updateInfo", data);
  }
  updateType(username, tip) {
    const data = {
      username: username,
      tip:tip
    }
    return this.http.post("http://localhost:4000/user/updateType", data);
  }

  updateAdresu(username, ulicaBrojGrad) {
    const data = {
      username: username,
      ulicaBrojGrad:ulicaBrojGrad
    }
    return this.http.post("http://localhost:4000/user/updateAdresu", data);
  }


  izmeniKorisnika(slikaUrl,username, password, ime, prezime, ulicaBrojGrad, telefon, email){
    let korisnik=JSON.parse(localStorage.getItem('ulogovan'));
    const podaci={
      username: username,
      password: password,
      ime:ime,
      prezime:prezime,
      ulicaBrojGrad:ulicaBrojGrad,
      email:email,
      telefon:telefon,
      tip:korisnik.tip,
      slikaUrl:slikaUrl
      
    
    }
    return this.http.post(`${this.uri}/user/izmeniKorisnika`, podaci);
  }

  prviLog(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.uri}/preduzece/prviLog`, podaci);
  }
  ostaliLog(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.uri}/preduzece/ostaliLog`, podaci);
  }

  prihvati(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.uri}/user/prihvati`, podaci);

  }
  odblokiraj(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.uri}/user/odblokiraj`, podaci);

  }
  blokiraj(username){
    const podaci={
      username:username
    }
    return this.http.post(`${this.uri}/user/blokiraj`, podaci);

  }

  odbij(username){
    const podaci={
      username:username
    }

    return this.http.post(`${this.uri}/user/odbij`, podaci);
  }



  dohvSveKnjige(usernameFromForm) {
    const data = { username: usernameFromForm };
    return this.http.post('http://localhost:4000/user/dohvSveKnjige', data);
  }

  razduzi(id) {
    const data = { id: id};

    return this.http.post('http://localhost:4000/user/razduzi', data);
  }

  filtriraj1(naziv, autor) {
    const data = { naziv: naziv, autor: autor };

    return this.http.post('http://localhost:4000/user/filtriraj', data);
  }
  filtriraj(naziv, autor) {
    const data = { naziv: naziv, autor: autor };

    return this.http.post(`${this.uri}/user/filtriraj`, data);
  }

  zaduzi(id, username, date) {
    const data = { id: id, username: username, date: date };

    return this.http.post('http://localhost:4000/user/zaduzi', data);
  }

  dodajKnjigu(id, title, author) {
    const data = { id: id, title: title, author: author };

    return this.http.post('http://localhost:4000/user/dodajKnjigu', data);
  }

  basSve() {
    const data = { id: null };

    return this.http.post('http://localhost:4000/user/basSve', data);
  }
}
