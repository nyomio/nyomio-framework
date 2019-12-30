import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {mockOragnizations, mockUsers} from './mockdata';

const urls = [
  {
    url: '/api/v1/admin/.*/user',
    json: mockUsers
  },
  {
    url: 'api/v1/admin/organization/all-at',
    json: mockOragnizations
  }
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {
      const match = request.url.match(element.url);
      if (match !== null && match.length > 0) {
        console.log('Loaded from json : ' + request.url);
        return of(new HttpResponse({ status: 200, body: element.json }));
      }
    }
    console.log('Loaded from http call :' + request.url);
    return next.handle(request);
  }
}
