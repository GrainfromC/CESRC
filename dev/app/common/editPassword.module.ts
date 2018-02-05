import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {EditPasswordComponent} from './editPassword.component'

const routes: Routes = [
    { path: '', component: EditPasswordComponent },
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [EditPasswordComponent]
})
export class EditPasswordModule { }