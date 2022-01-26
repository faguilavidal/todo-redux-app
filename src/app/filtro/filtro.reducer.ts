import { Action, createReducer, on } from '@ngrx/store';
import { filtrosValidos, setFiltro } from './filtro.actions';
 
export const initialState: filtrosValidos = 'todos' as filtrosValidos;

 
const _filtroReducer = createReducer(
  initialState,
  on( setFiltro, (state, { filtro }) => filtro)
);

export function filtroReducer(state: any , action: Action) {
  return _filtroReducer(state, action);
}