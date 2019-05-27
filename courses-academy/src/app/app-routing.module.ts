import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes : Routes = [
    { path: 'users', loadChildren: './Modules/user-module/user.module#UserModule' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }