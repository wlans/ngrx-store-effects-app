import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import { get } from 'https';
import { createSelector } from '@ngrx/store/src/selector';
import { getPizzas } from './pizzas.reducer';
import { PizzasService } from 'src/products/services';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

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

// Pizza State

export const getPizzasState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getAllPizzas = createSelector(
  getPizzasState,
  fromPizzas.getPizzas
);

export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzaLoaded
);

export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzaLoading
);
