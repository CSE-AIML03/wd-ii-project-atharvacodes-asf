import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ReceiptText, ShieldCheck, Ticket } from 'lucide-react';

/**
 * ShoppingBagDrawer Component
 * Slides out to review products in the bag, manage quantities, apply mock coupon codes,
 * and track order pricing limits.
 */
export default function ShoppingBagDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Pricing calculations
  const totalItemsPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((totalItemsPrice * discountPercent) / 100);
  
  // Free delivery threshold is ₹500
  const isFreeDelivery = totalItemsPrice >= 500;
  const deliveryCharge = totalItemsPrice === 0 ? 0 : (isFreeDelivery ? 0 : 70);

  // Government taxes (flat mock ₹49 or 5% of order)
  const taxAmount = totalItemsPrice === 0 ? 0 : Math.round((totalItemsPrice - discountAmount) * 0.05);
  const finalPayable = totalItemsPrice - discountAmount + deliveryCharge + taxAmount;

  const freeGiftThreshold = 999;
  const qualifiesForGift = totalItemsPrice >= freeGiftThreshold;
  const remainingForGift = freeGiftThreshold - totalItemsPrice;

  // Coupon validator solver
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    const formattedCode = couponCode.trim().toUpperCase();
    if (formattedCode === 'NYKAA20') {
      setDiscountPercent(20);
      setCouponSuccess('Flat 20% Mock discount applied successfully!');
    } else if (formattedCode === 'FREESHIP') {
      setDiscountPercent(10);
      setCouponSuccess('Promo applied! 10% discount and priority shipping.');
    } else if (!formattedCode) {
      setCouponError('Please type a coupon code first.');
    } else {
      setCouponError('Invalid coupon. Try "NYKAA20" or "FREESHIP"!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background Overlay */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      {/* Drawer Panel Sliding layout */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="px-4 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold font-serif text-stone-800">Shopping Bag</span>
              <span className="bg-[#FC2779] text-white text-xs font-bold px-2 py-0.5 rounded-full select-none">
                {cartItems.length}
              </span>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="text-stone-500 hover:text-[#FC2779] p-1.5 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items listing */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            
            {/* Gift Progression Tracker */}
            {cartItems.length > 0 && (
              <div className="bg-pink-50/50 border border-pink-100 p-3 rounded-xl text-xs text-left">
                {qualifiesForGift ? (
                  <p className="text-green-700 font-bold flex items-center gap-1.5">
                    🎉 Yay! You qualified for a Free Luxury Skincare Mini-Kit with your order!
                  </p>
                ) : (
                  <div>
                    <p className="text-[#FC2779] font-medium mb-1">
                      Add <strong>₹{remainingForGift}</strong> more to win a Free Skincare Mini-Kit!
                    </p>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#FC2779] h-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (totalItemsPrice / freeGiftThreshold) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-3xl animate-pulse">
                  🛍️
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-800">Your bag is currently empty!</h3>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs">
                    Fill it with top brand cosmetics, skincare essentials, and amazing discounts.
                  </p>
                </div>
                <button
                  id="cart-continue-shopping-btn"
                  onClick={onClose}
                  className="bg-[#FC2779] hover:bg-[#E01E67] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  Start Adding Beauty Products
                </button>
              </div>
            ) : (
              <div className="space-y-4.5">
                {cartItems.map((item, index) => {
                  const itemPriceTotal = item.price * item.quantity;
                  return (
                    <div
                      key={`${item.id}-${item.shade?.name || 'none'}`}
                      id={`cart-item-row-${index}`}
                      className="flex items-center gap-3 bg-white border border-stone-100/80 p-3 rounded-xl hover:shadow-xs transition-shadow"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={(item.shade && item.shade.img) ? item.shade.img : item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-stone-100 shrink-0 select-none"
                        referrerPolicy="no-referrer"
                      />

                      {/* Product Content info */}
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider leading-none">
                          {item.brand}
                        </p>
                        <h4 className="text-xs font-bold text-stone-800 truncate mt-0.5" title={item.name}>
                          {item.name}
                        </h4>
                        
                        {item.shade && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-2.5 h-2.5 rounded-full border border-stone-200" style={{ backgroundColor: item.shade.hex }}></span>
                            <span className="text-[10px] text-stone-500 font-medium">Shade: {item.shade.name}</span>
                          </div>
                        )}

                        {/* Pricing details */}
                        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                          <span className="text-xs font-bold text-stone-900">
                            ₹{item.price} <span className="text-[10px] text-stone-400 font-light">each</span>
                          </span>
                          
                          {/* Quantity selector */}
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50 shrink-0">
                            <button
                              id={`qty-minus-${index}`}
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onUpdateQuantity(item.id, item.shade, item.quantity - 1);
                                } else {
                                  onRemoveItem(item.id, item.shade);
                                }
                              }}
                              className="p-1 text-stone-500 hover:bg-stone-100 hover:text-[#FC2779] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                            <button
                              id={`qty-plus-${index}`}
                              onClick={() => {
                                onUpdateQuantity(item.id, item.shade, item.quantity + 1);
                              }}
                              className="p-1 text-stone-500 hover:bg-stone-100 hover:text-[#FC2779] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Trash action button */}
                      <button
                        id={`cart-remove-btn-${index}`}
                        onClick={() => onRemoveItem(item.id, item.shade)}
                        className="text-stone-300 hover:text-red-500 p-1.5 rounded-md transition-colors cursor-pointer self-start"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pricing calculations footer & coupon overlay */}
          {cartItems.length > 0 && (
            <div className="border-t border-stone-100 px-4 py-4 space-y-4 bg-stone-50">
              
              {/* Coupon form block */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="coupon-input"
                    type="text"
                    placeholder="Apply Coupon (Try NYKAA20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-white border border-stone-200 text-xs rounded-lg pl-8 pr-2 py-2 outline-hidden uppercase tracking-wider text-stone-850 placeholder-stone-400 focus:border-[#FC2779]"
                  />
                </div>
                <button
                  id="coupon-apply-btn"
                  type="submit"
                  className="bg-[#FC2779] hover:bg-[#E01E67] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Apply
                </button>
              </form>
              
              {couponError && <p className="text-[10px] text-red-500 font-medium text-left mt-0.5">{couponError}</p>}
              {couponSuccess && <p className="text-[10px] text-green-700 font-bold text-left mt-0.5">🎉 {couponSuccess}</p>}

              {/* Price Breakdown Details */}
              <div className="space-y-1.5 text-xs text-stone-500 text-left">
                <div className="flex justify-between">
                  <span>Bag Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-stone-800">₹{totalItemsPrice}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Coupon Code Discount ({discountPercent}%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping Charge</span>
                  <span>{deliveryCharge === 0 ? <strong className="text-green-700">FREE</strong> : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Calculated GST Taxes</span>
                  <span>₹{taxAmount}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-extrabold text-sm border-t border-stone-200/80 pt-2.5">
                  <span className="flex items-center gap-1">
                    <ReceiptText className="w-4 h-4 text-[#FC2779]" /> Grand Payable
                  </span>
                  <span>₹{finalPayable}</span>
                </div>
              </div>

              {/* Security info disclaimer */}
              <div className="flex items-center gap-1.5 justify-center py-1 text-[10px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>Secure SSL checkout by Nykaa Payments protocol.</span>
              </div>

              {/* Proceed Action Button */}
              <button
                id="cart-checkout-proceed-btn"
                onClick={() => {
                  onProceedToCheckout({
                    subtotal: totalItemsPrice,
                    discount: discountAmount,
                    shipping: deliveryCharge,
                    taxes: taxAmount,
                    total: finalPayable,
                    hasGift: qualifiesForGift
                  });
                }}
                className="w-full bg-stone-900 hover:bg-stone-950 text-white py-3 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 tracking-wide flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
