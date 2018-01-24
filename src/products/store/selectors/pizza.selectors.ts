import { Pizza } from '../../models/pizza.model';
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers'; // same as getting from reducers/index cause that
//is where we export everythig we need
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from './toppings.selectors';
import { Topping } from '../../models/topping.model';

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
  fromRoot.getRouterState, // root state. What is the current url...
  (entities, router): Pizza => {
    // returns us a pizza item if router is not null
    return router.state && entities[router.state.params.pizzaId]; // pizzaaId was setup in the routes
  }
);

// you can have as many selectors as you want and then push them into a function
export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingEntites,
  fromToppings.getselectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    // we have 3 piece of state here now
    // returns a Topping array
    const toppings: Topping[] = selectedToppings.map(id => toppingEntities[id]);
    // merges in the selected toppings with the  pizzas toppings via spread command . first time seeing this used outside reducers
    return { ...pizza, toppings };
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
