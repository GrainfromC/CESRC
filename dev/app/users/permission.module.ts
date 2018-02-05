import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import {PermissionComponent} from './permission.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: PermissionComponent}]),
        DataTablesModule.forRoot()
    ],
    declarations: [ PermissionComponent ]
})
export class PermissionModule { }