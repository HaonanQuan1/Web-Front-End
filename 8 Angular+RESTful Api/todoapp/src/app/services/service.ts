import { Injectable } from '@angular/core';
import { todoList } from '../model/TodoList';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Array<todoList>> {

    const todo$ = this.http.get<todoList[]>('http://localhost:3000/Todo');

    return todo$;
  }
  public post(newtodo:JSON):Observable<Array<todoList>> {

    let todo$ = this.http.post<todoList[]>('http://localhost:3000/Todo',newtodo);
    return todo$;

  }
  public get(id:String):Observable<todoList> {
    let todo$ = this.http.get<todoList>('http://localhost:3000/Todo/'+id);
    return todo$;
  }
  public update(id:String,updateinfo:any){
    let todo$ = this.http.put<todoList[]>('http://localhost:3000/Todo/'+id,updateinfo);
    return todo$;
  }
  public delete(id:String){
    let todo$ = this.http.delete<todoList[]>('http://localhost:3000/Todo/'+id);
    return todo$;
  }
}
