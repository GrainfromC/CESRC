import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Location} from '@angular/common';
import {responseInterface} from "../_interface/response.interface";
import {G} from "../../G.module"

@Component({
    selector: '[editPassword-component]',
    templateUrl: './editPassword.component.html'
})
export class EditPasswordComponent implements OnInit {
    editPasswordForm :FormGroup;
    constructor(private _http:HttpClient, private _location:Location){

    }
    ngOnInit(){
        let validatorsArr  = [Validators.required, Validators.pattern("(?!.*[\u4E00-\u9FA5\\s])(?!^[a-zA-Z]+$)(?!^[\\d]+$)(?!^[^a-zA-Z\\d]+$)^.{8,}$")];
        this.editPasswordForm = new FormGroup({
            oldpassword:new FormControl('', validatorsArr),
            newpassword:new FormControl('', validatorsArr),
            renewpassword:new FormControl('', validatorsArr)
        });
    }
    submit(){
        let controls = this.editPasswordForm.controls;
        if(controls.oldpassword.pristine){
            return alert("请输入密码！");
        };
        if(controls.oldpassword.dirty && controls.oldpassword.invalid){
            return alert("密码必须满足至少8位，大小写字母、数字、特殊符号至少2种类型组合！");
        }
        if(controls.newpassword.pristine){
            return alert("请输入密码！");
        }
        if(controls.newpassword.dirty && controls.newpassword.invalid){
            return alert("密码必须满足至少8位，大小写字母、数字、特殊符号至少2种类型组合！");
        }
        if(controls.renewpassword.pristine){
            return alert("请输入密码！");
        }
        if(controls.renewpassword.dirty && controls.renewpassword.invalid){
            return alert("密码必须满足至少8位，大小写字母、数字、特殊符号至少2种类型组合！");
        }
        if(controls.renewpassword.value != controls.newpassword.value){
            return alert("两次输入密码不一致！");
        }
        const body = new HttpParams().set('oldpassword', this.editPasswordForm.value.oldpassword).set('newpassword', this.editPasswordForm.value.newpassword);
        this._http.post(G.serverUrl + "/mock/success.json", body)
            .subscribe((res: responseInterface) =>{
                if(res.success){
                    alert("密码修改成功");
                    this._location.back();
                }else{
                    alert(res.msg)
                }
            })
    }
}