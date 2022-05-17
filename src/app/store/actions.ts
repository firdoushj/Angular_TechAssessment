import { createAction, props } from '@ngrx/store';
import { StockEntry } from '../entity/state';
import { Stock } from '../entity/stock';

export const loadStocks = createAction(
    '[Stocks] Load'
);

export const updateStocks = createAction(
    '[Stocks] Update',
    props<{ stocks: StockEntry[] }>(),
);

export const updateStock = createAction(
    '[Stocks] Update one',
    props<{ stock: StockEntry | undefined }>(),
);

export const selectStock = createAction(
    '[Stocks] Select',
    props<{ stock: Stock }>(),
);

export const loadStockPrice = createAction(
    '[Stocks] Load price',
    props<{ symbol: string }>(),
);
