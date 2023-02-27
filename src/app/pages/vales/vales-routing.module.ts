import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateValeComponent } from './create-vale/create-vale.component';
import { EditValeComponent } from './edit-vale/edit-vale.component';
import { ValesComponent } from './vales.component';
import { ViewValeComponent } from './view-vale/view-vale.component';

const routes: Routes = [{ path: '', component: ValesComponent },
                        {path:'create', component:CreateValeComponent},
                        {path:'view/:id', component:ViewValeComponent},
                        {path:'edit/:id', component:EditValeComponent}
              
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValesRoutingModule { }
