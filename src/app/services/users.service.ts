import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserModel } from "../models/user.model";
import { Observable } from "rxjs";
import { LoginResponseModel } from "../models/login-response.model";
import { UsersLastEvaluatedKeyModel } from "../models/users-LastEvaluatedKey.model";
import { GetUsersResponseModel } from "../models/getUsers-response.model";



@Injectable()



export class UsersService {

    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    createUser(user: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(`${this.apiUrl}/createuser`, {email: user.email, password: user.password})
    }

    login(user: UserModel): Observable<LoginResponseModel> {
        return this.http.post<LoginResponseModel>(`${this.apiUrl}/login`, {email: user.email, password: user.password})
    }

    getUserById(id: string): Observable<UserModel> {
        return this.http.get<UserModel>(`${this.apiUrl}/getuserbyid/${id}`)
    }

    getUsers(lastEvaluatedKey?: UsersLastEvaluatedKeyModel | null): Observable<GetUsersResponseModel> {
        return this.http.post<GetUsersResponseModel>(`${this.apiUrl}/getusers`, {LastEvaluatedKey: lastEvaluatedKey ? lastEvaluatedKey : null})
    }

    getSearchedUsers(emailSearch: string, lastEvaluatedKey?: {[key: string]: any} | null): Observable<GetUsersResponseModel> {
        return this.http.post<GetUsersResponseModel>(`${this.apiUrl}/searchusersbyemail`, {emailSearch, LastEvaluatedKey: lastEvaluatedKey ? lastEvaluatedKey : null})
    }
}