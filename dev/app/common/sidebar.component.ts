import { Component, OnInit} from '@angular/core';
import {Router, Event,  NavigationEnd} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {toggleSidebarService} from "../_services";
import {G} from "../../G.module"

@Component({
    selector: '[sidebar-component]',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuList:any[];
    isHide:boolean;
    isActive:number = -1;
    subIsActive:number = -1;
    current:number = -1;
    constructor(private router: Router, private http: HttpClient, private toggle:toggleSidebarService){
        this.isHide = false;
        toggle.Status$.subscribe(msg => {
            if(msg == "hide"){
                this.isHide = true
            }else{
                this.isHide = false
            }
        });
    }
    toggleFold(item, index){
        this.menuList.forEach(function (item, i) {
            if(i != index){
                item["isFold"] = true;
            }
        });
        item["isFold"] = !item["isFold"];
        this.current = index;

    }
    active(i, j){
        this.isActive = i;
        this.subIsActive = j;
    }
    ngOnInit(){
        let self = this;
        this.http.get(G.serverUrl + "/mock/menu.json").subscribe(data =>{
            this.menuList = data["data"].map(function (item) {
                item["isFold"] = true;
                return item;
            });
        });
        this.router.events.subscribe((event : Event) => {
            if(event instanceof NavigationEnd) {
                let url = this.router.url;
                if(this.menuList && this.menuList["length"] && this.menuList["length"] > 0){
                    outLoop:for(let i = 0; i < this.menuList["length"]; i++){
                        let item = this.menuList[i], subItem = item.childMenus;
                        for(let j = 0; j < subItem.length; j++){
                            if(subItem[j].resUrl == url){
                                self.isActive = i;
                                self.subIsActive = j;
                                item["isFold"] = false;
                                break outLoop;
                            }
                        }
                    }
                }
            }
        });
    }

    
}