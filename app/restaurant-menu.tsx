"use client";
import Image from "next/image";
import { useState } from "react";
import { categories, menuItems, type Category } from "./restaurant-content";
function PhotoIcon() {
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="8.5" cy="9" r="1.5" /><path d="m4 17 5-5 4 4 3-3 5 5" /></svg>;
}
export function Menu() {
  const [category, setCategory] = useState<Category>("Semua");
  const items = menuItems.filter((item) => category === "Semua" || item.category === category);
  return <>
    <div className="menu-toolbar"><div className="menu-filters" role="group" aria-label="Filter kategori menu">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="template-note">Contoh penempatan menu</span></div>
    <p className="sr-only" role="status">{items.length} contoh menu ditampilkan untuk kategori {category}.</p>
    <div className="menu-grid">{items.map((item) => <article className="menu-item" key={item.id}><div className={`menu-photo menu-photo-${item.category.toLowerCase()}`} data-slot={item.id}>{item.image ? <Image src={item.image} alt={item.name} fill sizes="(min-width: 900px) 30vw, (min-width: 600px) 45vw, 90vw" /> : <div className="photo-placeholder"><PhotoIcon /><span>Foto {item.category.toLowerCase()} kamu di sini</span><small>Foto menu 4:3</small></div>}<span className="category-label" data-keep>{item.category}</span></div><div className="menu-item-heading"><h3>{item.name}</h3>{item.price && <span className="menu-price">{item.price}</span>}</div><p>{item.description}</p></article>)}</div>
    <p className="menu-disclaimer">Nama, foto, dan harga akan disesuaikan dengan menu Dundee.</p>
  </>;
}
