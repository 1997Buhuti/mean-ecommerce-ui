import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CatogoriesTableComponent } from './categories/catogories-table/catogories-table.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CatogoriesTableComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CatogoriesTableComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
