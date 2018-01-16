import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import { get } from 'https';
import { PizzasService } from 'src/products/services';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}
// Actions ReducerMap.... this is where give the reducer and type them
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
}; // Selectors ask for diffrent data at different levels IE:

//  selectors allow you to seperate state with componet trees
// get compose state and pass when you want to certain component

// Products
//   Pizzas
//     Data
//     loading
//     loaded

// this gets set up in products module
export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);
