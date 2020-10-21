import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  private baseUrl = environment.baseUrl;
  validationError: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get500Error() {
    this.http.get(`${this.baseUrl}/buggy/servererror`).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }
  get404Error() {
    this.http.get(`${this.baseUrl}/products/43`).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

  get400Error() {
    this.http.get(`${this.baseUrl}/buggy/badrequest`).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }
  get400ValidationError() {
    this.http.get(`${this.baseUrl}/products/hola`).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
      this.validationError = err.errors;
    });
  }

  calcular(num: number) {

    const currentNum = num.toString().split('');
    const result: Array<number> = [];
    const lengthNumber = currentNum.length;
    let post = num < 0 ? 1 : 0;
    while (post <= lengthNumber) {
      const valores = [...currentNum];
      valores.splice(post, 0, '5');
      result.push(+valores.join(''));
      post++;
    }
    console.log(Math.max(...result));
  }

  orderBytes(secuen: string) {
    const valores = secuen.split('');
    let isCero = false;

    let anterior = valores[0];
    let post = 1;
    for (let index = 1; index < valores.length; index++) {
      if (anterior === valores[index]) {
        break;
      } else {
        anterior = valores[index];
      }
    }

    isCero = anterior === '0';
    const resp: Array<string> = [];
    resp.push(anterior);

    while (post < valores.length) {

      resp.push(isCero ? '1' : '0');
      isCero = !isCero;
      post++;
    }

    console.log(resp);

  }

}
