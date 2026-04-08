/**
 * PROG2005 A2
 * Part 2 - Angular Inventory System
 * Student ID: 202200408019
 * Student Name: JunyuQv
 */
import { Injectable } from '@angular/core';
import { InventoryItem } from './inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private inventory: InventoryItem[] = [];

  getInventory(): InventoryItem[] {
    return [...this.inventory];
  }

  addItem(item: InventoryItem): void {
    this.inventory.push(item);
  }

  editItem(updatedItem: InventoryItem): void {
    const index = this.inventory.findIndex(i => i.itemId === updatedItem.itemId);
    if (index !== -1) this.inventory[index] = updatedItem;
  }

  deleteItem(itemName: string): void {
    this.inventory = this.inventory.filter(i => i.itemName !== itemName);
  }

  isItemIdExists(itemId: string): boolean {
    return this.inventory.some(i => i.itemId === itemId);
  }

  searchItems(keyword: string): InventoryItem[] {
    const lower = keyword.toLowerCase();
    return this.inventory.filter(item =>
      item.itemName.toLowerCase().includes(lower) || item.category.toLowerCase().includes(lower)
    );
  }
}