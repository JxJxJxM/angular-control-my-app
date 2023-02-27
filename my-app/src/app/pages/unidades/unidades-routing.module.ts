import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadesComponent } from './unidades.component';
import { ViewUnidadComponent } from './view-unidad/view-unidad.component';

const routes: Routes = [{ path: '', component: UnidadesComponent },
                        {path:'vales/:code', component:ViewUnidadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesRoutingModule { }
