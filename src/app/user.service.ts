import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from './user/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserDetails = new UserDetails();
  url: string = "http://localhost:8084/api/user/";
  constructor(private httpClient : HttpClient) { }


  signup(user){
    return this.httpClient.post<UserDetails>(this.url + "addUser", user);
  }

  login(user){
    return this.httpClient.post<UserDetails>(this.url + "checkPassword", user);
  }

  findByEmail(userEmailId){
   return this.httpClient.get<UserDetails>(this.url + "findUserByEmail/" + userEmailId);
  }

  setUserDetails(user: UserDetails){
    this.user = user;
  }

  getUserDetails(){
    return this.user;
  }

  emptyUser(){
    this.user = null;
  }

  editUserDetails(user: UserDetails){
    return this.httpClient.put(this.url + "editUserData/" + this.user.userId, user);
  }

  deleteAccount(userId:number){
    return this.httpClient.delete(this.url + "deleteUserById/" + userId);
  }
}
