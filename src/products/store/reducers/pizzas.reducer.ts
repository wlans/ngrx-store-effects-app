import { Pizza } from '../../models/pizza.model';
import * as fromPizzas from '../actions/pizzas.action';

//http://extension.remotedev.io/
export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasActions
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      //console.log(action.payload);
      const pizzas = action.payload;
      // reduce takes each element in the array and does the following function to it
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          // this is the 2nd value for reduce method like a for each it is the current value of the iteration
          return {
            ...entities, // take what we have already
            // this sets something like this id: 1 , Pizza Object/ and put this in it
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    // / TODO how does this update a pizza?
    case fromPizzas.UPDATE_PIZZA_SUCCESS: // this will fall throught to the next case
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      // not sure why we can't just merge this right into the state and have to merge the entities
      const entities = {
        ...state.entities,
        entities: { [pizza.id]: pizza } // TODO comment this out and do the below TODO
      };

      return { ...state, entities };
      // return { ...state, entities: { [pizza.id]: pizza } }; would this work? TODO try this out
    }

    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const { [pizza.id]: removed, ...entitiesMinusRemoved } = state.entities;
      const entities = entitiesMinusRemoved;
      console.log(removed);
      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

export const getPizzaLoading = (state: PizzaState) => state.loading;
export const getPizzaLoaded = (state: PizzaState) => state.loaded;
export const getPizzasEntities = (state: PizzaState) => state.entities;
