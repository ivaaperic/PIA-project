import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../model/autor';
import { Zanr } from '../model/zanr';

@Injectable({
  providedIn: 'root'
})
export class KnjigaService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';

  dohvatiSveKnjige(){
  
    return this.http.get(`${this.uri}/book/dohvatiSveKnjige`)
  }
  dohvatiKnjigu(id){
    const podaci={
      id: id
    }

    return this.http.post(`${this.uri}/book/dohvatiKnjigu`, podaci);
  }

  dodajKnjigu( jezik, status, slikaKorice,id, naziv, autori, zanrovi, izdavac, godinaIzdavanja, osoba ){

    const podaci={
      jezik:jezik,
      status:status,
      id: id,
      naziv: naziv,
      autori:autori,
      zanrovi:zanrovi,
      izdavac:izdavac,
      godinaIzdavanja:godinaIzdavanja,
      slikaKorice:slikaKorice,
      osoba:osoba,
      
      
    
    }
    return this.http.post(`${this.uri}/book/dodajKnjigu`, podaci);
  }

  filtriraj(naziv, autor) {
    const data = { naziv: naziv, autor: autor };

    return this.http.post(`${this.uri}/book/filtriraj`, data);
  }
  filtrirajNapredna(naziv, autor, izdavac) {
    const data = { naziv: naziv, autor: autor, izdavac:izdavac };

    return this.http.post(`${this.uri}/book/filtrirajNapredna`, data);
  }



  dohvatiSveZanrove():Zanr[]{
    let sviZanrovi:Zanr[]=[
      
      {
        zanr:"triler"
      },
      {
        zanr:"anime"
      },
      {
        zanr:"drama"
      },
      {
        zanr:"roman"
      },
      {
        zanr:"tinejdz"
      },
      {
        zanr:"ljubavna"
      },
      {
        zanr:"istorijska"
      }

    ]
    return sviZanrovi
  }
  dohvatiSveAutore():Autor[]{
    let sviAutori:Autor[]=[
      {
        autor:"Ivo Andric"
      },
      {
        autor:"Mesa Selimovic"
      },
      {
        autor:"Donato Karizi"
      },
      {
        autor:"Hajime Isayama"
      },
      {
        autor:"Dz. K. Rouling"
      },
      {
        autor:"Dragoslav Mihailovic"
      },
      {
        autor:"Fjord Dostojevski"
      }

    ]
    return sviAutori
  }

  getWithStatus(status) {
    const data = {
      status: status
    }
    return this.http.post("http://localhost:4000/book/getWithStatus", data);
  }
  getWithNaziv(naziv) {
    const data = {
      naziv: naziv
    }
    return this.http.post("http://localhost:4000/book/getWithNaziv", data);
  }

  promeniKolicinu(id,naStanju){
    const podaci={
      id:id,
      naStanju:naStanju
    }
    console.log(naStanju);
    return this.http.post(`${this.uri}/book/updateNaStanju`, podaci);
  }

  smanjiStanje(naziv) {
    const podatak = {
      naziv: naziv
    }

    return this.http.post(`${this.uri}/book/smanjiStanje`, podatak)
  }

  povecajStanje(naziv) {
    const podatak = {
      naziv: naziv
    }

    return this.http.post(`${this.uri}/book/povecajStanje`, podatak)
  }

  sviZanrovi:Zanr[];
  sviAutori:Autor[];

  getAll(id) {
    const data = {
      id: id
    }
    return this.http.post("http://localhost:4000/book/getall", data);
  }

  delete(id) {
    const data = {
      id: id
    }
    return this.http.post("http://localhost:4000/book/delete", data);
  }

  izmeniKnjigu(id, naStanju, slika) {
    const podaci = {
      id: id,
      naStanju: naStanju,
      slika: slika
    }

    return this.http.post(`${this.uri}/book/izmeniKnjigu`, podaci)
  }

  izmeniKnjiguOcena(id, ocena) {
    const podaci = {
      id: id,
      ocena: ocena
    }

    return this.http.post(`${this.uri}/book/izmeniKnjiguOcena`, podaci)
  }

  izmeniNazivKnjige(id, naziv) {
    const podaci = {
      id: id,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/book/izmeniNazivKnjige`, podaci)
  }

  izmeniAutoraKnjige(id, autori) {
    const podaci = {
      id: id,
      autori: autori
    }

    return this.http.post(`${this.uri}/book/izmeniAutoraKnjige`, podaci)
  }

  izmeniZanrKnjige(id, zanrovi) {
    const podaci = {
      id: id,
      zanrovi: zanrovi
    }

    return this.http.post(`${this.uri}/book/izmeniZanrKnjige`, podaci)
  }

  izmeniIzdavacaKnjige(id, izdavac) {
    const podaci = {
      id: id,
      izdavac: izdavac
    }

    return this.http.post(`${this.uri}/book/izmeniIzdavacaKnjige`, podaci)
  }

  izmeniGodinuIzdanjaKnjige(id, godinaIzdavanja) {
    const podaci = {
      id: id,
      godinaIzdavanja: godinaIzdavanja
    }

    return this.http.post(`${this.uri}/book/izmeniGodinuIzdanjaKnjige`, podaci)
  }

  izmeniJezikKnjige(id, jezik) {
    const podaci = {
      id: id,
      jezik: jezik
    }

    return this.http.post(`${this.uri}/book/izmeniJezikKnjige`, podaci)
  }

  izmeniNaStanjuKnjige(id, naStanju) {
    const podaci = {
      id: id,
      naStanju: naStanju
    }

    return this.http.post(`${this.uri}/book/izmeniNaStanjuKnjige`, podaci)
  }

  izmeniSlikuKnjige(id, slikaKorice) {
    const podaci = {
      id: id,
      slikaKorice: slikaKorice
    }

    return this.http.post(`${this.uri}/book/izmeniSlikuKnjige`, podaci)
  }

  updateStatus(status, id) {
    const data = {
      status: status,
      id: id
    }
    return this.http.post("http://localhost:4000/book/updatestatus", data);
  }




}
