import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryProduct } from '../entities/category-product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {
  private baseUrl = "http://localhost:9090/category/"

  constructor(private httpClient:HttpClient) { }

    addCategorie(category: CategoryProduct): Observable<any> {
      return this.httpClient.post<any>('http://localhost:9090/category/add', category);
    }

    getProductCategories(): Observable<CategoryProduct[]> {
      return this.httpClient.get<CategoryProduct[]>(this.baseUrl + 'all');
  }
  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'delete/' + id);
  }
  getCategoryById(id:number): Observable<CategoryProduct> {
    return this.httpClient.get<CategoryProduct>(this.baseUrl + 'get/' + id);
  }


}
