import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private _router:Router) {
    const token = localStorage.getItem('accesstoken');
    if(token)
    {
      this.tokenSubject.next(token);
    }
   }

  //apiURL = 'https://dummyjson.com/auth/login'
 apiURL = 'http://localhost:3000/user/login'
  private tokenSubject:BehaviorSubject <string | null> = new BehaviorSubject<string|null>(null);

  logIn(email:string,password:string):Observable<any>{
    console.log('login')
return this._http.post<any>(this.apiURL,{'email': email,'password':password}).pipe(
  tap(res => {
    const token = res;
    console.log(token)
    if(token){
      localStorage.setItem('accesstoken',token);
      this.tokenSubject.next(token);
    }
   
  })
)
  }

userAPIURL = 'http://localhost:3000/user';
getUsers():Observable<any>{
  const token = this.tokenSubject.value;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this._http.get(this.userAPIURL,{headers})

}



  logOut():void{
    localStorage.removeItem('accesstoken');
    this.tokenSubject.next(null);
this._router.navigate(['/login'])
  }

getToken():Observable<string|null>{
  return this.tokenSubject.asObservable();
}

isAuthenticated():boolean{
  return this.tokenSubject.value !== null;
}

}
