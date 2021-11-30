import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';


export interface RouterStateUrl {
   url: string;
   queryParams: Params; //'from query'
   params: Params //'from route'
}

// interface for type checking
export interface State {
   routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

//invokes the methods that contains the 'crud' operations
export const reducers: ActionReducerMap<State> = {
   routerReducer: fromRouter.routerReducer
}

//(selector) give me the router state
export const getRouterState = createFeatureSelector<
   fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');


//class for retrieving a RouterStateUrl
export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl>{
   //this class will be called every time a change in the url occurs
   serialize(routerState: RouterStateSnapshot): RouterStateUrl {
      const { url } = routerState;
      const { queryParams } = routerState.root;

      let state: ActivatedRouteSnapshot = routerState.root;
      while (state.firstChild) {
         state = state.firstChild;
      }
      const { params } = state;

      return { url, queryParams, params };
   }
}