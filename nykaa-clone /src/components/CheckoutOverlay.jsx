import React, { useState } from 'react';
import { X, MapPin, CreditCard, ShoppingBag, CheckCircle2, Ticket, Laptop } from 'lucide-react';

/**
 * CheckoutOverlay Component
 * A multi-step full checkout processor mock with shipping addresses, UPI details,
 * and beautiful successful order summaries.
 */
export default function CheckoutOverlay({
  isOpen,
  onClose,
  checkoutData,
  cartItems,
  onClearCart
}) {
  const [step, setStep] = useState(1); // 1: Shipping | 2: Payment | 3: Success
  const [shippingForm, setShippingForm] = useState({
    name: 'Jane Doe',
    mobile: '+91 9876543210',
    address: 'Flat 402, Highrise Heights, Bandra West',
    city: 'Mumbai',
    pincode: '400050',
    state: 'Maharashtra'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card'
  const [upiId, setUpiId] = useState('janedoe@okaxis');
  const [cardNumber, setCardNumber] = useState('4321 0987 6543 2109');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('123');

  const [formErrors, setFormErrors] = useState({});
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const validateShipping = () => {
    const errors = {};
    if (!shippingForm.name.trim()) errors.name = 'Full name is required';
    if (!shippingForm.mobile.trim()) errors.mobile = 'Mobile number is required';
    if (!shippingForm.address.trim()) errors.address = 'Street address is required';
    if (!shippingForm.city.trim()) errors.city = 'City name is required';
    if (!shippingForm.pincode.trim()) errors.pincode = 'Valid pincode is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateShipping()) {
        setStep(2);
      }
    } else if (step === 2) {
      // Create order success
      const randomOrderId = 'NYK-' + Math.floor(100000 + Math.random() * 900000) + '-2026';
      setOrderId(randomOrderId);
      setStep(3);
    }
  };

  const handleFinish = () => {
    onClearCart();
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        onClick={() => step !== 3 && onClose()} 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header container */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FC2779]" />
            <h3 className="text-base font-bold font-serif text-stone-800">
              {step === 3 ? 'Order Confirmed!' : `Security checkout - Step ${step} of 2`}
            </h3>
          </div>
          {step !== 3 && (
            <button
              id="close-checkout-modal-btn"
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress indicators */}
        {step !== 3 && (
          <div className="flex border-b border-stone-100 text-xs font-semibold">
            <button 
              className={`flex-1 py-3 text-center transition-colors ${step === 1 ? 'text-[#FC2779] bg-pink-50/40 border-b-2 border-[#FC2779]' : 'text-stone-500'}`}
              disabled={step === 2}
            >
              1. Delivery Address
            </button>
            <button 
              className={`flex-1 py-3 text-center transition-colors ${step === 2 ? 'text-[#FC2779] bg-pink-50/40 border-b-2 border-[#FC2779]' : 'text-stone-500'}`}
              disabled={step === 1}
            >
              2. Secured Payment
            </button>
          </div>
        )}

        {/* Form Body Context */}
        <div className="flex-1 overflow-y-auto p-6 text-left">
          {step === 1 && (
            <form onSubmit={handleNextStep} id="checkout-shipping-form" className="space-y-4">
              <h4 className="text-sm font-bold text-stone-800 flex items-center gap-1.5 mb-3.5">
                <MapPin className="w-4 h-4 text-[#FC2779]" /> Delivery Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Receiver Full Name</label>
                  <input
                    id="shipping-name"
                    type="text"
                    required
                    value={shippingForm.name}
                    onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:border-[#FC2779] outline-hidden"
                  />
                  {formErrors.name && <p className="text-[10px] text-red-500 font-medium mt-0.5">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Mobile Contact Phone</label>
                  <input
                    id="shipping-mobile"
                    type="tel"
                    required
                    value={shippingForm.mobile}
                    onChange={(e) => setShippingForm({ ...shippingForm, mobile: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:border-[#FC2779] outline-hidden"
                  />
                  {formErrors.mobile && <p className="text-[10px] text-red-500 font-medium mt-0.5">{formErrors.mobile}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Street Address / Block / Flat No.</label>
                <textarea
                  id="shipping-address"
                  required
                  rows="2"
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:border-[#FC2779] outline-hidden resize-none"
                ></textarea>
                {formErrors.address && <p className="text-[10px] text-red-500 font-medium mt-0.5">{formErrors.address}</p>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Town / City</label>
                  <input
                    id="shipping-city"
                    type="text"
                    required
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:border-[#FC2779] outline-hidden"
                  />
                  {formErrors.city && <p className="text-[10px] text-red-500 font-medium mt-0.5">{formErrors.city}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Postal Pincode</label>
                  <input
                    id="shipping-pincode"
                    type="text"
                    required
                    value={shippingForm.pincode}
                    onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:border-[#FC2779] outline-hidden"
                  />
                  {formErrors.pincode && <p className="text-[10px] text-red-500 font-medium mt-0.5">{formErrors.pincode}</p>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">State / Province</label>
                  <input
                    id="shipping-state"
                    type="text"
                    required
                    value={shippingForm.state}
                    onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:border-[#FC2779] outline-hidden"
                  />
                </div>
              </div>

              {/* Order total info sidebar look */}
              <div className="mt-6 bg-[#FC2779]/5 border border-[#FC2779]/15 p-4 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <p className="text-stone-500 font-medium font-sans">E-Commerce Total Sum</p>
                  <p className="text-stone-900 font-extrabold text-base">₹{checkoutData?.total}</p>
                </div>
                <button
                  id="shipping-continue-btn"
                  type="submit"
                  className="bg-[#FC2779] hover:bg-[#E01E67] text-white py-2.5 px-6 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  Confirm Address & Pay
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} id="checkout-payment-form" className="space-y-4">
              <h4 className="text-sm font-bold text-stone-800 flex items-center gap-1.5 mb-3.5">
                <CreditCard className="w-4 h-4 text-[#FC2779]" /> Settle Order Payment
              </h4>

              {/* Payment selector option list */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  id="pay-method-upi"
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 border rounded-xl flex flex-col items-center gap-1.5 transition-all text-xs cursor-pointer ${
                    paymentMethod === 'upi' ? 'border-[#FC2779] bg-[#FC2779]/5 font-bold' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-lg">⚡</span>
                  <span>UPI Payment (Instant)</span>
                </button>
                <button
                  id="pay-method-card"
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border rounded-xl flex flex-col items-center gap-1.5 transition-all text-xs cursor-pointer ${
                    paymentMethod === 'card' ? 'border-[#FC2779] bg-[#FC2779]/5 font-bold' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-lg">💳</span>
                  <span>Credit / Debit Card</span>
                </button>
              </div>

              {/* Dynamic form based on payment option */}
              <div className="bg-stone-50 p-4.5 rounded-2xl border border-stone-100 min-h-[140px]">
                {paymentMethod === 'upi' ? (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Enter UPI ID (e.g. GooglePay, PhonePe, Paytm)</p>
                    <input
                      id="upi-address-input"
                      type="text"
                      required
                      placeholder="username@bank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-850 focus:border-[#FC2779] outline-hidden font-mono"
                    />
                    <p className="text-[10px] text-stone-400">A payment prompt will populate inside your chosen mobile UPI app after order execution.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Card Number (Mock Security)</label>
                      <input
                        id="card-num-input"
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-850 focus:border-[#FC2779] outline-hidden font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Expiry Date</label>
                        <input
                          id="card-exp-input"
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-850 focus:border-[#FC2779] outline-hidden font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">CVV Pin</label>
                        <input
                          id="card-cvv-input"
                          type="password"
                          required
                          maxLength="3"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-850 focus:border-[#FC2779] outline-hidden font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order total detail bottom row */}
              <div className="mt-6 bg-[#FC2779]/5 border border-[#FC2779]/15 p-4 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <p className="text-stone-500">Order Pay Amount</p>
                  <p className="text-stone-900 font-extrabold text-base">₹{checkoutData?.total}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    id="payment-back-btn"
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 py-2.5 px-4 rounded-lg text-xs font-bold transition-all active:scale-95"
                  >
                    Back Address
                  </button>
                  <button
                    id="payment-pay-btn"
                    type="submit"
                    className="bg-stone-900 hover:bg-stone-950 text-white py-2.5 px-6 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
                  >
                    Authorize Payment (₹{checkoutData?.total})
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 px-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto shadow-inner animate-scale">
                <CheckCircle2 className="w-10 h-10 stroke-2" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-stone-800">Your Cosmetics Are On the Way!</h3>
                <p className="text-xs text-[#FC2779] font-bold">Order Reference: {orderId}</p>
                <p className="text-stone-400 text-xs text-center">
                  Thank you for placing order with Nykaa. A confirmation email has been dispatched to{' '}
                  <strong className="text-stone-700">atharvamac072006@gmail.com</strong>.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl text-left border border-stone-100/80 space-y-3.5 text-xs">
                <div className="border-b border-stone-200/50 pb-2 flex justify-between font-bold text-stone-700 text-[11px] uppercase tracking-wider">
                  <span>Shipment Address Summary</span>
                  <span className="text-green-700">Dispatch Pending</span>
                </div>
                <div className="space-y-1 text-stone-605">
                  <p><strong>Recipient:</strong> {shippingForm.name}</p>
                  <p><strong>Mobile:</strong> {shippingForm.mobile}</p>
                  <p><strong>Address:</strong> {shippingForm.address}, {shippingForm.city} - {shippingForm.pincode}</p>
                  <p><strong>Estimated Arrival:</strong> 2-3 Business Days (Expedited)</p>
                </div>

                {checkoutData?.hasGift && (
                  <div className="bg-pink-100/40 p-2 border border-pink-200 rounded-lg text-pink-700 font-bold flex items-center gap-1.5 text-[11px]">
                    🎁 <strong>Bonus Included:</strong> Free Luxury Skincare Starter Serum kit included at zero charge!
                  </div>
                )}
              </div>

              {/* Ordered items thumbnail scroll list */}
              <div className="space-y-1.5 text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Fabric bag content ({cartItems.length} items):</p>
                <div className="flex gap-2 pb-2 overflow-x-auto">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 border border-stone-100 p-1.5 bg-stone-50 rounded-lg shrink-0 w-44">
                      <img 
                        src={(item.shade && item.shade.img) ? item.shade.img : item.image} 
                        alt={item.name} 
                        className="w-10 h-10 object-cover rounded-md shrink-0 border border-stone-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 pr-1">
                        <p className="font-bold text-[10px] text-stone-800 truncate leading-tight">{item.name}</p>
                        <p className="text-[9px] text-[#FC2779]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-100 pt-5">
                <button
                  id="checkout-finish-btn"
                  onClick={handleFinish}
                  className="w-full bg-[#FC2779] hover:bg-[#E01E67] text-white py-3 rounded-full text-xs font-bold transition-all active:scale-95 shadow-md cursor-pointer"
                >
                  Continue Shopping & Reset Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
