import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';

export interface ProductsState {
   pizzas: fromPizzas.PizzaState
}

//declared in the products module through the other index file
export const reducers: ActionReducerMap<ProductsState> = {
   pizzas: fromPizzas.reducer
}

// used to say like give me the products
export const getProductsState = createFeatureSelector<ProductsState>('products');

// pizzas state (to like give me the products, then give me the pizzas)
export const getPizzaState = createSelector(
   getProductsState,
   (state: ProductsState) => state.pizzas
);

//then give me the properties 
export const getPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);
export const getAllPizzas = createSelector(
   getPizzasEntities,
   (entities) => {
      return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
   }
)
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);