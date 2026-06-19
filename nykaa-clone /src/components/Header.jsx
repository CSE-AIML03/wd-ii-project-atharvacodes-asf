import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Sparkles, Menu, X, ArrowRight, CornerDownRight } from 'lucide-react';
import { CATEGORIES } from '../data';

/**
 * Header Component for Nykaa UI Clone
 * Designed with the signature Nykaa Pink (#FC2779) theme,
 * includes responsive search filtering, wishlist trigger, and e-commerce shopping bag triggers.
 */
export default function Header({
  searchTerm,
  setSearchTerm,
  wishlistCount,
  cartItemsCount,
  setCartOpen,
  activeCategory,
  setActiveCategory,
  onOpenAdvisor
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* Promotion banner bar */}
      <div className="bg-[#1C1C1C] text-stone-100 text-[11px] font-medium tracking-wide py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-1.5 justify-center">
            <span className="inline-block bg-[#FC2779] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">OFFER</span>
            <span>Pink Friday Sneak Peek: Grab up to 50% Off and free skincare minikit!</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-stone-300">
            <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              <Sparkles className="w-3 w-3 text-[#FC2779]" /> Free Shipping & Easy Returns
            </span>
            <span className="hidden sm:inline border-l border-stone-700 pl-4">100% Authentic Brands</span>
          </div>
        </div>
      </div>

      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo and Mobile controls */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-stone-700 hover:text-[#FC2779] p-1 rounded-sm focus:outline-hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <h1 
            id="app-heading-logo"
            onClick={() => setActiveCategory('all')}
            className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-[#FC2779] cursor-pointer select-none hover:opacity-90 active:scale-95 transition-all"
          >
            nykaa<span className="text-stone-900 font-sans font-light text-base tracking-wider ml-1">beauty</span>
          </h1>
        </div>

        {/* Categories Mega Dropdown & Quick Advice - Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700">
          <div 
            className="relative"
            onMouseEnter={() => setShowCategoryDropdown(true)}
            onMouseLeave={() => setShowCategoryDropdown(false)}
          >
            <button className={`flex items-center gap-1 hover:text-[#FC2779] h-10 transition-colors ${activeCategory !== 'all' ? 'text-[#FC2779]' : ''}`}>
              Categories
              <CornerDownRight className="w-3.5 h-3.5 transform rotate-90" />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute top-10 left-0 bg-white border border-stone-100 shadow-xl rounded-lg py-3 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    id={`desktop-cat-btn-${cat.id}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-pink-50 transition-colors flex items-center justify-between ${
                      activeCategory === cat.id ? 'text-[#FC2779] font-semibold bg-pink-50/50' : 'text-stone-700'
                    }`}
                  >
                    <span>{cat.icon || '🛍️'} {cat.name}</span>
                    <span className="text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-sm">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            id="beauty-advice-btn"
            onClick={onOpenAdvisor}
            className="flex items-center gap-1.5 text-stone-600 hover:text-[#FC2779] transition-colors cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#FC2779] group-hover:scale-125 transition-transform" />
            Beauty Advisor
          </button>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="desktop-search-input"
            type="text"
            placeholder="Search on Nykaa, brands, luxury beauty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 hover:border-stone-300 focus:border-[#FC2779] focus:bg-white text-sm rounded-full pl-9 pr-4 py-2 outline-hidden transition-all text-stone-800 placeholder-stone-400 focus:ring-1 focus:ring-pink-200"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute inset-y-0 right-3 flex items-center text-stone-400 hover:text-stone-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Actions buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            id="beauty-advice-btn-mobile"
            onClick={onOpenAdvisor}
            className="sm:hidden p-2 text-stone-600 hover:text-[#FC2779] transition-colors relative"
            title="Beauty Advisor"
          >
            <Sparkles className="w-5 h-5 text-[#FC2779]" />
          </button>

          <button
            id="wishlist-header-btn"
            className="p-2 text-stone-600 hover:text-[#FC2779] hover:bg-stone-50 rounded-full transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#FC2779] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            id="cart-header-btn"
            onClick={() => setCartOpen(true)}
            className="p-2 text-stone-600 hover:text-[#FC2779] hover:bg-stone-50 rounded-full transition-colors relative"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-1 right-1 bg-stone-900 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-scale duration-150">
                {cartItemsCount}
              </span>
            )}
          </button>

          <div className="h-8 w-[1px] bg-stone-200 hidden sm:block"></div>

          <div className="hidden sm:flex items-center gap-2 pl-1 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
              U
            </div>
            <div className="text-left">
              <p className="text-[10px] text-stone-400 leading-none">Hello, Guest</p>
              <p className="text-xs font-semibold text-stone-700 group-hover:text-[#FC2779] transition-colors">Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-search for mobile only */}
      <div className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="mobile-search-input"
            type="text"
            placeholder="Search from 1000+ top beauty cosmetics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-100 border border-transparent focus:border-[#FC2779] focus:bg-white text-xs rounded-full pl-9 pr-4 py-2 outline-hidden transition-all text-stone-800"
          />
        </div>
      </div>

      {/* Mobile Sidebar Slide-out Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay background */}
          <div 
            onClick={() => setMobileMenuOpen(false)} 
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
          ></div>
          
          {/* Sidebar content */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-[#FC2779] text-white">
              <h2 className="text-lg font-bold font-serif">nykaa menu</h2>
              <button 
                id="close-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(false)} 
                className="text-white hover:opacity-80 focus:outline-hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-stone-50 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FC2779]/10 text-[#FC2779] flex items-center justify-center font-bold">
                  G
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 text-sm">Guest Beauty Lover</h3>
                  <p className="text-xs text-stone-400">Log in to view coupons</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-2">Shop Categories</p>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      id={`mobile-cat-btn-${cat.id}`}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors flex items-center justify-between ${
                        activeCategory === cat.id ? 'bg-[#FC2779]/10 text-[#FC2779] font-medium' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon || '🛍️'}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-xs text-stone-400">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-100 pt-4">
                <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-2">Our Features</p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onOpenAdvisor();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-stone-700 hover:text-[#FC2779] py-1.5 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FC2779]" />
                      Beauty Advisor Bot
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
                  
                  <div className="bg-pink-50 p-3 rounded-md text-xs text-[#FC2779] border-l-4 border-[#FC2779]">
                    <p className="font-bold">Exclusive Code Available!</p>
                    <p className="text-stone-600 mt-0.5">Use <strong className="text-[#FC2779] uppercase">NYKAA20</strong> in checkout for a flat 20% mock reduction!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-100 text-center text-[10px] text-stone-400 bg-stone-50">
              <p>© 2026 Nykaa Clone SPA Application</p>
              <p className="mt-0.5 font-mono text-[9px]">UTC: 2026-06-19T10:00:06-07:00</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
