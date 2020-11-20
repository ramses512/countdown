import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/guard/auth.guard';
import { AuthComponent } from '@layout/auth/auth.component';
import { ContentComponent } from '@layout/content/content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('@modules/countdown/countdown.module').then(
            (m) => m.CountdownModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: AuthComponent,
    loadChildren: () =>
      import('@modules/login/login.module').then((m) => m.LoginModule),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }), // To get the lazy modules routing params
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
