import { Component, OnInit } from '@angular/core';
import {G} from "../../G.module";


@Component({
    selector: '[permission-component]',
    templateUrl:"./permission.component.html"
})
export class PermissionComponent implements OnInit {
    dtOptions: DataTables.Settings = {};



    constructor(){

    }

    ngOnInit(){
        this.dtOptions = G.DATABALES.creatNomalTable({
            data:[{
                "id": 1,
                "name": "管理员"
                },
                {
                    "id": 2,
                    "name": "运营人员"
                }],
            columns: [{
                title: '角色ID',
                data: 'id'
            }, {
                title: '角色名称',
                data: 'name'
            }, {
                title: '操作',
                data: 'id',
                render:function(data, type, row){
                    return "<a href='#/users-permission-edit' class='operation'>设置权限</a>"
                }
            }],
            // scrollX:false,
            rowCallback:function (row, data, index) {
                $('.operation', row).off('click');
                $('.operation', row).on('click', () => {
                    console.log("operation")
                });
                return row;
            }
        })
    }

}