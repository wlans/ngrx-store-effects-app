import { Pizza } from './../../models/pizza.model';
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers'; // same as getting from reducers/index cause that
//is where we export everythig we need
import * as fromPizzas from '../reducers/pizzas.reducer';

// Pizza State

export const getPizzasState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(
  getPizzasState,
  fromPizzas.getPizzasEntities
);

export const getSelectedPizza = createSelector(
  getPizzasEntities, // feature state
  fromRoot.getRouterState, // root state
  (entities, router): Pizza => {
    // returns us a pizza item
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getAllPizzas = createSelector(getPizzasEntities, entities => {
  // this depends on how your database is set up you could have a hash insead of an id as an int
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(
  getPizzasState,
  fromPizzas.getPizzaLoaded
);

export const getPizzasLoading = createSelector(
  getPizzasState,
  fromPizzas.getPizzaLoading
);
