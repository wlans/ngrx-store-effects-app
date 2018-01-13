import { Params } from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store/src';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// the reducers in the state that we are controlling from here
export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

// setting up reducers
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

// This sets up a state in the store. Lots of use generic types in here
export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');
