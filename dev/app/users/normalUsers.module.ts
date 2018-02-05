import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import {NormalUsersComponent} from './normalUsers.component';
import {FormatTimeService} from "../_services";

@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild([{path: '', component: NormalUsersComponent}]),
        DataTablesModule.forRoot()
    ],
    declarations: [ NormalUsersComponent]
})
export class NormalUsersModule { }