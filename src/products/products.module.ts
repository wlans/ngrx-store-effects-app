import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components are dumb
// components
import * as fromComponents from './components';

// containers are smart
// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

// guards
import * as fromGuards from './guards';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.PizzasGuard],
    component: fromContainers.ProductsComponent
  },
  {
    path: 'new',
    canActivate: [fromGuards.PizzasGuard],
    component: fromContainers.ProductItemComponent
  },
  {
    path: ':pizzaId', // does the : mean param ? TODO
    component: fromContainers.ProductItemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers), // this slice of state is for these reducers
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards], // spreading guards into another array which has our services
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
