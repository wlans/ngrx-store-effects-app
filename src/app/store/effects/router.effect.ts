import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';
import * as RouterActions from '../actions/router.action';

import { tap, map } from 'rxjs/operators';

// here we are going navigation  stuff so go back and forward

@Injectable() // this is injectable
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
  // TODO what is this doing. whats with the spread
  @Effect({ dispatch: false }) // dispatch is false we don't want a new action
  navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false }) // dispatch is false
  navigateBack$ = this.actions$.ofType(RouterActions.BACK).pipe(
    tap(() => {
      this.location.back;
    })
  );

  @Effect({ dispatch: false }) // dispatch is false
  navigateForward$ = this.actions$.ofType(RouterActions.FORWARD).pipe(
    tap(() => {
      this.location.forward;
    })
  );
}
