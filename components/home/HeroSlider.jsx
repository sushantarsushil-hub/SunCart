'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowLeft, Sun } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import sunAnimationData from "@/public/images/summer-animation.json";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: "Summer Sale 50% OFF",
      subtitle: "Catch the Glow of the Season",
      desc: "Gear up for hot sunny days with our premium selection of beach outfits, polarization shades, sunscreen lotions, and insulated flasks.",
      bg: "from-amber-100 via-sky-50 to-orange-100",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop",
      ctaText: "Shop the Collection",
      ctaLink: "/products"
    },
    {
      title: "UV Shield & Hydration",
      subtitle: "Organic Aloe SPF50 Protection",
      desc: "Explore dermatologically verified reef-safe sunscreens. Keep your skin hydrated and protected during long sun-soaked beach trips.",
      bg: "from-sky-100 via-amber-50 to-emerald-50",
      image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1600&q=80&auto=format&fit=crop",
      ctaText: "Browse Sunscreens",
      ctaLink: "/products"
    },
    {
      title: "Essential Summer Gear",
      subtitle: "Sandproof Accessories & Straw Hats",
      desc: "Ditch the heavy, damp cotton towels. Shop sand-repelling, quick-dry microfiber sheets and wide-brim handwoven straw hats.",
      bg: "from-orange-100 via-sky-50 to-amber-100",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80&auto=format&fit=crop",
      ctaText: "Explore Accessories",
      ctaLink: "/products"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br shadow-xl transition-all duration-700">
      {/* Decorative Floating Summer Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300/30 rounded-full blur-xl animate-float-slow" />
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-sky-300/20 rounded-full blur-xl animate-float-medium" />
      <div className="absolute top-1/2 left-2/3 w-20 h-20 bg-orange-300/20 rounded-full blur-lg animate-float-slow" />

      {/* Main Slides Content */}
      <div className="relative h-[480px] md:h-[520px] flex items-center justify-between px-6 sm:px-12 lg:px-20 py-8 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between px-8 sm:px-12 lg:px-20 py-8 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 -z-10"
              }`}
            >
              {/* Background photo + subtle gradient overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent" aria-hidden />
              {/* Left Column: Text Content */}
              <div className="w-full md:w-3/5 text-left space-y-4 md:space-y-6 relative z-20">
                <span className="inline-block text-xs md:text-sm font-bold uppercase tracking-widest text-accent-orange bg-orange-100 px-3 py-1 rounded-full">
                  {slide.title}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
                  {slide.subtitle}
                </h1>
                <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl">
                  {slide.desc}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={slide.ctaLink}
                    className="flex items-center gap-2 bg-white/95 hover:bg-white text-slate-900 font-semibold text-sm py-3 px-6 rounded-full shadow-lg transition-all-custom active:scale-95"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="bg-white/20 hover:bg-white/30 text-white/90 font-semibold text-sm py-3 px-6 rounded-full border border-white/30 shadow-sm transition-all-custom active:scale-95"
                  >
                    Explore Essentials
                  </Link>
                </div>
              </div>

              {/* Right Column: Lottie Animation */}
              <div className="hidden md:flex w-full md:w-2/5 justify-center items-center relative z-20">
                <div className="w-64 h-64 lg:w-80 lg:h-80 relative flex items-center justify-center">
                  <Lottie
                    animationData={sunAnimationData}
                    loop={true}
                    className="w-full h-full object-contain relative z-20"
                  />
                  {/* Decorative glass glow backplate */}
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 shadow-inner z-10 scale-95" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/60 hover:bg-white text-slate-700 shadow-md transition-all active:scale-90 border border-white/20"
        aria-label="Previous Slide"
      >
        <ArrowLeft className="h-4.5 w-4.5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/60 hover:bg-white text-slate-700 shadow-md transition-all active:scale-90 border border-white/20"
        aria-label="Next Slide"
      >
        <ArrowRight className="h-4.5 w-4.5" />
      </button>

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === index ? "w-8 bg-slate-800" : "w-2.5 bg-slate-400/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
