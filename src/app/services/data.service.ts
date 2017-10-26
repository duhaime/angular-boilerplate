import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiUrl = 'api/data';

  constructor(private http: Http) { }

  getData(): Promise<any> {
    return this.http.get(this.apiUrl)
               .toPromise()
               .then((response) => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}