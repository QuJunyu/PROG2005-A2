/**
 * PROG2005 A2
 * Part 2 - Angular Inventory System
 * Student ID: 202200408019
 * Student Name: JunyuQv
 */
import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../core/inventory/inventory.service';
import { InventoryItem } from '../../core/inventory/inventory.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: InventoryItem[] = [];
  totalItems = 0;
  popularItems = 0;
  outOfStockItems = 0;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.items = this.inventoryService.getInventory();
    this.totalItems = this.items.length;
    this.popularItems = this.items.filter(i => i.isPopular).length;
    this.outOfStockItems = this.items.filter(i => i.stockStatus === 'Out of Stock').length;
  }
}