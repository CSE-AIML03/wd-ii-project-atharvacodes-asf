import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Info } from 'lucide-react';

/**
 * ProductCard Component
 * Displays a single beauty product on Nykaa beauty grid
 * Features: hover zoom, shade switching options, wishlist animations, pricing conversions, and responsive Quick View activation.
 */
export default function ProductCard({
  product,
  onAddToCart,
  onOpenQuickView,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);

  // If the product has multiple color shading variables, override the display image and details.
  const hasShades = product.shades && product.shades.length > 0;
  const currentShade = hasShades ? product.shades[selectedShadeIndex] : null;

  const displayImage = (currentShade && currentShade.img) ? currentShade.img : product.image;
  const displayName = currentShade 
    ? `${product.name} (${currentShade.name})` 
    : product.name;

  return (
    <article
      id={`product-card-${product.id}`}
      className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col h-full relative"
    >
      {/* Product Card Top Line Badge */}
      {product.tag && (
        <span 
          id={`product-tag-${product.id}`}
          className="absolute top-2.5 left-2.5 z-10 bg-stone-900 border border-stone-700/50 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
        >
          {product.tag}
        </span>
      )}

      {/* Wishlist Heart Icon Action */}
      <button
        id={`product-wishlist-btn-${product.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className="absolute top-2.5 right-2.5 z-10 bg-white/80 backdrop-blur-xs text-stone-600 hover:text-[#FC2779] p-2 rounded-full shadow-xs hover:scale-110 active:scale-95 transition-all outline-hidden cursor-pointer"
        aria-label="Add to wishlist"
      >
        <Heart 
          className={`w-3.5 h-3.5 transition-colors duration-150 ${
            isWishlisted ? 'fill-[#FC2779] text-[#FC2779]' : 'text-stone-500'
          }`}
        />
      </button>

      {/* Image Container with Zoom effect */}
      <div 
        onClick={() => onOpenQuickView(product)}
        className="h-44 sm:h-52 w-full bg-stone-50 overflow-hidden relative cursor-pointer group-hover:opacity-95 transition-opacity duration-200"
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Quick view text overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
          <span className="bg-white/95 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm text-stone-800 flex items-center gap-1">
            <Info className="w-3 h-3 text-[#FC2779]" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 text-left">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">
          {product.brand}
        </span>
        
        <h3 
          onClick={() => onOpenQuickView(product)}
          className="text-xs sm:text-sm font-semibold text-stone-800 line-clamp-2 min-h-[32px] sm:min-h-[40px] hover:text-[#FC2779] cursor-pointer transition-colors"
        >
          {displayName}
        </h3>

        {/* Rating feedback */}
        <div className="flex items-center gap-1.5 mt-1 mb-2">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-xs font-bold text-stone-700">{product.rating}</span>
          <span className="text-[10px] text-stone-400">({product.reviewsCount.toLocaleString()})</span>
        </div>

        {/* Dynamic Shade Dots Previewer */}
        {hasShades && (
          <div className="mb-3">
            <p className="text-[9px] font-bold uppercase tracking-wide text-stone-400 mb-1">
              Shades ({product.shades.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.shades.map((shade, dotIndex) => (
                <button
                  key={shade.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedShadeIndex(dotIndex);
                  }}
                  title={shade.name}
                  className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                    selectedShadeIndex === dotIndex 
                      ? 'ring-2 ring-[#FC2779] scale-110 border-white' 
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: shade.hex }}
                  aria-label={`Select shade ${shade.name}`}
                ></button>
              ))}
            </div>
          </div>
        )}

        {/* Price Tag Details (Original / Discounted / Off Rate) */}
        <div className="mt-auto pt-2 border-t border-stone-50">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-stone-900">
              ₹{product.price}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-green-600">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Basket Add-to-bag action */}
      <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-0">
        <button
          id={`product-add-cart-btn-${product.id}`}
          onClick={() => {
            onAddToCart(product, currentShade);
          }}
          className="w-full bg-[#FC2779] hover:bg-[#E01E67] text-white py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 group/btn cursor-pointer shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
          Add to Bag
        </button>
      </div>
    </article>
  );
}
