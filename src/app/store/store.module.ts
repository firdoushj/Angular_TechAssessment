import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './reducers';
import { StocksEffects } from './effects';

@NgModule({
    imports:[
        StoreModule.forRoot(reducers, {
            metaReducers
           }),
           EffectsModule.forRoot([StocksEffects]),
           StoreDevtoolsModule.instrument(),
    ]
})
export class StoreStateModule{

}