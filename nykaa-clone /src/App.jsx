import React, { useState, useMemo, useEffect } from 'react';
import { 
  CATEGORIES, 
  BRANDS, 
  PRODUCTS, 
  TUTORIALS, 
  FAQS 
} from './data';

import Header from './components/Header';
import OffersSlider from './components/OffersSlider';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import ShoppingBagDrawer from './components/ShoppingBagDrawer';
import CheckoutOverlay from './components/CheckoutOverlay';
import TryOnSimulator from './components/TryOnSimulator';
import BeautyAdvisor from './components/BeautyAdvisor';

import { 
  Filter, 
  Grid, 
  SlidersHorizontal, 
  Heart, 
  ChevronDown, 
  BadgeHelp, 
  FileText, 
  Award, 
  Play,
  Sparkles,
  Info
} from 'lucide-react';

/**
 * App - Main Container Component for Nykaa UI Clone
 * Employs a stunning, state-centric, fully e-commerce-functional client SPA.
 */
export default function App() {
  // Navigation & General Filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState('best-sellers'); // 'best-sellers' | 'price-low' | 'price-high' | 'rating'

  // Shopping Bag & Wishlist state
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Modal / Drawer visibility controls
  const [cartOpen, setCartOpen] = useState(false);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Accordion active index for FAQs
  const [faqIndex, setFaqIndex] = useState(null);

  // Dynamic filter lists
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category check
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Brand check
    if (selectedBrand !== 'All Brands') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // 3. Search query match
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) || 
        (p.tag && p.tag.toLowerCase().includes(query))
      );
    }

    // 4. Sort calculations
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } // default is best-sellers (original index state)

    return result;
  }, [searchTerm, activeCategory, selectedBrand, sortBy]);

  // Wishlist toggle handler
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const alreadyHas = prev.some(item => item.id === product.id);
      if (alreadyHas) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Add Item to Bag Cart
  const handleAddToCart = (product, shade) => {
    setCart((prev) => {
      // Find matching index of exact product AND selected makeup shade
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        (shade ? item.shade?.name === shade.name : !item.shade)
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        return [...prev, { ...product, shade, quantity: 1 }];
      }
    });
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (productId, shade, newQuantity) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(item => 
        item.id === productId && 
        (shade ? item.shade?.name === shade.name : !item.shade)
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity = newQuantity;
        return copy;
      }
      return prev;
    });
  };

  // Remove Item from Bag Cart
  const handleRemoveItem = (productId, shade) => {
    setCart((prev) => 
      prev.filter(item => !(item.id === productId && (shade ? item.shade?.name === shade.name : !item.shade)))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = (calcSummary) => {
    setCheckoutData(calcSummary);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // Quick category tags counts
  const categorySummaryCount = useMemo(() => {
    const counts = { all: PRODUCTS.length, makeup: 0, skin: 0, hair: 0, fragrance: 0 };
    PRODUCTS.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans text-stone-800 antialiased selection:bg-pink-100 selection:text-[#FC2779]">
      
      {/* Top sticky header / Navigation menu system */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        wishlistCount={wishlist.length}
        cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        setCartOpen={setCartOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenAdvisor={() => setAdvisorOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        
        {/* Dynamic banner slides on home filter view */}
        {activeCategory === 'all' && !searchTerm && (
          <OffersSlider onCategorySelect={(catId) => setActiveCategory(catId)} />
        )}

        {/* Categories Quick Filter Tags Row */}
        <section className="mb-6">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest text-left mb-3">
            Shop Best Sellers by category
          </p>
          <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`quick-cat-btn-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#FC2779] border-transparent text-white shadow-md shadow-pink-100 scale-102 font-bold'
                      : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'
                  }`}
                >
                  <span>{cat.icon || '🛍️'}</span>
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {categorySummaryCount[cat.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Catalog Control row (Brand filter & Sorting filters) */}
        <section id="catalog-controls-container" className="bg-white border border-stone-100 p-4 rounded-2xl mb-6 shadow-xs flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-left">
          
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Brands Filter combo */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-400" />
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Brand</span>
              <div className="relative">
                <select
                  id="brand-filter-select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-stone-50 border border-stone-200 text-xs font-medium rounded-lg px-2.5 py-1.5 outline-hidden pr-8 appearance-none text-stone-850 cursor-pointer"
                >
                  {BRANDS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Total items found tag */}
            <div className="h-6 w-[1.5px] bg-stone-100 hidden sm:block"></div>
            <p className="text-xs font-medium text-stone-400">
              Found <strong className="text-stone-800">{filteredProducts.length}</strong> luxurious cosmetic matches
            </p>
          </div>

          {/* Sort selection drop dropdown */}
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-start border-t border-stone-50 md:border-t-0 pt-3 md:pt-0">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" /> Sort by
            </span>
            <div className="relative">
              <select
                id="sort-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 outline-hidden pr-8 appearance-none text-stone-850 cursor-pointer"
              >
                <option value="best-sellers">Nykaa Hot Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">User Rating: Star High</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Main interactive Product Grid content */}
        <section className="mb-10 text-left">
          
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-stone-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="text-4xl">💄</div>
              <div>
                <p className="text-base font-extrabold text-stone-800">No Beauty Products Match Your Query!</p>
                <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                  Try adjusting the brand dropdown filters, clearing your search query, or selecting different categories from our pink top header menu!
                </p>
              </div>
              <button
                id="reset-catalog-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBrand('All Brands');
                  setActiveCategory('all');
                }}
                className="bg-stone-900 text-white rounded-full px-5 py-2 text-xs font-bold transition-all active:scale-95"
              >
                Reset Filter Queries
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={(prod, shade) => {
                    handleAddToCart(prod, shade);
                    setCartOpen(true);
                  }}
                  onOpenQuickView={(prod) => setSelectedProduct(prod)}
                  isWishlisted={wishlist.some(item => item.id === p.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}
        </section>

        {/* Interactive Try-On Simulator Section (Fascinating customer touchpoint) */}
        <section id="tryon-mirror-section" className="mb-10">
          <TryOnSimulator />
        </section>

        {/* Tutorials / Beauty advice video grids */}
        <section className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 mb-10 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none text-9xl">✨</div>
          
          <div className="mb-6">
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest block mb-1">LEARN FROM INFLUENCERS</span>
            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
              Nykaa Beauty Advice <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
            </h2>
            <p className="text-xs text-stone-300 font-light mt-1">
              Explore step-by-step masterclasses to transform your cosmetics, skincare layers, and hair moisture locks!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TUTORIALS.map((tut) => (
              <div 
                key={tut.id} 
                className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider mb-2.5">
                    <span className="text-pink-400 bg-pink-900/40 px-2 py-0.5 rounded-full">{tut.category}</span>
                    <span className="text-stone-400">⏱️ {tut.duration} mins</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{tut.title}</h3>
                  <p className="text-xs text-stone-300 font-light line-clamp-3 mb-4 leading-relaxed">{tut.summary}</p>
                </div>
                
                <div className="border-t border-white/10 pt-3 mt-auto flex items-center justify-between">
                  <p className="text-[11px] text-stone-300">By <strong>{tut.author}</strong></p>
                  <button 
                    onClick={() => {
                      // Anchor scroll smooth to the try-on tool
                      const element = document.getElementById('tryon-mirror-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-pink-400 hover:text-pink-300 text-xs font-bold flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Try Color shades</span>
                    <Play className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Accordion Block */}
        <section className="max-w-3xl mx-auto mb-10 text-left">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1">HAVE QUESTIONS?</span>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif flex items-center justify-center gap-1.5">
              General Support & Guidelines <BadgeHelp className="w-5 h-5 text-[#FC2779]" />
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const belongs = faqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <button
                    id={`faq-btn-${idx}`}
                    onClick={() => setFaqIndex(belongs ? null : idx)}
                    className="w-full text-left p-4 flex justify-between items-center font-semibold text-xs sm:text-sm text-stone-800 hover:text-[#FC2779] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-stone-400 transform transition-transform duration-200 ${belongs ? 'rotate-180 text-[#FC2779]' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {belongs && (
                    <div className="px-4 pb-4.5 text-xs text-stone-500 leading-relaxed font-light border-t border-stone-50 pt-2 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer Branding Area */}
      <footer className="bg-[#1C1C1C] border-t border-stone-800 text-stone-400 py-10 px-4 mt-auto text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          <div className="space-y-3 md:col-span-1">
            <h3 className="text-lg font-serif font-extrabold text-white">nykaa<span className="text-[#FC2779]">beauty</span></h3>
            <p className="text-[11px] leading-relaxed font-light text-stone-400">
              Designed as a high-fidelity SPA cosmetic online store clone in beginner-friendly React components styled through utility Tailwind classes.
            </p>
            <div className="flex gap-2 text-stone-300">
              <span className="bg-stone-800 px-2 py-1 rounded-sm text-[10px] font-mono">UTC: 2026-06-19</span>
              <span className="bg-stone-800 px-2 py-1 rounded-sm text-[10px] font-mono">React v19.0.1</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">Our Channels</p>
            <ul className="space-y-1.5 text-[11px] font-light">
              <li className="hover:text-[#FC2779] cursor-pointer transition-colors">Makeup Finder Tool</li>
              <li className="hover:text-[#FC2779] cursor-pointer transition-colors">Skincare Skin Advisor</li>
              <li className="hover:text-[#FC2779] cursor-pointer transition-colors">Virtual Cosmetics Lab</li>
              <li className="hover:text-[#FC2779] cursor-pointer transition-colors font-semibold text-[#FC2779]">Interactive Lipstick Simulator</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">Security Promise</p>
            <ul className="space-y-1.5 text-[11px] font-light">
              <li className="hover:text-[#FC2779] cursor-pointer transition-colors">100% Authentic certificate</li>
              <li className="hover:text-[#FC2779] cursor-pointer transition-colors">Direct Sourced Logistics</li>
              <li className="hover:text-[#FC2779] cursor-pointer transition-colors">No Synthetic Parabens</li>
              <li className="hover:text-[#FC2779] cursor-pointer transition-colors">Secure Payment Processing</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">Mock Active Coupon Code</p>
            <div className="bg-stone-800 p-3.5 rounded-xl border border-stone-700/60 text-stone-300 text-[11px]">
              <p>Type coupon <strong className="text-white selection:bg-[#FC2779] font-mono border-b border-dashed border-pink-400">NYKAA20</strong> inside cart block to instantly trigger a flat **20% e-commerce discount**!</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-stone-800 pt-6 text-center text-[10px] text-stone-500 font-light flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© 2026 Nykaa Clone application development workshop. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Security Protocol</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Use</span>
            <span className="hover:text-stone-300 cursor-pointer">Interactive Lab APIs</span>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer Side overlay */}
      <ShoppingBagDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Screen Overlay */}
      <CheckoutOverlay
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        checkoutData={checkoutData}
        cartItems={cart}
        onClearCart={handleClearCart}
      />

      {/* Product Quick View Detailed Modal POPUP */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(prod, shade) => {
            handleAddToCart(prod, shade);
            setCartOpen(true);
          }}
          isWishlisted={wishlist.some(item => item.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Intelligent Beauty Advisor Drawer Chatbot */}
      <BeautyAdvisor
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        onOpenProductDetails={(prod) => {
          setSelectedProduct(prod);
          setAdvisorOpen(false);
        }}
        onAddToCart={(prod, shade) => {
          handleAddToCart(prod, shade);
          setCartOpen(true);
        }}
      />

    </div>
  );
}
