import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http"
import {G} from "../../G.module";
import {responseInterface} from "../_interface";
import {Location} from '@angular/common';


@Component({
    selector: '[permission-edit-component]',
    templateUrl:"./permission-edit.component.html"
})
export class PermissionEditComponent implements OnInit {
    public list:any[];
    constructor(private _http:HttpClient, private _location:Location){
    }

    ngOnInit(){
        this._http.get(G.serverUrl + "/mock/permission.json").subscribe((res:responseInterface) => {
            if(res.success){
                let data = res.data;
                this.list = data.map(function (item) {
                    item["isFold"] = true;
                    return item;
                });
                console.log(data);
            }
        });


    }
    toggle(item){
        item["isFold"] = !item["isFold"];
    }
    toggleSelect(item, e){
        let target = e.target;
        console.log(target.checked);

        item["subList"].forEach(subItem => {
            if(target.checked){
                subItem.value = 1;
            }else{
                subItem.value = 0;
            }
        })
    }
    submit(){
        // let httpParams = new HttpParams();
        // Object.keys(this.list).forEach(function (key) {
        //     httpParams = httpParams.append(key, data[key]);
        // });
        this._http.post(G.serverUrl + "/mock/success.json",{}).subscribe((res:responseInterface) =>{
            if(res.success){
                alert("提交成功");
                this._location.back();
            }else{
                alert(res.msg)
            }
        })
    }

}