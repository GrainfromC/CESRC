import { Component, OnInit } from '@angular/core';
import {G} from "../../G.module";
import {FormatTimeService} from "../_services"

@Component({
    selector: '[normalUsers-component]',
    templateUrl: "./normalUsers.component.html"
})
export class NormalUsersComponent implements OnInit {
    dtOptions: DataTables.Settings = {

    };

    constructor(public formatTime: FormatTimeService){

    }


    ngOnInit(){
        let self = this;
        // console.log(this.formatTime);

        this.dtOptions = G.DATABALES.creatAjaxTable({
            url:G.serverUrl + "/mock/data.json",
            columns: [
                {
                    title: '用户ID',
                    data: 'id',
                    orderable:false
                },
                {
                    title: '手机',
                    data: 'mobile',
                    orderable:false
                },
                {
                    title: '昵称',
                    data: 'nickname',
                    orderable:false
                },
                {
                    title: '团队',
                    data: 'team',
                    orderable:false
                },
                {
                    title: '邮箱',
                    data: 'email',
                    orderable:false
                },
                {
                    title: '总积分',
                    data: 'points',
                    orderable:false
                },
                {
                    title: '冻结积分',
                    data: 'freezePoints',
                    orderable:false
                },
                {
                    title: '可用积分',
                    data: 'availablePoints',
                    orderable:false
                },
                {
                    title: '注册时间',
                    data: 'registerTime',
                    orderable:false,
                    render:function(data, type, row){
                        return self.formatTime.toFullDate(data);
                    }
                },
                {
                    title: '最后登录时间',
                    data: 'loginTime',
                    orderable:false,
                    render:function(data, type, row){
                        return self.formatTime.toFullDate(data);
                    }
                }
            ],
            rowCallback:function (row, data, index) {
                $('td', row).off('click');
                $('.abc', row).on('click', () => {
                    console.log("abc------------")
                });

                return row;
            }
        })
    }

}