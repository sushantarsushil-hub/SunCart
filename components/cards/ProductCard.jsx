import Link from "next/link";
import { Star, ArrowRight, Eye } from "lucide-react";

export default function ProductCard({ product }) {
  // Format rating helper
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4.5 w-4.5 text-slate-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-4.5 w-4.5 text-slate-300" />
        );
      }
    }
    return stars;
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden hover:scale-[1.02] relative">
      {/* Category Ribbon */}
      <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
        {product.category}
      </span>

      {/* Product Image Wrapper */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 relative border-b border-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Details Box */}
      <div className="p-5 flex flex-col flex-grow space-y-2">
        <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
          {product.brand}
        </span>
        <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-primary-sky transition-colors">
          {product.name}
        </h3>

        {/* Ratings row */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-slate-500 font-semibold mt-0.5">
            ({product.rating})
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 mt-auto">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium leading-none">Price</span>
            <span className="text-lg font-extrabold text-slate-800">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Action Trigger */}
          <Link
            href={`/products/${product.id}`}
            className="flex items-center justify-center p-2.5 px-4 rounded-full bg-slate-50 hover:bg-slate-900 group-hover:bg-slate-900 text-slate-700 group-hover:text-white transition-all-custom shadow-sm active:scale-95 border border-slate-100 hover:border-slate-900"
          >
            <Eye className="h-4 w-4 mr-2" />
            <span className="text-xs font-bold">View Details</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
