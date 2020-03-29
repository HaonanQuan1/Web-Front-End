// import { todoList } from '../model/TodoList';
import { ListService } from './../services/service';
import { FormGroup, FormControl,ReactiveFormsModule  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import {ListService}
// import {todoList}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  todo = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    due: new FormControl(''),
    createdDate: new FormControl(formatDate(new Date(Date.now()))),
    modifiedDate: new FormControl(''),
    complete: new FormControl("uncomplete")
  });
  constructor(private listServices:ListService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value

    this.listServices.post(this.todo.value).toPromise().then(todos=>{console.log(todos)});
    window.location.assign('');
  }

}
function formatDate(now){
  let year = now.getYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
