import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;
  returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.returnUrl = this.activateRoute.snapshot.queryParamMap.get('returnUrl') || '/shop';
    this.createLoginForm();
  }

  createLoginForm() {

    this.frmLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.frmLogin.invalid) {
      this.frmLogin.markAllAsTouched();
    } else {
      this.accountService.login(this.frmLogin.value).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      }, error => console.log(error));
    }
  }

}
