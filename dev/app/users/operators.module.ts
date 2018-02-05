import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OperatorsComponent} from './operators.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: OperatorsComponent}])
    ],
    declarations: [OperatorsComponent]
})
export class OperatorsModule { }