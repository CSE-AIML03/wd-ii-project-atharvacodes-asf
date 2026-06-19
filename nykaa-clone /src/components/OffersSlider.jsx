import React, { useState, useEffect } from 'react';
import { BANNER_SLIDES } from '../data';
import { ArrowLeft, ArrowRight, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

/**
 * OffersSlider Component - Carousel Banner Slider
 * Animates beautiful Pink-themed discounts and offers with interactive bullet dots.
 */
export default function OffersSlider({ onCategorySelect }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide rotation every 6 seconds to keep the page interactive
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  return (
    <section className="mb-8">
      {/* Visual carousel container */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-stone-900 text-white">
        {BANNER_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              id={`slide-wrapper-${slide.id}`}
              className={`absolute inset-0 w-full h-full bg-gradient-to-r ${slide.bgClass} flex items-center justify-between transition-all duration-700 ease-in-out ${
                isActive ? 'opacity-100 translate-x-0 scale-100 z-10' : 'opacity-0 translate-x-12 scale-95 pointer-events-none z-0'
              }`}
            >
              <div className="p-6 sm:p-12 md:p-16 max-w-xl text-left flex flex-col justify-center h-full z-10 relative">
                <span className="inline-block self-start bg-white/20 backdrop-blur-xs text-[10px] sm:text-xs font-bold tracking-wider px-2.5 py-1 rounded-full mb-3 text-white uppercase">
                  {slide.tag}
                </span>
                
                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-serif mb-2 sm:mb-3 whitespace-pre-line leading-tight">
                  {slide.title}
                </h2>
                
                <p className="text-xs sm:text-sm md:text-base text-stone-100/90 font-light mb-4 sm:mb-6 max-w-sm line-clamp-2">
                  {slide.description}
                </p>

                <button
                  id={`slide-action-btn-${slide.id}`}
                  onClick={() => {
                    // Quick category mock linking
                    if (slide.id === 2) onCategorySelect('skin');
                    else if (slide.id === 3) onCategorySelect('fragrance');
                    else onCategorySelect('makeup');
                  }}
                  className="bg-white text-stone-950 hover:bg-pink-50 text-xs sm:text-sm font-semibold tracking-wide px-5 sm:px-6 py-2.5 rounded-full transition-all duration-150 self-start hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  {slide.btnText}
                </button>
              </div>

              {/* Decorative Unsplash image mockup overlay */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 md:w-1/2 overflow-hidden hidden sm:block">
                {/* Visual fade elements to merge with the gradient */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent to-stone-900/10 pointer-events-none z-10"></div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover origin-center opacity-85 transition-transform duration-[6000ms] ease-out hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          );
        })}

        {/* Carousel slide arrows */}
        <button
          id="prev-slide-btn"
          onClick={handlePrev}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 sm:p-2.5 rounded-full backdrop-blur-xs transition-colors hover:scale-105 outline-hidden"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          id="next-slide-btn"
          onClick={handleNext}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 sm:p-2.5 rounded-full backdrop-blur-xs transition-colors hover:scale-105 outline-hidden"
          aria-label="Next slide"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Bullet navigation indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {BANNER_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 sm:w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Selling Point badges directly under the carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-[11px] sm:text-xs">
        <div className="flex items-center gap-2.5 bg-green-50/70 border border-green-100 text-green-800 p-2.5 rounded-xl justify-center font-medium">
          <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
          <span>100% Guaranteed Genuine Cosmetic Stock</span>
        </div>
        <div className="flex items-center gap-2.5 bg-pink-50/70 border border-pink-100 text-[#FC2779] p-2.5 rounded-xl justify-center font-medium">
          <Sparkles className="w-4 h-4 text-[#FC2779] shrink-0" />
          <span>Pink Promise: Free trial with orders over ₹999</span>
        </div>
        <div className="flex items-center gap-2.5 bg-amber-50/70 border border-amber-100 text-amber-800 p-2.5 rounded-xl justify-center font-medium">
          <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Instant Checkout via UPI with 20% Mock Code</span>
        </div>
      </div>
    </section>
  );
}
