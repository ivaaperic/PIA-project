import { Component, OnInit } from '@angular/core';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-adminreports',
  templateUrl: './adminreports.component.html',
  styleUrls: ['./adminreports.component.css']
})
export class AdminreportsComponent implements OnInit {

  constructor(
   /* private knjigaService: KnjigaService,
    private reportService: ReportService*/
  ) { }

  ngOnInit(): void {
    /*this.reportsNew = [];
    this.reportsNew2 = [];
    this.reportService.getAll().subscribe((resp:Report[])=>{
      this.reports = resp;
      this.reportsInit = resp;
    })*/
  }

/*
  naziv: string;
  pib: number;
  danOd: number;
  mesecOd: number;
  godinaOd: number;
  danDo: number;
  mesecDo: number;
  godinaDo: number;

  reports: Report[];
  reportsInit: Report[];
  reportsNew: Report[];
  reportsNew2: Report[];

  pretraga() {
    this.reports = this.reportsInit;
    this.reportsNew = [];
    this.reportsNew2 = [];
    if(this.danOd == null || this.danDo == null || this.mesecOd == null || this.mesecDo == null ||
      this.godinaOd == null || this.godinaDo == null) {
        alert("Obavezno je uneti datume.");
    } else {
      //po nazivu i pib-u
      for(let i = 0; i < this.reports.length; i++) {
        if((this.naziv != null) && (this.pib != null)) {
          if((this.naziv == this.reports[i].naziv) && (this.pib == this.pib[i].pib)) {
            this.reportsNew.push(this.reports[i]);  
          }
        } else if(this.naziv != null) {
          if(this.naziv == this.reports[i].naziv) {
            this.reportsNew.push(this.reports[i]);  
          }
        } else if(this.pib != null) {
          if(this.pib == this.reports[i].pib) {
            this.reportsNew.push(this.reports[i]);  
          }
        } else if((this.pib == null) && (this.naziv == null)) {
          this.reportsNew = this.reports;
          break;
        }
      }
      //po datumu

      for(let i = 0; i < this.reportsNew.length; i++) {
        if((this.godinaOd > this.godinaDo) ||
        ((this.godinaOd == this.godinaDo) && (this.mesecOd > this.mesecDo)) ||
        (((this.godinaOd == this.godinaDo) && (this.mesecOd == this.mesecDo)) && (this.danOd > this.danDo))) {
          this.reportsNew2 = [];
          break;
        } else if((this.godinaOd < this.reportsNew[i].godina) && (this.godinaDo > this.reportsNew[i].godina)) {
          this.reportsNew2.push(this.reportsNew[i]);
        } else if((this.godinaOd == this.reportsNew[i].godina) && (this.godinaDo == this.reportsNew[i].godina)) {
          if((this.mesecOd == this.reportsNew[i].mesec) && (this.mesecDo == this.reportsNew[i].mesec)) {
            if((this.danOd <= this.reportsNew[i].dan) && (this.danDo >= this.reportsNew[i].dan)) {
              this.reportsNew2.push(this.reportsNew[i]);  
            }
          } else if((this.mesecOd < this.reportsNew[i].mesec) && (this.mesecDo > this.reportsNew[i].mesec)) {
            this.reportsNew2.push(this.reportsNew[i]);
          } else if(this.mesecOd == this.mesecDo) {
            if(this.danOd <= this.reportsNew[i].dan) {
              this.reportsNew2.push(this.reportsNew[i]);
            }
          } else if(this.mesecDo == this.mesecDo) {
            if(this.danDo >= this.reportsNew[i].dan) {
              this.reportsNew2.push(this.reportsNew[i]);
            }
          } 
        } else if(this.godinaOd == this.reportsNew[i].godina) {
          if((this.mesecOd < this.reportsNew[i].mesec) ||
          ((this.mesecOd == this.reportsNew[i].mesec) && (this.danOd <= this.reportsNew[i].dan))) {
            this.reportsNew2.push(this.reportsNew[i]);
          }
        } else if(this.godinaDo == this.reportsNew[i].godina) {
          if((this.mesecDo > this.reportsNew[i].mesec) ||
          ((this.mesecDo == this.reportsNew[i].mesec) && (this.danDo >= this.reportsNew[i].dan))) {
            this.reportsNew2.push(this.reportsNew[i]);
          }
        }
      }

      //azuriranje
      if(this.reportsNew2.length > 0) {
        this.reports = this.reportsNew2;
      } else {
        this.reports = [];
      }

      this.naziv = null;
      this.pib = null;
    }
  }*/

}
