import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {OperatorsComponent} from './operators.component';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule.forChild([{ path: '', component: OperatorsComponent}])
    ],
    declarations: [OperatorsComponent]
})
export class OperatorsModule { }