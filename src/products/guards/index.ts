//  why a route guard as opposed to resolver . no need for resolve cause we have store and guards can control navigation

import { PizzasGuard } from './pizza.guard';

export const guards: any[] = [PizzasGuard];

export * from './pizza.guard';
