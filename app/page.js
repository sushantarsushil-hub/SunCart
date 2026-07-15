import fs from "fs";
import path from "path";
import HeroSlider from "@/components/home/HeroSlider";
import ProductCard from "@/components/cards/ProductCard";
import Newsletter from "@/components/home/Newsletter";
import { Umbrella, Droplet, Shield, Compass, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  // Load products server-side
  const productsFilePath = path.join(process.cwd(), "data", "products.json");
  let products = [];
  try {
    products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
  } catch (e) {
    products = [];
  }
  
  // Render exactly three featured products for landing layout
  const popularProducts = products.slice(0, 3);

  const careTips = [
    {
      icon: <Droplet className="h-6 w-6 text-sky-500" />,
      title: "Stay Hydrated",
      desc: "Drinking enough water is vital. Keep an insulated bottle near you on hot beach days to maintain core energy."
    },
    {
      icon: <Shield className="h-6 w-6 text-orange-500" />,
      title: "Sun Protection",
      desc: "Apply broad-spectrum SPF 50 sunscreen every two hours. Cover up with wide-brim hats and polarization sunglasses."
    },
    {
      icon: <Umbrella className="h-6 w-6 text-amber-500" />,
      title: "Beach Essentials",
      desc: "Pack a lightweight, sandproof microfiber towel. Keep sand out of your vehicle and belongings for a stress-free trip."
    },
    {
      icon: <Compass className="h-6 w-6 text-emerald-500" />,
      title: "Smart Travel",
      desc: "Track weather reports and tide timelines. Seek shade between 10 AM and 4 PM when UV rays are at their peak."
    }
  ];

  const brands = [
    { name: "Nike", category: "Activewear" },
    { name: "RayBan", category: "Eyewear" },
    { name: "Nivea", category: "Skincare" },
    { name: "Adidas", category: "Aesthetics" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* 1. Hero Banner Carousel slider */}
      <section aria-label="Summer Hero Slider">
        <HeroSlider />
      </section>

      {/* 2. Popular Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent-orange">
              <Sparkles className="h-4 w-4 fill-orange-300" />
              <span>Trending Now</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Popular Summer Products
            </h2>
          </div>
          <Link 
            href="/products" 
            className="text-sm font-semibold text-primary-sky hover:text-primary-ocean transition-all flex items-center gap-1.5"
          >
            <span>See Collection</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Summer Care Tips */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-md p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-sky">Summer Care Essentials</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            How to Survive the Summer Heat
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Follow these essential summer habits to ensure your vacation is both safe and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careTips.map((tip, index) => (
            <div key={index} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 hover:shadow-md transition-shadow">
              <div className="p-3 bg-white w-fit rounded-xl shadow-sm border border-slate-100">
                {tip.icon}
              </div>
              <h3 className="font-bold text-slate-800">{tip.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Top Brands */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-orange">Trusted Partners</span>
          <h2 className="text-2xl font-extrabold text-slate-800">Shop Top Brands</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200"
            >
              <span className="text-xl font-black text-slate-700 tracking-wider">
                {brand.name}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">
                {brand.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Newsletter subscription */}
      <Newsletter />
    </div>
  );
}
