import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({ providedIn: 'root' })
export class ShopService {

  private readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<IPagination> {

    let params = new HttpParams();


    if (shopParams.brandIdSelected !== 0) {
      params = params.append('brandId', shopParams.brandIdSelected.toString());
    }

    if (shopParams.typeIdSelected !== 0) {
      params = params.append('typeId', shopParams.typeIdSelected.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sortSelected);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination>(`${this.baseUrl}/products?pageSize=6`, { observe: 'response', params }).pipe(
      map(resp => {
        return resp.body;
      })
    );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.baseUrl}/products/brands`);
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(`${this.baseUrl}/products/types`);
  }

}
