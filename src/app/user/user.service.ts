import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>("/assets/users.json");
  }
}
