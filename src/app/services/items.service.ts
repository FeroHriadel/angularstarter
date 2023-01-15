import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ItemModel, ItemModelWithTagsAsObjects } from "../models/item.model";
import { GetItemsRequestModel } from "../models/getItems-request.model";
import { GetItemsResponseModel } from "../models/getItems-response.model";



@Injectable()



export class ItemsService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    get signedLinkUrl() {return `${this.apiUrl}/getsignedurl`}

    createItem(item: ItemModel): Observable<ItemModel> {
        return this.http.post<ItemModel>(`${this.apiUrl}/createitem`, {...item})
    }

    getItems(requestBody?: GetItemsRequestModel): Observable<GetItemsResponseModel> {
        return this.http.post<GetItemsResponseModel>(`${this.apiUrl}/getitems`, requestBody)
    }

    getItem(id: string): Observable<ItemModelWithTagsAsObjects> {
        return this.http.get<ItemModelWithTagsAsObjects>(`${this.apiUrl}/getitem/${id}`)
    }
}