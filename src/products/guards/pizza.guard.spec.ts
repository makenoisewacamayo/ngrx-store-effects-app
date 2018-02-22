import { TestBed } from '@angular/core/testing';

import {StoreModule, Store, combineReducers} from '@ngrx/store';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { PizzaGuard } from './pizza.guard';
import * as fromRoot from '../../app/store';
import * as fromPizzaReducers from '../store/reducers/pizzas.reducer';
import * as fromReducers from '../store/reducers';
import * as fromActions from '../store/actions';
import * as fromStore from '../store'



describe('Pizza guard',() => {
  let store: Store<fromStore.ProductsState>;
  let pizzaGuard: PizzaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers)
        })
      ],
      providers: [PizzaGuard]
    });

    store = TestBed.get(Store);
    pizzaGuard = TestBed.get(PizzaGuard);
  });

  it('Can activate should return false',() => {
    spyOn(pizzaGuard, 'checkStore').and.returnValue(store.pipe(Observable.throw));
    const expected = cold('(a|)', {a: false});
    expect(pizzaGuard.canActivate()).toBeObservable(expected);
  });

  it('Can activate should return true',() => {
    const { initialState } = fromPizzaReducers;
    const previousState = { ...initialState, loaded: true };

    spyOn(pizzaGuard, 'checkStore').and.returnValue(store.pipe(() => of(true)));
    const expected = cold('(a|)', {a: true});
    expect(pizzaGuard.canActivate()).toBeObservable(expected);
  });


});

