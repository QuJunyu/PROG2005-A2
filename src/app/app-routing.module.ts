/**
 * PROG2005 A2
 * Part 2 - Angular Inventory System
 * Student ID: 202200408019
 * Student Name: JunyuQv
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SearchComponent } from './components/search/search.component';
import { PrivacySecurityComponent } from './components/privacy-security/privacy-security.component';
import { HelpComponent } from './components/help/help.component';

// Route configuration - 5 core pages (per assessment requirements)
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route: Home
  { path: 'home', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy-security', component: PrivacySecurityComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: 'home' } // 404 fallback: redirect to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }