import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import {  of } from 'rxjs';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  post = jasmine.createSpy('httpClient.post');
}
describe('UserService', () => {
  let service: UserService;
  let httpClientMock: HttpClientMock;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: HttpClientMock
        },
        {
          provide:Router,
          useValue: mockRouter
        }
      ]
    });
    service = TestBed.get(UserService);
    httpClientMock = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
