import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  frmRegister: FormGroup;
  errors: Array<string>;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.frmRegister = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.frmRegister.valid) {
      this.accountService.register(this.frmRegister.value).subscribe(resp => {
        this.router.navigateByUrl('/shop');
      }, error => {
        console.log(error);
        this.errors = error.errors;
      });
    } else {
      this.frmRegister.markAllAsTouched();
    }

  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(resp => {
             return resp ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }

}
