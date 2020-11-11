import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/models/brand';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({ providedIn: 'root' })
export class ShopService {

  private readonly baseUrl = environment.baseUrl;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();

  constructor(private http: HttpClient) { }

  getProducts(useCache: boolean): Observable<IPagination> {

    if (useCache === false) {
      this.products = [];
    }
    if (this.products.length > 0 && useCache) {
      const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);
      if (this.shopParams.pageNumber <= pagesReceived) {
        this.pagination.data = this.products.slice((this.shopParams.pageNumber - 1) * this.shopParams.pageSize,
          this.shopParams.pageNumber * this.shopParams.pageSize);

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brandIdSelected !== 0) {
      params = params.append('brandId', this.shopParams.brandIdSelected.toString());
    }

    if (this.shopParams.typeIdSelected !== 0) {
      params = params.append('typeId', this.shopParams.typeIdSelected.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sortSelected);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http.get<IPagination>(`${this.baseUrl}/products?pageSize=6`, { observe: 'response', params }).pipe(
      map(resp => {
        this.products = [...this.products, ...resp.body.data];
        this.pagination = resp.body;
        return this.pagination;
      })
    );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number): Observable<IProduct> {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of(product);
    }

    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`);
  }

  getBrands(): Observable<IBrand[]> {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(`${this.baseUrl}/products/brands`).pipe(
      map(resp => this.brands = resp)
    );
  }

  getTypes(): Observable<IType[]> {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IType[]>(`${this.baseUrl}/products/types`).pipe(
      map(resp => this.types = resp)
    );
  }

}
