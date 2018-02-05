import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {G} from "../../G.module";
import {responseInterface} from "../_interface";

@Component({
    selector: '[welcome-component]',
    templateUrl:"./welcome.component.html"
})
export class WelcomeComponent implements OnInit {
    public lineOption: any;
    public pieOption: any;
    public bugs:number;
    public register:number;
    public sum:number;

    constructor(private _http:HttpClient){
    }

    ngOnInit() {
        let lineOption = {
            title : {
                text: '每周漏洞曲线',
                x:'left'
            },
            xAxis: {
                show:false,
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'line',
                smooth: true
            }]
        }, pieOption = {
            title : {
                text: '漏洞等级分布',
                x:'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: 'center',
                top:'bottom',
                data:['低','中','高','严重']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[]
                }
            ]
        };




        this._http.get(G.serverUrl + "/mock/welcome.json").subscribe((res:responseInterface) =>{
            if(res.success){
                let data = res.data, lineValues, lineDates;
                this.bugs = data.bugs;
                this.register = data.register;
                this.sum = data.sum;

                lineDates = data.week.map((item) => item[0]);
                lineValues = data.week.map((item) => item[1]);
                lineOption.xAxis.data = lineDates;
                lineOption.series[0].data = lineValues;
                this.lineOption = lineOption;

                pieOption.series[0].data = data.level;
                this.pieOption = pieOption;

            }
        })

    }
    
}