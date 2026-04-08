/**
 * PROG2005 A2
 * Part 2 - Angular Inventory System
 * Student ID: 202200408019
 * Student Name: JunyuQv
 */
export interface InventoryItem {
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isPopular: boolean;
  comment?: string;
}