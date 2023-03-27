import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { CitalacComponent } from './citalac/citalac.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { ProfilComponent } from './profil/profil.component';
import { SveKnjigeComponent } from './sve-knjige/sve-knjige.component';
import { AdminrequestsComponent } from './adminrequests/adminrequests.component';
import { AdmindodajkorisnikaComponent } from './admindodajkorisnika/admindodajkorisnika.component';
import { AdmindodajknjiguComponent } from './admindodajknjigu/admindodajknjigu.component';
import { AdminazurirajkorisnikaComponent } from './adminazurirajkorisnika/adminazurirajkorisnika.component';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { AdminpromenalozinkeComponent } from './adminpromenalozinke/adminpromenalozinke.component';
import { NgbCarouselModule, NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { KnjigaDetaljiComponent } from './knjiga-detalji/knjiga-detalji.component';
import { ZahtevnovaknjigaComponent } from './zahtevnovaknjiga/zahtevnovaknjiga.component';
import { ZaduzeneKnjigeComponent } from './zaduzene-knjige/zaduzene-knjige.component';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { AzurirajComponent } from './azuriraj/azuriraj.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ZahtevimoderatorComponent } from './zahtevimoderator/zahtevimoderator.component';
import { AdminazurirajknjiguComponent } from './adminazurirajknjigu/adminazurirajknjigu.component';
import { IstorijaComponent } from './istorija/istorija.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AdminloginComponent,
    CitalacComponent,
    ModeratorComponent,
    NeregistrovaniComponent,
    ProfilComponent,
    SveKnjigeComponent,
    AdminrequestsComponent,
    AdmindodajkorisnikaComponent,
    AdmindodajknjiguComponent,
    AdminazurirajkorisnikaComponent,
    PromenalozinkeComponent,
    AdminpromenalozinkeComponent,
    KnjigaDetaljiComponent,
    ZahtevnovaknjigaComponent,
    ZaduzeneKnjigeComponent,
    SviKorisniciComponent,
    AzurirajComponent,
    PretragaComponent,
    ZahtevimoderatorComponent,
    AdminazurirajknjiguComponent,
    IstorijaComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
    FormsModule,
    HttpClientModule,
    NgbCarouselModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
