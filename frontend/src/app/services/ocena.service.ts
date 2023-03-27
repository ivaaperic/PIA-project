import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcenaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dodajOcenu(ocena, username, idKnjige) {
    const podaci = {
      ocena: ocena,
      username: username,
      idKnjige: idKnjige
    }

    return this.http.post(`${this.uri}/ocene/dodajOcenu`, podaci)
  }

  dohvatiSveOcene() {
    return this.http.get(`${this.uri}/ocene/dohvatiSveOcene`)
  }

  dohvatiOceneJedneKnjige(idKnjige) {
    const podatak = {
      idKnjige: idKnjige
    }

    return this.http.post(`${this.uri}/ocene/dohvatiOceneJedneKnjige`, podatak)
  }

  obrisiOceneKnjige(idKnjige) {
    const podatak = {
      idKnjige: idKnjige
    }

    return this.http.post(`${this.uri}/ocene/obrisiOceneKnjige`, podatak)
  }

  dohvatiOcenuKorImeId(username, idKnjige) {
    const podaci = {
      username: username,
      idKnjige: idKnjige
    }

    return this.http.post(`${this.uri}/ocene/dohvatiOcenuKorImeId`, podaci)
  }
}
