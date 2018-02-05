import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { AuthGuard } from './_routGuards';
import {AuthRequestOptions} from "./_httpIntercept"



import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer.component';
import { HeaderComponent } from './common/header.component';
import { SidebarComponent } from './common/sidebar.component';

import {CookieService, toggleSidebarService, FormatTimeService} from "./_services";


const routes: Routes = [
    { path: 'index.html', redirectTo: 'welcome', pathMatch: 'full' , canActivate: [AuthGuard]},
    { path: '', redirectTo: 'welcome', pathMatch: 'full' , canActivate: [AuthGuard]},
    { path: 'editPassword', loadChildren: './common/editPassword.module#EditPasswordModule', canActivate: [AuthGuard] },
    { path: 'welcome', loadChildren: './common/welcome.module#WelcomeModule', canActivate: [AuthGuard] },
    { path: 'users-permission', loadChildren: './users/permission.module#PermissionModule', canActivate: [AuthGuard] },
    { path: 'users-permission-edit', loadChildren: './users/permission-edit.module#PermissionEditModule', canActivate: [AuthGuard] },
    { path: 'users-operators', loadChildren: './users/operators.module#OperatorsModule', canActivate: [AuthGuard] },
    { path: 'users-normalUsers', loadChildren: './users/normalUsers.module#NormalUsersModule', canActivate: [AuthGuard] },
];


@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(routes, { useHash: true }),
        DataTablesModule.forRoot()
    ],
    providers: [
        CookieService,
        toggleSidebarService,
        FormatTimeService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthRequestOptions,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }