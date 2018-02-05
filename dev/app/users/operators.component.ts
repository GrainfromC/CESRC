import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: '[operators-component]',
    template: `
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header fn-ms">OperatorsComponent</h1>
                </div>
            </div>
            <div class="row">
           
        </div>
        <form class="form-inline">
  <div class="form-group">
    <div class="input-group">
      <input class="form-control" placeholder="yyyy-mm-dd" name="dp" [(ngModel)]="model" ngbDatepicker #d="ngbDatepicker">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">
          <i class="fa fa-calendar"></i>
        </button>
      </div>
    </div>
  </div>
</form>
            
`
})
export class OperatorsComponent implements OnInit {
    public model:NgbDateStruct;
    constructor(){
    }
    ngOnInit(){

    }

}