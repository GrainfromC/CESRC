import { Injectable } from '@angular/core';

@Injectable()
export class FormatTimeService{
    constructor(){}
    formatNum(num:number) {
        return num < 10 ? "0" + num : "" + num;
    }
    toFullDate(n){
        if(!n) return "";
        let D = new Date(n),
            date = [
                D.getFullYear(),
                this.formatNum(D.getMonth() + 1),
                this.formatNum(D.getDate())
            ],
            time = D.toTimeString().split(" ")[0];
        return date.join("-") + " " + time;
    }
    toShortDate(n){
        if(!n) return "";
        let D = new Date(n),
            date = [
                D.getFullYear(),
                this.formatNum(D.getMonth() + 1),
                this.formatNum(D.getDate())
            ];
        return date.join("-");
    }
}