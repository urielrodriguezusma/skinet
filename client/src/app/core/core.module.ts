import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavVarComponent } from './nav-var/nav-var.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavVarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    NavVarComponent,
    TestErrorComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
