/**
 * PROG2005 A2
 * Part 2 - Angular Inventory System
 * Student ID: 202200408019
 * Student Name: JunyuQv
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../core/inventory/inventory.service';
import { InventoryItem } from '../../core/inventory/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  inventory: InventoryItem[] = [];
  feedback: { message: string; type: 'success' | 'error' } = { message: '', type: 'success' };
  categories: InventoryItem["category"][] = ["Electronics", "Furniture", "Clothing", "Tools", "Miscellaneous"];
  stockStatuses: InventoryItem["stockStatus"][] = ["In Stock", "Low Stock", "Out of Stock"];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.inventoryForm = this.fb.group({
      itemId: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      category: ['Electronics', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0.00, [Validators.required, Validators.min(0)]],
      supplierName: ['', [Validators.required]],
      stockStatus: ["In Stock", [Validators.required]],
      isPopular: [false],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventory = this.inventoryService.getInventory();
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      this.showFeedback("All required fields must be filled!", "error");
      return;
    }

    const formValue = this.inventoryForm.value;
    const correctStatus: InventoryItem["stockStatus"] =
      formValue.quantity === 0 ? "Out of Stock" :
      formValue.quantity <= 5 ? "Low Stock" : "In Stock";

    if (formValue.stockStatus !== correctStatus) {
      this.showFeedback(`Stock status must be: ${correctStatus}`, "error");
      return;
    }

    const item: InventoryItem = formValue;
    if (this.inventoryService.isItemIdExists(item.itemId)) {
      this.inventoryService.editItem(item);
      this.showFeedback("Item updated!", "success");
    } else {
      this.inventoryService.addItem(item);
      this.showFeedback("Item added!", "success");
    }

    this.inventoryForm.reset({
      category: "Electronics", quantity: 0, price: 0, stockStatus: "In Stock", isPopular: false
    });
    this.loadInventory();
  }

  deleteItem(itemName: string): void {
    if (confirm("Delete this item?")) {
      this.inventoryService.deleteItem(itemName);
      this.showFeedback("Item deleted!", "success");
      this.loadInventory();
    }
  }

  showFeedback(message: string, type: 'success' | 'error'): void {
    this.feedback = { message, type };
    setTimeout(() => this.feedback.message = '', 3000);
  }

  // 补全 HTML 用的 f 变量（核心修复）
  get f() {
    return this.inventoryForm.controls;
  }
}