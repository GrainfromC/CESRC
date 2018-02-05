import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class toggleSidebarService {

    private Source = new Subject<any>();
    Status$ = this.Source.asObservable();
    StatusMission(message: any) {
        this.Source.next(message);
    }
}