import { PageAdminComponent } from './pages/admin/page-admin/page-admin.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';

import { PageDashboardComponent } from './pages/admin/page-dashboard/page-dashboard.component';

//Customers
import { PageSearchcustomersComponent } from './pages/admin/customers/page-searchcustomers/page-searchcustomers.component';
import { PageNewcustomerComponent } from './pages/admin/customers/page-newcustomer/page-newcustomer.component';


//Route map
export const RouterMap = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: PageLoginComponent },
  { 
    path: 'admin', component: PageAdminComponent,
    children: [
      { path: '', component: PageDashboardComponent },
      { path: 'dashboard', component: PageDashboardComponent },

      { path: 'customer-new', component: PageNewcustomerComponent },
      { path: 'customer-search/:by', component: PageSearchcustomersComponent },
      { path: 'customer/:id', component: PageNewcustomerComponent }
      
    ] //End of admin children 
  }
];