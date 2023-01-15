import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TagModel } from "../models/tag.model";



@Injectable()



export class TagsService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    get signedLinkUrl() {return `${this.apiUrl}/getsignedurl`}

    createTag(tag: TagModel): Observable<TagModel> {
        return this.http.post<TagModel>(`${this.apiUrl}/createtag`, {name: tag.name, imageUrl: tag.imageUrl})
    }

    getTags(): Observable<TagModel[]> {
        return this.http.get<TagModel[]>(`${this.apiUrl}/gettags`)
    }

    deleteTag(id: string): Observable<{message: string, ok: Boolean, id: string}> {
        return this.http.delete<{message: string, ok: Boolean}>(`${this.apiUrl}/deletetag/${id}`).pipe(map(res => ({message: res.message, ok: res.ok, id})))
    }

    getTag(id: string): Observable<TagModel> {
        return this.http.get<TagModel>(`${this.apiUrl}/gettag/${id}`)
    }

    updateTag(tag: TagModel): Observable<TagModel> {
        return this.http.put<TagModel>(`${this.apiUrl}/updatetag/${tag.id}`, {
            name: tag.name,
            imageUrl: tag.imageUrl
        })
    }

}