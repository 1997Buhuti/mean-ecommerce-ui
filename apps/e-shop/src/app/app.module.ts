import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@mean-ecommerce-ui/ui';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ProductListComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    CategoryFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    UiModule,
    BrowserAnimationsModule,
    AccordionModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
