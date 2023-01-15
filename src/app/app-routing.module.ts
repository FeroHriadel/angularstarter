import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components:
import { HomePageComponent } from './pages/home-page/components/home-page.component';

import { CategoriesPageComponent } from './pages/categories-pages/components/categories-page/categories-page.component';
import { CategoryPageComponent } from './pages/categories-pages/components/category-page/category-page.component';
import { CreateCategoryPageComponent } from './pages/categories-pages/components/create-category-page/create-category-page.component';

import { SignupPageComponent } from './pages/signup-page/components/signup-page/signup-page.component';
import { SigninPageComponent } from './pages/signup-page/components/signin-page/signin-page.component';

import { TagsPageComponent } from './pages/tags-pages/components/tags-page/tags-page.component';
import { CreateTagPageComponent } from './pages/tags-pages/components/create-tag-page/create-tag-page.component';
import { TagPageComponent } from './pages/tags-pages/components/tag-page/tag-page.component';

import { UsersListPageComponent } from './pages/users-pages/components/users-list-page/users-list-page.component';

import { CreateItemPageComponent } from './pages/items-pages/components/create-item-page/create-item-page.component';
import { ItemsListPageComponent } from './pages/items-pages/components/items-list-page/items-list-page.component';
import { ItemDetailPage } from './pages/items-pages/components/item-detail-page/items-detail-page.component';

//auth guards
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { GuestOnlyGuardService } from './services/guestOnly-guard.service';



const routes: Routes = [
  {path: "", component: HomePageComponent},
  
  {path: "categories", component: CategoriesPageComponent},
  {path: "categories/create", component: CreateCategoryPageComponent, canActivate: [AdminGuardService]},
  {path: "categories/:id", component: CategoryPageComponent},

  {path: "signup", component: SignupPageComponent, canActivate: [GuestOnlyGuardService]},
  {path: "signin", component: SigninPageComponent, canActivate: [GuestOnlyGuardService]},

  {path: "tags", component: TagsPageComponent},
  {path: "tags/create", component: CreateTagPageComponent, canActivate: [AdminGuardService]},
  {path: "tags/:id", component: TagPageComponent},

  {path: "users", component: UsersListPageComponent, canActivate: [AdminGuardService]},

  {path: "items", component: ItemsListPageComponent},
  {path: "items/create", component: CreateItemPageComponent, canActivate: [AuthGuardService]},
  {path: "items/:id", component: ItemDetailPage},

  {path: '**', redirectTo: '', pathMatch: 'full'} //redirect instead of 404page
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AdminGuardService, GuestOnlyGuardService]
})



export class AppRoutingModule { }
