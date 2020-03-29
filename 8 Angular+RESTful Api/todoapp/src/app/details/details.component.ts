import { ListService } from './../services/service';
import { todoList } from '../model/TodoList';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  url:String;
  todos:todoList={
    title:"",
    due:"",
    description:"",
    modifiedDate:new Date(),
    createdDate:new Date(),
    id:"",
    complete:"",
    _id:""

  };

  constructor(private listServices:ListService ,private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.url.subscribe(url=>{this.url=url[0].toString()});
    this.listServices.get(this.url).toPromise().then(todos=>{this.todos=todos;console.log(todos)});
  }
  update(){
    this.todos.title = document.getElementById("title").textContent;
    this.todos.due = document.getElementById("due").textContent;
    this.todos.description = document.getElementById("description").textContent;
    // this.todos.createdDate = document.getElementById("createdate").textContent;
    // this.todos.complete = document.getElementById("complete").textContent;
    // this.todos .modifiedDate=Date.now().toString();
    this.todos.modifiedDate=new Date(Date.now());
    console.log(this.todos.modifiedDate);
    this.todos.complete=document.getElementById("complete").textContent;
    this.listServices.update(this.url,this.todos).toPromise().then(re=>console.log(re));
    this.listServices.get(this.url).toPromise().then(todos=>{this.todos=todos;console.log(todos)});
    alert('Already Save in Mongodb');

  }
  delete(){
    var deleteUser = confirm('Are you sure you want to delete?');
    if (deleteUser) {
      alert('Going to delete the user');
      this.listServices.delete(this.url).toPromise().then(()=>alert("successfully delete"))
    }
    window.location.assign('');
  }

}
