import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers-pipes/auth-guard/auth.guard';
import { MainComponent } from './components/main/main.component';
import { MonthlyStatisticsComponent } from './components/monthly-statistics/monthly-statistics.component';


const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "main"
	}, {
		path: "login",
        component: LoginComponent,
	}, {
		path: "main",
        component: MainComponent,
        canActivate: [AuthGuard]
	}, {
        path: "monthly-statistics/:month",
        component: MonthlyStatisticsComponent,
        canActivate: [AuthGuard]
    }, {
        path: "monthly-statistics",
        pathMatch: "full",
        redirectTo: "monthly-statistics/" + (new Date(Date.now())).getMonth()
    }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
