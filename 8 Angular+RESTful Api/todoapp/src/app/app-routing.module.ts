import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { todoListComponent } from './todo-list/todo-list.component';
// import {AppComponent}
const routes: Routes = [

  {
    path:'list',
    component:todoListComponent
  },
  // {
  //   path:'',
  //   component:AppComponent
  // },
  {
    path:'create',
    component:CreateComponent
  },
  {
    path:':id',
    component:DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
