import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageSearchcustomersComponent } from './pages/page-searchcustomers/page-searchcustomers.component';
import { PageNewcustomerComponent } from './pages/page-newcustomer/page-newcustomer.component';

//Route map
export const RouterMap = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: PageDashboardComponent },
  { path: 'customers', component: PageSearchcustomersComponent },
  { path: 'customers/new', component: PageNewcustomerComponent },
  { path: 'customers/:id', component: PageNewcustomerComponent },
  { path: 'login', component: PageLoginComponent }
];