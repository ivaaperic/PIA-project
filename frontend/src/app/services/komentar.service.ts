import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KomentarService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dohvatiKomentare(idKnjige) {
    const podatak = {
      idKnjige: idKnjige
    }

    return this.http.post(`${this.uri}/komentari/dohvatiKomentare`, podatak)
  }


  dodajKomentar(idKnjige, tekst, username, datum) {
    const podaci = {
      idKnjige: idKnjige,
      tekst: tekst,
      username: username,
      datum: datum
    }

    return this.http.post(`${this.uri}/komentari/dodajKomentar`, podaci)
  }

  dohvatiKomentarKorImeId(username, idKnjige) {
    const podaci = {
      username: username,
      idKnjige: idKnjige
    }

    return this.http.post(`${this.uri}/komentari/dohvatiKomentarKorImeId`, podaci)
  }
  

  izmeniKomentar(username, idKnjige, tekst, datumAzuriranja) {
    const podaci = {
      username: username,
      idKnjige: idKnjige,
      tekst: tekst,
      azurirano: true,
      datumAzuriranja: datumAzuriranja
    }

    return this.http.post(`${this.uri}/komentari/izmeniKomentar`, podaci)
  }
}
