import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Price, Stock } from "src/app/entity/stock";
import { HttpServices } from "../HttpUtil/httpservice";


@Injectable()
export class StockServices{

    private headerArgs?: {key: string, value: string};
    private token = "sandbox_c9k210aad3i978qirhqg";

    constructor(private http: HttpServices){}
    
    getStock(url : string):Observable<Stock[]>{
        this.headerArgs= {key:'X-Finnhub-Token',value:''}
        return this.http.get<Stock[]>(url,this.headerArgs);
    }
    

    getPrice(url : string):Observable<Price>{
        this.headerArgs= {key:'X-Finnhub-Token',value:''}
        return this.http.get<Price>(url,this.headerArgs);
    }
}