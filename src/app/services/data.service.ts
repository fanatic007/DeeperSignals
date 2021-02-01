import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loginEndPointURL = environment.loginEndPointURL;
  assessmentsEndPointURL = environment.assessmentsEndPointURL;
  graphEndPointURL = environment.graphEndPointURL;
  usersEndPointURL = environment.usersEndPointURL;

  constructor(private httpclient: HttpClient) { }

  login(credentials):Observable<any>{
    return this.httpclient.post(this.loginEndPointURL,credentials,{ observe:'response' });
  }

  getAssessments():Observable<any>{
    return this.httpclient.get(this.assessmentsEndPointURL,{ observe:'response' });
  }

  getGraph(id):Observable<any>{
    let params = new HttpParams();
    params = params.append('id',id);
    return this.httpclient.get(this.graphEndPointURL ,{ params:params, observe:'response' });
  }

  getUsers():Observable<any>{
    return this.httpclient.get(this.usersEndPointURL ,{ observe:'response' });
  }
}
