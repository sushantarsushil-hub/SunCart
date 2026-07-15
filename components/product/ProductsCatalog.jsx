'use client';

import { useState, useTransition } from "react";
import ProductCard from "@/components/cards/ProductCard";
import { Search, SlidersHorizontal, Grid, X } from "lucide-react";

export default function ProductsCatalog({ initialProducts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isPending, startTransition] = useTransition();

  const categories = ["All", ...new Set(initialProducts.map(p => p.category))];

  // Filtering and Sorting logic
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = initialProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.brand.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    // default to newest (mocked by product ID comparison or sorting order)
    return initialProducts.indexOf(a) - initialProducts.indexOf(b);
  });

  return (
    <div className="space-y-8">
      {/* Page Title & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Summer Collection
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Showing {sortedProducts.length} of {initialProducts.length} summer essentials
          </p>
        </div>
        
        {/* Sort Select */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="sort" className="text-xs font-semibold text-slate-400 uppercase">Sort By</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm rounded-full text-slate-700 bg-white border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-sky"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-300 active:scale-95 shrink-0 ${
                  isActive 
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4.5 w-4.5 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search products, brands..."
            value={search}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-full bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-sky focus:border-transparent transition-all"
          />
          {search && (
            <button 
              onClick={() => setSearch("")} 
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid Display */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <SlidersHorizontal className="h-8 w-8" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-lg font-bold text-slate-800">No essentials found</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We couldn&apos;t find any products matching &quot;{search}&quot; in category &quot;{category}&quot;. Try clearing filters or revising terms.
            </p>
          </div>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSortBy("newest");
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 px-6 rounded-full transition-all active:scale-95"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
