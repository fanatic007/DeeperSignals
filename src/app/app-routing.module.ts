import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportComponent } from './components/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardService } from './guards/auth-guard.service'
import { AdminGuardService } from './guards/admin-guard.service'

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuardService] },
  { path:'dashboard/:id', component:ReportComponent, canActivate:[AuthGuardService] },
  { path:'admin', component:AdminComponent, canActivate:[AdminGuardService]  },
  { path: 'dashboard/', redirectTo:'dashboard', pathMatch:'full' },
  { path:'', redirectTo:'dashboard', pathMatch:'full' },
  { path:'**', redirectTo:'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
