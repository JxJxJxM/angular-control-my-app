import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLaborComponent } from './create-labor/create-labor.component';
import { LaborComponent } from './labor.component';

const routes: Routes = [{ path: '', component: LaborComponent },
                        {path: 'create', component:CreateLaborComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborRoutingModule { }
