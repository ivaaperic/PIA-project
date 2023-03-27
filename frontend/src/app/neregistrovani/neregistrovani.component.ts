import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-neregistrovani',
  templateUrl: './neregistrovani.component.html',
  styleUrls: ['./neregistrovani.component.css']
})
export class NeregistrovaniComponent implements OnInit {

  constructor(
    private knjigaService:KnjigaService,private router: Router
  ) { }

  sveKnjige:Knjiga[]=[]

  



  ngOnInit(): void {
    this.knjigaService.dohvatiSveKnjige().subscribe((kor: Knjiga[]) => {
      this.sveKnjige = kor;
      this.sveKnjige.sort((a,b)=>b.brojUzimanja -a.brojUzimanja)
      
      this.top3(this.sveKnjige);
    })
    this.filtrirane = []
  }

  filtrirane: Knjiga[] = []
  pretrazi() {
    this.knjigaService.filtriraj(this.naziv, this.autori).subscribe((d: Knjiga[]) => {
      this.filtrirane = d
      
    })

  }

  naziv:string="";
  autori:string="";


  knjiga1:Knjiga;
  knjiga2:Knjiga;
  knjiga3:Knjiga;


  top3(sveKnjige){
    this.knjiga1=sveKnjige[0];
    this.knjiga2=sveKnjige[1];
    this.knjiga3=sveKnjige[2];
  }

}


