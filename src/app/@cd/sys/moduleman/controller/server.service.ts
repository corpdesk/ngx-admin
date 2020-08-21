import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { of as ObservableOf } from 'rxjs/observable/of';

// import { APP_CONFIG, AppConfig } from '../app-config.module';
import { PostData, CdResponse } from '../../../cd.model';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  options;
  resp: Observable<ArrayBuffer>;
  token;
  params: PostData;

  constructor(
    private http: HttpClient
  ) {
    const h = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    this.options = {
      headers: h
    };
  }

  proc(params: PostData) {
    return this.http.post(environment.apiEndpoint, params, this.options);
  }

  setParams(p: PostData) {
    this.params = p;
  }

}
