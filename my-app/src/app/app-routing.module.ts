import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { ListComponent } from './pages/list/list.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {path:"", component:ListComponent, canActivate: [AuthGuard]},
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard] },
  { path: 'vales', loadChildren: () => import('./pages/vales/vales.module').then(m => m.ValesModule),canActivate: [AuthGuard] },
  { path: 'unidades', loadChildren: () => import('./pages/unidades/unidades.module').then(m => m.UnidadesModule),canActivate: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
  { path: 'work-orders', loadChildren: () => import('./pages/work-orders/work-orders.module').then(m => m.WorkOrdersModule) },
  { path: 'labor', loadChildren: () => import('./pages/labor/labor.module').then(m => m.LaborModule) },
  {path:"**", component:ErrorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
