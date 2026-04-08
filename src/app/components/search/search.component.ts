/**
 * PROG2005 A2
 * Part 2 - Angular Inventory System
 * Student ID: 202200408019
 * Student Name: JunyuQv
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryService } from '../../core/inventory/inventory.service';
import { InventoryItem } from '../../core/inventory/inventory.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: InventoryItem[] = [];
  popularItems: InventoryItem[] = [];
  categories = ["Electronics", "Furniture", "Clothing", "Tools", "Miscellaneous"];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.loadPopularItems();
  }

  onSearch(): void {
    const { keyword, category } = this.searchForm.value;
    let items = this.inventoryService.getInventory();

    if (keyword) {
      const lower = keyword.toLowerCase();
      items = items.filter(i => i.itemName.toLowerCase().includes(lower));
    }
    if (category) {
      items = items.filter(i => i.category === category);
    }

    this.searchResults = items;
  }

  loadPopularItems(): void {
    this.popularItems = this.inventoryService.getInventory().filter(i => i.isPopular);
  }
}