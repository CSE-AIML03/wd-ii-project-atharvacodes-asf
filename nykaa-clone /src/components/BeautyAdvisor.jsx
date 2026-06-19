import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Info, User, Check, Heart, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data';

/**
 * BeautyAdvisor Component - Nykaa Virtual Beauty Concierge
 * Uses real store matching logic to recommend and explain products of interest.
 * Completely offline functional + highly responsive for beginners.
 */
export default function BeautyAdvisor({
  isOpen,
  onClose,
  onOpenProductDetails,
  onAddToCart
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'advisor',
      text: "Hello, Beauty Lover! 💅 I am your personal Nykaa Assistant. Are you looking in Makeup, Skincare, Haircare, or Fragrance today?",
      options: ['Matte Lipsticks', 'Acne & Sebum Serums', 'Damaged Hair Care', 'Luxe EDP Perfumes']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto scroll to latest advice message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Process and match messages to store database products
  const handleQuery = (queryText) => {
    if (!queryText.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate natural intelligence typing block delay
    setTimeout(() => {
      const normalized = queryText.toLowerCase();
      let responseText = '';
      let recommendedProduct = null;
      let nextChips = [];

      // Categorized matcher algorithm
      if (normalized.includes('lipstick') || normalized.includes('lip') || normalized.includes('matte')) {
        recommendedProduct = PRODUCTS.find(p => p.id === 1); // liquid lipstick
        responseText = `Oh! I absolutely adore Matte Lips! Our crowd favorite is the "Matte to Last!" by Nykaa Cosmetics. It stays transfer-proof for up to 12 hours and is charged with calming Jojoba Seed Oil. Check it out right below!`;
        nextChips = ['Foundation selection', 'Dewy settings spray', 'Browse Skincare'];
      } 
      else if (normalized.includes('serum') || normalized.includes('skin') || normalized.includes('niacinamide') || normalized.includes('acne') || normalized.includes('spot')) {
        recommendedProduct = PRODUCTS.find(p => p.id === 2); // niacinamide
        responseText = `For clear healthy skin, raw active ingredients are perfect. The Minimalist Niacinamide 10% Face Serum has a 4.8★ star rating. It controls oil and clarifies red acne spots within weeks. See details below!`;
        nextChips = ['Plumping cream', 'Exfoliating toners', 'Lips pigment Try-on'];
      }
      else if (normalized.includes('hair') || normalized.includes('masque') || normalized.includes('shampoo') || normalized.includes('split')) {
        recommendedProduct = PRODUCTS.find(p => p.id === 8); // Repair hair masque
        responseText = `Split-ends and dry lengths can be super annoying! For fast hydration boost, I highly recommend L\'Oreal Paris Total Repair 5 Hair Masque. Leave it on wet hair for just 5 minutes!`;
        nextChips = ['Luxe Perfumes', 'Moisturizers', 'Foundation base'];
      }
      else if (normalized.includes('perfume') || normalized.includes('fragrance') || normalized.includes('edp') || normalized.includes('mist')) {
        recommendedProduct = PRODUCTS.find(p => p.id === 7); // EDP perfume
        responseText = `A signature scent defines everything! "Moi" by Nykaa delivers stunning Eau De Parfum notes of fresh rose buds, sweet vanilla, and rich amber that stay vibrant all day!`;
        nextChips = ['Liquid Lipsticks', 'Skincare active drops', 'Setting sprays'];
      }
      else if (normalized.includes('foundation') || normalized.includes('base') || normalized.includes('skin beige') || normalized.includes('fit me')) {
        recommendedProduct = PRODUCTS.find(p => p.id === 3); // Fit me foundation
        responseText = `Our top base pick is the classic Maybelline Fit Me Matte + Poreless Foundation. Excellent oil absorption for hot weather, available in natural tone-adaptive shades on our virtual try-on!`;
        nextChips = ['Check Virtual Mirror', 'Glycolic Acids', 'Fragrances'];
      }
      else {
        responseText = `I hear you! Nykaa carries thousands of high-quality cosmetics. For general skincare, try serums or hyaluronic creams. For high-pigment options, check out our liquid lipsticks and foundations. What can I help you find?`;
        nextChips = ['Matte Lipsticks', 'Acne & Sebum Serums', 'Damaged Hair Care', 'Luxe EDP Perfumes'];
      }

      const replyMsg = {
        id: Date.now() + 1,
        sender: 'advisor',
        text: responseText,
        options: nextChips,
        product: recommendedProduct
      };

      setMessages((prev) => [...prev, replyMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay background */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Concierge main drawer layout */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="px-4 py-4.5 border-b border-stone-100 bg-[#FC2779] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              <div>
                <h3 className="text-sm font-bold font-serif leading-none">Nykaa Beauty Advisor</h3>
                <span className="text-[10px] text-pink-100 font-sans tracking-wider">AI Powered recommendation assistant</span>
              </div>
            </div>
            <button
              id="close-advisor-drawer-btn"
              onClick={onClose}
              className="text-white hover:opacity-85 p-1.5 focus:outline-hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversation stream panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/70">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-full`}
              >
                {/* Text Bubble */}
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] text-left ${
                  msg.sender === 'user'
                    ? 'bg-stone-900 text-stone-100 rounded-tr-none'
                    : 'bg-white text-stone-800 rounded-tl-none shadow-xs border border-stone-100'
                }`}>
                  {msg.sender === 'advisor' && (
                    <p className="text-[9px] font-bold text-[#FC2779] mb-1 uppercase tracking-wide flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FC2779]" /> Nykaa Concierge Specialist
                    </p>
                  )}
                  <p>{msg.text}</p>
                </div>

                {/* Optional Recommended Product Widget */}
                {msg.product && (
                  <div className="mt-3 bg-white border border-stone-100 p-3.5 rounded-2xl shadow-xs max-w-[85%] text-left flex items-start gap-3 animate-in fade-in duration-300">
                    <img 
                      src={msg.product.image} 
                      alt={msg.product.name} 
                      className="w-16 h-16 object-cover rounded-lg shrink-0 border border-stone-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{msg.product.brand}</span>
                      <h4 className="text-xs font-bold text-stone-850 truncate leading-snug mt-0.5">{msg.product.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5 mb-1.5">
                        <span className="text-xs font-bold text-stone-900">₹{msg.product.price}</span>
                        {msg.product.discount > 0 && (
                          <span className="text-[9.5px] text-green-700 bg-green-50 px-1 py-0.2 rounded-sm font-semibold">{msg.product.discount}% OFF</span>
                        )}
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            onOpenProductDetails(msg.product);
                          }}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-bold py-1 px-2.5 rounded-md"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            onAddToCart(msg.product, null);
                          }}
                          className="bg-[#FC2779] hover:bg-[#E01E67] text-white text-[10px] font-bold py-1 px-2.5 rounded-md flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" /> Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Option Suggestion Chips */}
                {msg.sender === 'advisor' && msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuery(opt)}
                        className="bg-white hover:bg-pink-50 border border-stone-200 hover:border-pink-300 text-stone-600 hover:text-[#FC2779] transition-all text-[11px] font-semibold tracking-wide py-1.5 px-3 rounded-full cursor-pointer shadow-xs select-none"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-stone-400 p-3.5 rounded-2xl rounded-tl-none border border-stone-100 text-xs italic flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#FC2779] rounded-full animate-bounce"></span>
                  <span className="inline-block w-1.5 h-1.5 bg-[#FC2779] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="inline-block w-1.5 h-1.5 bg-[#FC2779] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span>Beauty consultant matching cosmetics catalog...</span>
                </div>
              </div>
            )}
            
            <div ref={scrollRef}></div>
          </div>

          {/* Quick Disclaimer */}
          <div className="px-4 py-1 pb-1.5 text-[10px] bg-amber-50 text-amber-800 border-t border-amber-100 flex items-center gap-1 select-none leading-normal">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Chat recommendations are based entirely on genuine Nykaa beauty metrics.</span>
          </div>

          {/* Message Input section */}
          <div className="p-3 border-t border-stone-100 bg-white">
            <div className="flex gap-2">
              <input
                id="advisor-msg-input"
                type="text"
                placeholder="Ask e.g. 'find a good sunscreen' or 'matte lipsticks'"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuery(inputText)}
                className="flex-1 bg-stone-50 border border-stone-200 focus:border-[#FC2779] focus:bg-white text-xs rounded-xl px-3.5 py-3 outline-hidden text-stone-850"
              />
              <button
                id="advisor-send-btn"
                onClick={() => handleQuery(inputText)}
                className="bg-[#FC2779] hover:bg-[#E01E67] text-white p-3 rounded-xl transition-all cursor-pointer active:scale-95 flex items-center justify-center"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
