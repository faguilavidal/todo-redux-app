import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { borrar, editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: any;
  @ViewChild('inputFisico') txtInputFisico: any;

  chkCompletado: FormControl = new FormControl;
  txtInput: FormControl = new FormControl;
  editando: boolean = false;

  constructor(private store: Store<AppState>) {
    this.todo = Todo;
    this.txtInputFisico = ElementRef;
   }

  ngOnInit(): void {

    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(toggle({id: this.todo.id}))
    });
  }

  editar() {
    this.editando = true;

    setTimeout(() => {
      this.txtInputFisico.nativeElement.focus();
    }, 1);

  }

  terminarEdicion(){
    this.editando = false;

    if (this.txtInput.invalid) {return;}
    if (this.txtInput.value === this.todo.texto) {return;}

    this.store.dispatch(editar({
      id: this.todo.id,
      texto: this.txtInput.value
    }));
  }

  borrar() {
    this.store.dispatch(borrar({id: this.todo.id}))
  }
}
