import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpServices{

    constructor(private http: HttpClient){}

    get<T>(url: string, headersArgs: {key: string, value: string}) : Observable<any> {
        let header = new HttpHeaders().set(
            headersArgs.key, headersArgs.value
          );
        //return this.http.get<any>(url,{headers:header});
        return this.http.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=sandbox_c9k210aad3i978qirhqg');
    }
}