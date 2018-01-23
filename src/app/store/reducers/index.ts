import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store/src';

// can have more props then this V if you want but this is what is being used for tutorial. This would be when
// building our own app and we could use a custom serializer
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// the reducers in the state that we are controlling from here
export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

// setting up reducers, we then register these in the products module // are you sure its not the app module?
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

// This sets up a state in the store. Lots of use of generic types in here
export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

// This object will be bound to our state tree
// Anytime you naviagte or change url this function will be called
export class CustomSerialzer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  // you can look into RouterStateSerializer and the Tree it implements for more url options
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState; // same as doing const url = routerState.url this is from ES6. desurturing an import ie
    // import { ActivatedRouteSnapshot,RouterStateSnapshot, Params } from '@angular/router';
    const { queryParams } = routerState.root; // same as doing const queryParam = routerState.root.queryParams
    // let makes this var lets you define vars in block scope and not function scope like var
    let state: ActivatedRouteSnapshot = routerState.root;
    // we are getting the state from angular and binding it to our store. Hijacking and taking a few props to bind to ngrx store
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state; // same as doing const params = state.params
    return { url, queryParams, params };
  }
}
