import { Component, OnInit } from '@angular/core';
import { CookieService ,toggleSidebarService} from "../_services";
import { Router } from '@angular/router';
@Component({
    selector: '[header-component]',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    public realname  : string ;
    public open :boolean = false;
    constructor(private router:Router,private toggle:toggleSidebarService, private cookie:CookieService){
        this.realname = cookie.getCookie("username");
    }
    toggleSidebar(e){
        let $body = $("body");
        if($body.hasClass("page-sidebar-closed")){
            $body.removeClass("page-sidebar-closed page-sidebar-closed-hide-logo");
            this.toggle.StatusMission("show");
        }else{
            this.toggle.StatusMission("hide");
            $body.addClass("page-sidebar-closed page-sidebar-closed-hide-logo");
        }
    }
    mouseEnter(){
        this.open = true;
    }
    mouseLeave(){
        this.open = false;
    }
    loginOut():void{
        this.cookie.deleteCookie("username");
        // window.location.href = "/login.html";
        window.location.href =  window.location.origin + window.location.pathname.replace("index","login");
    }
    ngOnInit(){

    }
    
}