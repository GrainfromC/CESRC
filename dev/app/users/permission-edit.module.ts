import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import {PermissionEditComponent} from './permission-edit.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: PermissionEditComponent}]),
        DataTablesModule.forRoot()
    ],
    declarations: [ PermissionEditComponent ]
})
export class PermissionEditModule { }