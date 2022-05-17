import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { select, Store } from '@ngrx/store';
import { map, startWith, switchMap } from 'rxjs';
import { loadStocks, selectStock } from '../store/actions';
import { selecStockById, selectAllStockEntries, selectSelectedStock } from '../store/selectors';
import { AppState } from '../entity/state';
import { Stock } from '../entity/stock';
import {Observable} from 'rxjs';

@Component({
  selector: 'stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent {
  autocomplete = new FormControl();
  filteredOptions: Observable<Stock[]>;
  objects: Stock[] = [];
  stock: Stock | undefined;
  

  /* removing httoclient to remove unnecessary dependencies */
  constructor(readonly store: Store<AppState>) {
    this.filteredOptions = this.store.pipe(
      select(selectAllStockEntries),
      map(stocks => stocks.map(e => e.stock)));
  }

  ngOnInit(){
    this.autocomplete.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filteredOptions.subscribe( arr => this.objects = arr);

    this.store.pipe(
        select(selectSelectedStock),
        switchMap(s => this.store.select(selecStockById(s.symbol))),
        map(s => s?.stock),
      )
      .subscribe(selected => {
        this.stock = selected;
      });

    this.store.dispatch(loadStocks());
  }

  private _filter(value: string): Stock[] {
    const filterValue = value?.toLowerCase();

    if (!filterValue || filterValue.length < 2) {
      return [];
    }
    
    return this.objects.filter(objects => objects.displaySymbol.toLowerCase().includes(filterValue));
  }

  public callApi() {
    this.store.dispatch(loadStocks());
  }

  public selectSymbol(item: MatAutocompleteSelectedEvent) {
    /* Security: should not leave such console.log method in code*/
    // console.log(item.option.value);
    let found = this.objects.find(element => element.description == item+"");

    if (!found) {
      return;
    }

    this.store.dispatch(selectStock({ stock: found }));
    this.autocomplete.reset();
  }
}
