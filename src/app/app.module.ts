import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { RouterModule, Routes } from '@angular/router';
import { RouterMap } from './app.routers';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { ArListComponent } from './components/data-table/ar-list/ar-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { PageDashboardComponent } from './pages/admin/page-dashboard/page-dashboard.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageSearchcustomersComponent } from './pages/admin/customers/page-searchcustomers/page-searchcustomers.component';
import { PageNewcustomerComponent } from './pages/admin/customers/page-newcustomer/page-newcustomer.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { CustomerPurposeComponent } from './components/customer-purpose/customer-purpose.component';
import { PageAdminComponent } from './pages/admin/page-admin/page-admin.component';
import { CustomerTransactionsComponent } from './components/customer-transactions/customer-transactions.component';
import { CtListComponent } from './components/data-table/ct-list/ct-list.component';
import { PageReportComponent } from './pages/admin/page-report/page-report.component';
import { PageReportReceivedComponent } from './pages/admin/page-report-received/page-report-received.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageDashboardComponent,
    PageLoginComponent,
    BarChartComponent,
    ArListComponent,
    SidebarComponent,
    PageSearchcustomersComponent,
    PageNewcustomerComponent,
    CustomerInfoComponent,
    CustomerPurposeComponent,
    PageAdminComponent,
    CustomerTransactionsComponent,
    CtListComponent,
    PageReportComponent,
    PageReportReceivedComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    NKDatetimeModule,
    RouterModule.forRoot(RouterMap),
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
        deps: [Http] 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
