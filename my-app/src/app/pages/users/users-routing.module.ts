import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users.component';

const routes: Routes = [{ path: '', component: UsersComponent },
                        {path:'login', component: LoginComponent},
                        {path:'edit/:id', component:EditComponent},
                        {path:'create', component:CreateComponent}        
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
