import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CategoryModel } from "../models/category.model";




@Injectable()



export class CategoriesService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getCategories(): Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(`${this.apiUrl}/getcategories`)
    }

    getCategory(id: string): Observable<CategoryModel> {
        return this.http.get<CategoryModel>(`${this.apiUrl}/getcategory/${id}`)
    }

    updateCategory(category: CategoryModel): Observable<CategoryModel> {
        return this.http.put<CategoryModel>(`${this.apiUrl}/updatecategory/${category.id}`, {
            name: category.name,
            description: category.description
        })
    }

    deleteCategory(id: string): Observable<{message: string, ok: Boolean, id: string}> {
        return this.http.delete<{message: string, ok: Boolean}>(`${this.apiUrl}/deletecategory/${id}`).pipe(map(res => ({message: res.message, ok: res.ok, id})))
    }

    createCategory(category: CategoryModel): Observable<CategoryModel> {
        return this.http.post<CategoryModel>(`${this.apiUrl}/createcategory`, {name: category.name, description: category.description})
    }
}