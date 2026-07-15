'use client';

import { useState } from "react";
import Link from "next/link";
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, Check, X, ArrowLeft, Eye } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetailsView({ product, allProducts }) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Mock shipping form details
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");

  // Get up to 3 related products in same category (excluding current)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // If no related products in same category, grab other products
  const backupProducts = relatedProducts.length > 0 
    ? relatedProducts 
    : allProducts.filter(p => p.id !== product.id).slice(0, 3);

  // Gallery list (main image and 2 mock zoomed crops)
  const gallery = [
    product.image,
    product.image, // Duplicate for thumbnail list
  ];

  const handlePurchase = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress || !shippingCity) {
      toast.error("Please complete all shipping fields");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setOrderId("SC-" + Math.floor(100000 + Math.random() * 900000));
      setIsSuccessOpen(true);
      toast.success("Order confirmed successfully!");
      
      // Reset form
      setShippingName("");
      setShippingAddress("");
      setShippingCity("");
    }, 1500);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4.5 w-4.5 ${
            i <= Math.floor(rating) 
              ? "fill-amber-400 text-amber-400" 
              : "text-slate-200"
          }`} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="space-y-12">
      {/* Back button */}
      <div>
        <Link 
          href="/products" 
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary-sky transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Main Details Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-md">
        
        {/* Left Column: Image Viewer */}
        <div className="space-y-4">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="object-cover w-full h-full transition-all duration-300"
            />
          </div>
          
          {/* Thumbnails list */}
          <div className="flex gap-3">
            {gallery.map((img, index) => {
              const isSelected = activeImage === img && index === 0; // Highlight first primarily
              return (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden bg-slate-50 border transition-all ${
                    isSelected ? "border-primary-sky ring-2 ring-sky-100" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Information Panel */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-sky">
                {product.category}
              </span>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                product.stock > 10 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                  : "bg-orange-50 text-orange-600 border-orange-200"
              }`}>
                {product.stock > 10 ? "In Stock" : `Only ${product.stock} Left`}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm font-semibold text-slate-400">Brand: {product.brand}</p>
          </div>

          {/* Ratings row */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-slate-600 font-bold">{product.rating} / 5</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">${product.price.toFixed(2)}</span>
            <span className="text-xs text-slate-400 font-medium">USD + Free Shipping</span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-700">Description</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Specifications</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200/50 pb-1">
                <span className="text-slate-400">Origin</span>
                <span className="font-semibold text-slate-700">Imported</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1">
                <span className="text-slate-400">Category</span>
                <span className="font-semibold text-slate-700">{product.category}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1">
                <span className="text-slate-400">Inventory</span>
                <span className="font-semibold text-slate-700">{product.stock} units</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1">
                <span className="text-slate-400">Packaging</span>
                <span className="font-semibold text-slate-700">Eco-Friendly</span>
              </div>
            </div>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-3 gap-2 py-2 text-[10px] sm:text-xs text-slate-500 font-semibold text-center border-t border-b border-slate-100">
            <div className="flex flex-col items-center gap-1 py-1">
              <ShieldCheck className="h-5 w-5 text-sky-500" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center gap-1 py-1 border-x border-slate-100">
              <Truck className="h-5 w-5 text-amber-500 animate-float-medium" />
              <span>Free Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 py-1">
              <RefreshCw className="h-5 w-5 text-orange-500" />
              <span>30-Day Returns</span>
            </div>
          </div>

          {/* Purchase Trigger */}
          <button
            onClick={handlePurchase}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-orange to-amber-500 text-white font-extrabold text-base py-4 rounded-full shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{product.stock === 0 ? "Out of Stock" : "Purchase Now"}</span>
          </button>
        </div>
      </section>

      {/* Related Products Grid */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
          Related Summer Essentials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {backupProducts.map((p) => (
            <article key={p.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{p.brand}</span>
                <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{p.name}</h3>
                <span className="text-sm font-black text-slate-700">${p.price.toFixed(2)}</span>
              </div>
              <Link
                href={`/products/${p.id}`}
                className="mt-3 flex items-center justify-center py-2 border border-slate-200 text-xs font-bold rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                View details
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-slate-100 max-w-md w-full p-6 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4">
              Simulate Order Checkout
            </h3>

            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Product</label>
                <div className="flex gap-3 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{product.name}</h4>
                    <span className="text-xs text-slate-400">{product.brand}</span>
                  </div>
                </div>
              </div>

              {/* Order pricing summary */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-slate-800 text-sm">
                  <span>Total Amount</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Shipping Inputs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shipping Details</h4>
                
                <div className="space-y-1">
                  <label htmlFor="ship-name" className="sr-only">Full Name</label>
                  <input
                    type="text"
                    id="ship-name"
                    placeholder="Full Name"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    required
                    className="input input-bordered w-full rounded-xl bg-white text-slate-800 border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary-sky"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="ship-addr" className="sr-only">Street Address</label>
                  <input
                    type="text"
                    id="ship-addr"
                    placeholder="Street Address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                    className="input input-bordered w-full rounded-xl bg-white text-slate-800 border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary-sky"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="ship-city" className="sr-only">City, State & Zip</label>
                  <input
                    type="text"
                    id="ship-city"
                    placeholder="City, State & Zip"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    required
                    className="input input-bordered w-full rounded-xl bg-white text-slate-800 border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary-sky"
                  />
                </div>
              </div>

              {/* Checkout actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-full text-sm active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full text-sm active:scale-95 transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    "Confirm Order"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-slate-100 max-w-sm w-full p-6 text-center shadow-2xl relative animate-fade-in space-y-4">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-800">Order Placed!</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thank you for your purchase! Your summer essentials will arrive shortly. (This is a checkout simulation)
              </p>
            </div>

            {/* Receipt Summary details */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs space-y-1 text-slate-600 text-left">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span className="font-bold text-slate-800">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Product</span>
                <span className="font-semibold text-slate-800 line-clamp-1 max-w-[150px]">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid amount</span>
                <span className="font-bold text-emerald-600">${product.price.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsSuccessOpen(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full text-sm active:scale-95 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
