import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  private osluskivacModeratora = new Subject<boolean>();

    getOsluskivacModeratora() {
        return this.osluskivacModeratora.asObservable();
    }

    moderatorUsao() {
        this.osluskivacModeratora.next(true);
    }

    moderatorIzasao() {
        this.osluskivacModeratora.next(false);
    }
}
