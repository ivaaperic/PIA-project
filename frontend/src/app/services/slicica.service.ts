import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlicicaService {

  constructor(
    private http: HttpClient
  ) { }

  get(sifra) {
    const data = {
      sifra: sifra
    }
    return this.http.post("http://localhost:4000/slicica/get", data);
  }

  put(sifra, url) {
    const data = {
      sifra: sifra,
      url: url
    }
    return this.http.post("http://localhost:4000/slicica/put", data);
  }

}
