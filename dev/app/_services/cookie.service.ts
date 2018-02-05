import { Injectable } from '@angular/core';

@Injectable()
export class CookieService{
    constructor(){}
    setCookie(name, value, expireHours){
        let cookieString = name + "=" + encodeURIComponent(value);

        if(expireHours > 0){
            let date = new Date();
            date.setTime(date.getTime() + expireHours*3600*1000);
            cookieString = cookieString + ";expires=" + date.toUTCString() + ";path=/";
        }
        document.cookie = cookieString;
    }
    getCookie(name){
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return decodeURIComponent(arr[2]);
        }else{
            return null;
        }
    }
    deleteCookie(name){
        let date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=v;expires=" + date.toUTCString();
    }
}