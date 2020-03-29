import { Component, OnInit } from '@angular/core';
import { todoList } from '../model/TodoList';
import {ListService} from '../services/service'
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class todoListComponent implements OnInit {
  todos:Array<todoList>
  constructor(private listServices:ListService) { }

  ngOnInit() {
    this.listServices.list().toPromise().then(todos=>{this.todos=todos;console.log(this.todos)});
  }

}
