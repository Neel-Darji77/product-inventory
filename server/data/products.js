export let products = [
  { id: 1, name: "Laptop",         price: 45000, category: "Electronics", stock: 15, isActive: true },
  { id: 2, name: "Wireless Mouse", price: 799,   category: "Electronics", stock: 3,  isActive: true },
  { id: 3, name: "Notebook",       price: 49,    category: "Stationery",  stock: 200,isActive: true },
  { id: 4, name: "Pen Set",        price: 120,   category: "Stationery",  stock: 5,  isActive: true },
  { id: 5, name: "Desk Lamp",      price: 1299,  category: "Furniture",   stock: 8,  isActive: true },
  { id: 6, name: "Office Chair",   price: 8999,  category: "Furniture",   stock: 2,  isActive: true },
  { id: 7, name: "Headphones",     price: 2499,  category: "Electronics", stock: 1,  isActive: true },
  { id: 8, name: "Whiteboard",     price: 3500,  category: "Stationery",  stock: 4,  isActive: true },
];

let nextId = 9;

export function getNextId() {
  return nextId++;
}