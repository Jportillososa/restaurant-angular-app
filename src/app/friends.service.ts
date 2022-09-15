import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friends } from './friends';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getFriends(): Observable<Friends[]> {
    return this.http.get<Friends[]>(`${this.apiServerUrl}/friends/all`);
    // here we are calling the http client -- returns using a get request
  }

  public addFriends(friends: Friends): Observable<Friends> {
    return this.http.post<Friends>(`${this.apiServerUrl}/friends/add`, friends);
    // here we are making a post request
  }

  public updateFriends(friends: Friends): Observable<Friends> {
    return this.http.put<Friends>(
      `${this.apiServerUrl}/friends/update`,
      friends
    );
    // here we are making an update request
  }

  public deleteFriends(friendsId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/friends/delete/${friendsId}`
    );
    // here we are making a delete request
  }
}
