"use strict";
let inventory = [
    { itemId: "001", itemName: "Laptop", category: "Electronics", quantity: 10, price: 1299.99, supplierName: "Harvey Norman", stockStatus: "In Stock", isPopular: true, comment: "15.6 inch gaming laptop" },
    { itemId: "002", itemName: "Wooden Table", category: "Furniture", quantity: 3, price: 249.99, supplierName: "Harvey Norman", stockStatus: "Low Stock", isPopular: false }
];
const domElements = {
    form: document.getElementById("inventoryForm"),
    itemId: document.getElementById("itemId"),
    itemName: document.getElementById("itemName"),
    category: document.getElementById("category"),
    quantity: document.getElementById("quantity"),
    price: document.getElementById("price"),
    supplierName: document.getElementById("supplierName"),
    stockStatus: document.getElementById("stockStatus"),
    isPopular: document.getElementById("isPopular"),
    comment: document.getElementById("comment"),
    searchInput: document.getElementById("searchInput"),
    feedback: document.getElementById("feedback"),
    inventoryList: document.getElementById("inventoryList"),
    popularList: document.getElementById("popularList")
};
window.onload = () => {
    displayAllItems();
    displayPopularItems();
    bindEvents();
};
function bindEvents() {
    // 表单提交
    domElements.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const item = getFormData();
        if (validateItem(item)) {
            if (isItemIdExists(item.itemId)) {
                editItem(item);
                showFeedback(`Item [${item.itemName}] edited successfully!`, "success");
            }
            else {
                addItem(item);
                showFeedback(`Item [${item.itemName}] added successfully!`, "success");
            }
            domElements.form.reset();
            refreshViews();
        }
    });
    // 实时搜索
    let searchTimer;
    domElements.searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimer);
        const keyword = e.target.value.trim().toLowerCase();
        searchTimer = setTimeout(() => searchItems(keyword), 300);
    });
    // 删除/编辑按钮
    domElements.inventoryList.addEventListener("click", (e) => {
        const target = e.target;
        // 删除
        if (target.classList.contains("delete-btn")) {
            const itemName = target.dataset.name;
            if (confirm(`Are you sure to delete ${itemName}?`)) {
                deleteItem(itemName);
                showFeedback(`Item ${itemName} deleted!`, "success");
                refreshViews();
            }
        }
        // 编辑回填
        if (target.classList.contains("edit-btn")) {
            const itemId = target.dataset.id;
            fillEditForm(itemId);
        }
    });
}
// 获取表单数据
function getFormData() {
    return {
        itemId: domElements.itemId.value.trim(),
        itemName: domElements.itemName.value.trim(),
        category: domElements.category.value,
        quantity: Number(domElements.quantity.value),
        price: Number(domElements.price.value),
        supplierName: domElements.supplierName.value.trim(),
        stockStatus: domElements.stockStatus.value,
        isPopular: domElements.isPopular.checked,
        comment: domElements.comment.value.trim() || undefined
    };
}
// 编辑自动填充表单
function fillEditForm(itemId) {
    const item = inventory.find(i => i.itemId === itemId);
    if (!item)
        return;
    domElements.itemId.value = item.itemId;
    domElements.itemId.readOnly = true;
    domElements.itemName.value = item.itemName;
    domElements.category.value = item.category;
    domElements.quantity.value = item.quantity.toString();
    domElements.price.value = item.price.toString();
    domElements.supplierName.value = item.supplierName;
    domElements.stockStatus.value = item.stockStatus;
    domElements.isPopular.checked = item.isPopular;
    domElements.comment.value = item.comment || "";
    showFeedback(`Edit mode: ${item.itemName} loaded`, "success");
}
// 数据验证
function validateItem(item) {
    if (!item.itemId || !item.itemName || !item.supplierName) {
        showFeedback("Error: ID/Name/Supplier required!", "error");
        return false;
    }
    if (isNaN(item.quantity) || item.quantity < 0 || isNaN(item.price) || item.price < 0) {
        showFeedback("Error: Quantity/Price must be ≥0", "error");
        return false;
    }
    const correctStatus = item.quantity === 0 ? "Out of Stock" : item.quantity <= 5 ? "Low Stock" : "In Stock";
    if (item.stockStatus !== correctStatus) {
        showFeedback(`Error: Stock status must be ${correctStatus}`, "error");
        return false;
    }
    return true;
}
// 检查ID是否存在
function isItemIdExists(itemId) {
    return inventory.some(i => i.itemId === itemId);
}
// 增删改
function addItem(item) { inventory.push(item); }
function editItem(updatedItem) {
    inventory = inventory.map(i => i.itemId === updatedItem.itemId ? updatedItem : i);
}
function deleteItem(itemName) {
    inventory = inventory.filter(i => i.itemName.toLowerCase() !== itemName.toLowerCase());
}
// 搜索
function searchItems(keyword) {
    const res = keyword ? inventory.filter(i => i.itemName.toLowerCase().includes(keyword)) : inventory;
    renderInventoryList(res);
}
// 展示全部商品
function displayAllItems() { renderInventoryList(inventory); }
// 展示热门商品
function displayPopularItems() {
    const popular = inventory.filter(i => i.isPopular);
    if (popular.length === 0) {
        domElements.popularList.innerHTML = "<p class='no-data'>No popular items</p>";
        return;
    }
    domElements.popularList.innerHTML = popular.map(i => `
    <div class="item-card">
      <h4>${i.itemName} (${i.itemId})</h4>
      <p>Category: ${i.category}</p>
      <p>$${i.price.toFixed(2)}</p>
      <p>${i.stockStatus}</p>
    </div>
  `).join('');
}
// 渲染商品列表
function renderInventoryList(items) {
    if (items.length === 0) {
        domElements.inventoryList.innerHTML = "<p class='no-data'>No items</p>";
        return;
    }
    domElements.inventoryList.innerHTML = items.map(i => `
    <div class="item-card">
      <div class="item-header">
        <h4>${i.itemName}</h4>
        <span class="badge ${i.isPopular ? 'popular' : 'regular'}">${i.isPopular ? 'Popular' : 'Regular'}</span>
      </div>
      <p>ID: ${i.itemId}</p>
      <p>Category: ${i.category}</p>
      <p>Qty: ${i.quantity}</p>
      <p>$${i.price.toFixed(2)}</p>
      <p>Supplier: ${i.supplierName}</p>
      <p>Stock: ${i.stockStatus}</p>
      ${i.comment ? `<p>Comment: ${i.comment}</p>` : ''}
      <div class="btn-group">
        <button class="edit-btn" data-id="${i.itemId}">Edit</button>
        <button class="delete-btn" data-name="${i.itemName}">Delete</button>
      </div>
    </div>
  `).join('');
}
// 提示信息
function showFeedback(msg, type) {
    domElements.feedback.className = `feedback ${type}`;
    domElements.feedback.innerHTML = msg;
    setTimeout(() => {
        domElements.feedback.innerHTML = "";
        domElements.feedback.className = "feedback";
    }, 3000);
}
// 刷新页面
function refreshViews() {
    displayAllItems();
    displayPopularItems();
    domElements.itemId.readOnly = false;
}
