import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZaduzenaKnjiga } from '../model/zaduzenaKnjiga';

@Injectable({
  providedIn: 'root'
})
export class ZaduzenaKnjigaService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  zaduziKnjigu(idKnjige, username, datumUzimanja, slikaKnjige, nazivKnjige, autoriKnjige, brojDana) {
    const podaci = {
      idKnjige: idKnjige,
      username: username,
      datumUzimanja: datumUzimanja,
      slikaKnjige: slikaKnjige,
      nazivKnjige: nazivKnjige,
      autoriKnjige: autoriKnjige,
      brojDana: brojDana
    }

    return this.http.post(`${this.uri}/zaduzene/zaduziKnjigu`, podaci)
  }

  dohvatiSveZaduzeneKnjige() {
    return this.http.get(`${this.uri}/zaduzene/dohvatiSveZaduzeneKnjige`)
  }

  dohvatiMojeZaduzeneKnjige(username) {
    const podatak = {
      username: username
    }

    return this.http.post(`${this.uri}/zaduzene/dohvatiMojeZaduzeneKnjige`, podatak)
  }

  razduziKnjigu(idKnjige, datumUzimanja, datumVracanja) {
    const podaci = {
      idKnjige: idKnjige,
      datumUzimanja: datumUzimanja,
      datumVracanja: datumVracanja
    }

    return this.http.post(`${this.uri}/zaduzene/razduziKnjigu`, podaci)
  }

  sortirajPoDatumuVracanja(mojaIstorijaZaduzenihKnjiga): ZaduzenaKnjiga[] {
    return mojaIstorijaZaduzenihKnjiga.sort((knjiga1, knjiga2) => {
      let datum1 = new Date(knjiga1.datumVracanja);
      let datum2 = new Date(knjiga2.datumVracanja);
      return datum2.getTime() - datum1.getTime()
    })
  }

  sortirajPoDatumuUzimanja(mojaIstorijaZaduzenihKnjiga): ZaduzenaKnjiga[] {
    return mojaIstorijaZaduzenihKnjiga.sort((knjiga1, knjiga2) => {
      let datum1 = new Date(knjiga1.datumUzimanja);
      let datum2 = new Date(knjiga2.datumUzimanja);
      return datum2.getTime() - datum1.getTime()
    })

  }

  sortirajPoNazivuKnjige(mojaIstorijaZaduzenihKnjiga): ZaduzenaKnjiga[] {
    return mojaIstorijaZaduzenihKnjiga.sort((knjiga1, knjiga2) => {
      return knjiga1.nazivKnjige < knjiga2.nazivKnjige ? -1 : 1
    });
  }

  sortirajPoAutoruKnjige(mojaIstorijaZaduzenihKnjiga): ZaduzenaKnjiga[] {
    return mojaIstorijaZaduzenihKnjiga.sort((knjiga1, knjiga2) => {
      return knjiga1.autoriKnjige < knjiga2.autoriKnjige ? -1 : 1
    });
  }

  dohvatiKnjiguPoNazivu(nazivKnjige) {
    const podatak = {
      nazivKnjige: nazivKnjige
    }

    return this.http.post(`${this.uri}/zaduzene/dohvatiKnjiguPoNazivu`, podatak)
  }

  dohvatiKnjiguKorImeId(username, idKnjige) {
    const podaci = {
      username: username,
      idKnjige: idKnjige
    }

    return this.http.post(`${this.uri}/zaduzene/dohvatiKnjiguKorImeId`, podaci)
  }

  dohvatiKnjiguId(idKnjige) {
    const podatak = {
      idKnjige: idKnjige
    }

    return this.http.post(`${this.uri}/zaduzene/dohvatiKnjiguId`, podatak)
  }

  produzi(username, idKnjige, brojDana) {
    const podaci = {
      idKnjige: idKnjige,
      username: username,
      brojDana: brojDana
    }

    return this.http.post(`${this.uri}/zaduzene/produzi`, podaci)
  }
}
