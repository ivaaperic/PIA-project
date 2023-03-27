import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminazurirajknjiguComponent } from './adminazurirajknjigu/adminazurirajknjigu.component';
import { AdminazurirajkorisnikaComponent } from './adminazurirajkorisnika/adminazurirajkorisnika.component';
import { AdmindodajknjiguComponent } from './admindodajknjigu/admindodajknjigu.component';
import { AdmindodajkorisnikaComponent } from './admindodajkorisnika/admindodajkorisnika.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminpromenalozinkeComponent } from './adminpromenalozinke/adminpromenalozinke.component';
import { AdminrequestsComponent } from './adminrequests/adminrequests.component';
import { AzurirajComponent } from './azuriraj/azuriraj.component';
import { CitalacComponent } from './citalac/citalac.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { KnjigaDetaljiComponent } from './knjiga-detalji/knjiga-detalji.component';
import { LoginComponent } from './login/login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ProfilComponent } from './profil/profil.component';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { RegisterComponent } from './register/register.component';
import { SveKnjigeComponent } from './sve-knjige/sve-knjige.component';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { ZaduzeneKnjigeComponent } from './zaduzene-knjige/zaduzene-knjige.component';
import { ZahtevimoderatorComponent } from './zahtevimoderator/zahtevimoderator.component';
import { ZahtevnovaknjigaComponent } from './zahtevnovaknjiga/zahtevnovaknjiga.component';

const routes: Routes = [
  {path:"",component:NeregistrovaniComponent},
  {path:"login",component:LoginComponent},
  {path:"citalac",component:CitalacComponent},
  {path:"moderator",component:ModeratorComponent},
  {path:"register",component:RegisterComponent},
  {path:"admin",component:AdminComponent},
  {path:"neregistrovani",component:NeregistrovaniComponent},
  {path:"adminlogin", component:AdminloginComponent},
  {path:"profil", component:ProfilComponent},
  {path:"sve-knjige", component:SveKnjigeComponent},
  {path:"svi-korisnici", component:SviKorisniciComponent},
  {path:"adminrequests", component:AdminrequestsComponent},
  {path:"admindodajkorisnika", component:AdmindodajkorisnikaComponent},
  {path:"admindodajknjigu", component:AdmindodajknjiguComponent},
  {path:"adminazurirajkorisnika", component:AdminazurirajkorisnikaComponent},
  {path:"adminazurirajknjigu", component:AdminazurirajknjiguComponent},
  {path:"promenalozinke", component:PromenalozinkeComponent},
  {path:"adminpromenalozinke", component:AdminpromenalozinkeComponent},
  {path:"knjiga-detalji", component:KnjigaDetaljiComponent},
  {path:"zahtevnovaknjiga", component:ZahtevnovaknjigaComponent},
  {path:"zaduzene-knjige", component:ZaduzeneKnjigeComponent},
  {path:"azuriraj", component:AzurirajComponent},
  {path:"pretraga", component:PretragaComponent},
  {path:"zahtevimoderator", component:ZahtevimoderatorComponent},
  {path:"istorija", component:IstorijaComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
