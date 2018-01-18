import * as fromToppings from "../actions/toppings.action";
import { Topping } from "../../models/topping.model";

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromToppings.ToppingActions
): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      // TODO refactor the  mapping from array to entities into util class so we keep it DRY
      //console.log(action.payload);
      // reduce takes each element in the array and does the following function to it
      const entities = toppings.reduce(
        (entities: { [id: number]: Topping }, topping: Topping) => {
          // this is the 2nd value for reduce method like a for each it is the current value of the iteration
          return {
            ...entities, // take what we have already
            // this sets something like this id: 1 , Pizza Object/ and put this in it
            [topping.id]: topping
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }

  return state;
}

export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingEntities = (state: ToppingsState) => state.entities;
