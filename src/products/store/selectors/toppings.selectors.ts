import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../app/store";
// we want this cause we are in the  feature module
import * as fromFeature from "../reducers"; // same as getting from reducers/index cause that
//is where we export everythig we need
import * as fromToppings from "../reducers/toppings.reducer";

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

export const getToppingEntites = createSelector(
  getToppingsState,
  fromToppings.getToppingEntities
);
// TODO understtand what map is doing here
export const getAllToppings = createSelector(getToppingEntites, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoading
);
