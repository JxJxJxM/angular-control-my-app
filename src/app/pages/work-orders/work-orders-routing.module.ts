import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkOrderComponent } from './create-work-order/create-work-order.component';
import { WorkOrdersComponent } from './work-orders.component';

const routes: Routes = [{ path: '', component: WorkOrdersComponent }, 
                        {path: 'create', component:CreateWorkOrderComponent},              
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrdersRoutingModule { }
