//  why a route guard as opposed to resolver . no need for resolve cause we have store and guards can control navigation

import { PizzasGuard } from './pizza.guard';
import { ToppingsGuard } from './toppings.guard';
import { PizzaExistsGuards } from './pizza-exists.guard';

export const guards: any[] = [PizzasGuard, PizzaExistsGuards, ToppingsGuard];

export * from './pizza.guard';
export * from './toppings.guard';
export * from './pizza-exists.guard';
