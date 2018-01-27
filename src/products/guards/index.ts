//  why a route guard as opposed to resolver . no need for resolve cause we have store and guards can control navigation

import { PizzasGuard } from './pizza.guard';
import { PizzaExistsGuards } from './pizza-exists.guard';

export const guards: any[] = [PizzasGuard, PizzaExistsGuards];

export * from './pizza.guard';
export * from './pizza-exists.guard';
