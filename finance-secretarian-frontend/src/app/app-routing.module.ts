import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OtherComponent } from './components/other/other.component';
import { AuthGuard } from './helpers-pipes/auth-guard/auth.guard';


const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "other"
	}, {
		path: "login",
        component: LoginComponent,
	}, {
		path: "other",
        component: OtherComponent,
        canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
