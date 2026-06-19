import React, { useState } from 'react';
import { X, Star, Calendar, ShoppingBag, ShieldAlert, BadgeCheck } from 'lucide-react';

/**
 * ProductDetailsModal Component
 * Provides an in-depth overlay showing specifications, benefits, ingredients, shade selection,
 * mock user reviews, and instant shopping addition.
 */
export default function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('how'); // 'how' | 'ingredients' | 'reviews'

  if (!product) return null;

  const hasShades = product.shades && product.shades.length > 0;
  const currentShade = hasShades ? product.shades[selectedShadeIndex] : null;

  const displayImage = (currentShade && currentShade.img) ? currentShade.img : product.image;
  const displayName = currentShade 
    ? `${product.name} - ${currentShade.name}` 
    : product.name;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      {/* Modal Card Layout */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full h-[90vh] md:h-auto md:max-h-[85vh] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button top corner */}
        <button
          id="close-details-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-stone-100 hover:bg-stone-200 text-stone-700 p-2 rounded-full shadow-xs cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left column: Image showcase */}
        <div className="w-full md:w-1/2 bg-stone-50 p-6 flex items-center justify-center relative min-h-[250px] md:min-h-0">
          <img
            src={displayImage}
            alt={displayName}
            className="w-full max-h-[250px] md:max-h-[380px] object-contain rounded-xl drop-shadow-md select-none transition-all duration-300 transform"
            referrerPolicy="no-referrer"
          />
          {currentShade && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-stone-800 shadow-sm flex items-center gap-1.5 border border-pink-100">
              <span className="w-3 h-3 rounded-full border border-stone-200 inline-block" style={{ backgroundColor: currentShade.hex }}></span>
              <span>Shade Selected: <strong>{currentShade.name}</strong></span>
            </div>
          )}
        </div>

        {/* Right column: Form details list */}
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto h-full text-left">
          <div className="mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{product.brand}</span>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mt-0.5">{displayName}</h2>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-sm text-xs font-bold flex items-center gap-1">
              {product.rating} <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-xs text-stone-500">{product.reviewsCount.toLocaleString()} Verified Buy Ratings</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mb-4 text-justify">
            {product.description}
          </p>

          {/* If the product has visual shades, select shade option inside details */}
          {hasShades && (
            <div className="bg-stone-50 p-3.5 rounded-xl mb-4 text-xs">
              <p className="font-bold text-stone-700 mb-2 uppercase tracking-wide text-[10px]">Select Your Ideal Pigment shade:</p>
              <div className="flex flex-wrap gap-2">
                {product.shades.map((shade, i) => (
                  <button
                    key={shade.name}
                    id={`modal-shade-btn-${i}`}
                    onClick={() => setSelectedShadeIndex(i)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      selectedShadeIndex === i
                        ? 'border-[#FC2779] bg-[#FC2779]/5 font-bold shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-400'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-stone-200 shadow-inner" style={{ backgroundColor: shade.hex }}></span>
                    <span>{shade.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mb-6 bg-pink-50/40 p-3 rounded-xl">
            <span className="text-2xl font-bold text-stone-900">₹{product.price}</span>
            {product.discount > 0 && (
              <>
                <span className="text-xs sm:text-sm text-stone-400 line-through">₹{product.originalPrice}</span>
                <span className="text-xs text-green-700 font-bold bg-green-100 px-1.5 py-0.5 rounded-sm">
                  {product.discount}% discount applied
                </span>
              </>
            )}
          </div>

          {/* Tabs header details (How to / Ingredients / Reviews) */}
          <div className="border-b border-stone-200 flex gap-4 text-xs font-semibold text-stone-500 mb-3">
            <button
              id="tab-btn-how"
              onClick={() => setActiveTab('how')}
              className={`pb-2 outline-hidden border-b-2 transition-colors ${
                activeTab === 'how' ? 'border-[#FC2779] text-[#FC2779]' : 'border-transparent hover:text-stone-800'
              }`}
            >
              How to Apply
            </button>
            <button
              id="tab-btn-ingredients"
              onClick={() => setActiveTab('ingredients')}
              className={`pb-2 outline-hidden border-b-2 transition-colors ${
                activeTab === 'ingredients' ? 'border-[#FC2779] text-[#FC2779]' : 'border-transparent hover:text-stone-800'
              }`}
            >
              Ingredients
            </button>
            <button
              id="tab-btn-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 outline-hidden border-b-2 transition-colors ${
                activeTab === 'reviews' ? 'border-[#FC2779] text-[#FC2779]' : 'border-transparent hover:text-stone-800'
              }`}
            >
              User Feedback
            </button>
          </div>

          {/* Tab content content */}
          <div className="flex-1 text-xs text-stone-600 font-light mb-6">
            {activeTab === 'how' && (
              <div className="space-y-2 leading-relaxed">
                <p><strong>Benefits:</strong> {product.details.benefits}</p>
                <p className="mt-2 text-stone-700 font-semibold text-[11px] uppercase tracking-wider">Step-by-step Application Guide:</p>
                <p className="bg-stone-50 p-3 rounded-lg border-l-2 border-pink-400 italic">"{product.details.howToUse}"</p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-2">
                <p className="leading-relaxed"><strong>Active Contents list:</strong></p>
                <div className="bg-stone-50 p-3 rounded-lg font-mono text-[10px] break-all leading-normal text-stone-500">
                  {product.details.ingredients}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-green-700 mt-2">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span>Dermatologist tested, free from synthetic parabens and sulphates.</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <p className="font-semibold text-stone-700">Top Verified Reviews (3)</p>
                  <span className="text-[10px] text-stone-400">Sort by: Relevance</span>
                </div>
                
                <div className="space-y-2 max-h-[140px] overflow-y-auto">
                  <div className="bg-stone-50/50 p-2.5 rounded-md text-left">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-stone-800 text-[10px]">Aanchal M.</p>
                      <span className="text-[9px] text-[#FC2779]">★ 5/5</span>
                    </div>
                    <p className="font-light text-stone-500 text-[11px]">Best purchase I have made this season. Highly pigmented and stays without drying the skin. Perfect!</p>
                  </div>

                  <div className="bg-stone-50/50 p-2.5 rounded-md text-left">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-stone-800 text-[10px]">Pooja Deshmukh</p>
                      <span className="text-[9px] text-[#FC2779]">★ 4.8/5</span>
                    </div>
                    <p className="font-light text-stone-500 text-[11px]">Matches my formulation expectation. Authentic packaging by Nykaa. Recommended for high-end beauty seekers.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions inside details */}
          <div className="flex gap-2.5 mt-auto pt-4 border-t border-stone-100">
            <button
              id="details-toggle-wishlist-btn"
              onClick={() => onToggleWishlist(product)}
              className={`flex-1 py-3 px-4 border rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                isWishlisted
                  ? 'border-transparent bg-pink-50 text-[#FC2779]'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {isWishlisted ? '❤️ Wishlisted' : '🤍 Wishlist Product'}
            </button>
            <button
              id="details-add-cart-btn"
              onClick={() => {
                onAddToCart(product, currentShade);
                onClose();
              }}
              className="flex-2 bg-[#FC2779] hover:bg-[#E01E67] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag (₹{product.price})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
