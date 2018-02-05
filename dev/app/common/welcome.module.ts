import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {NgxEchartsModule} from 'ngx-echarts';
import {WelcomeComponent} from './welcome.component'

const routes: Routes = [
    { path: '', component: WelcomeComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxEchartsModule
    ],
    declarations: [WelcomeComponent]
})
export class WelcomeModule { }