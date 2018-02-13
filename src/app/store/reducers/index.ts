import { Params, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';


export interface RouteStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouteStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
}

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouteStateUrl>
>('routerReducer');

export class  CustomSerializer implements
  fromRouter.RouterStateSerializer<RouteStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouteStateUrl {
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
