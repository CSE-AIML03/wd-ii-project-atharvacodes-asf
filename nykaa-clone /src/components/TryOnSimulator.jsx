import React, { useState } from 'react';
import { Eye, Check, RefreshCw, Sparkles, Sliders } from 'lucide-react';

/**
 * TryOnSimulator Component - Virtual Cosmetics Try-On
 * A tactile playground demonstrating color theory and React state.
 * Allows choosing model skin tones, makeup categories (Lipstick, Blush, Eye Shadow),
 * picking shades, and adjusting the blending opacity in real time.
 */
export default function TryOnSimulator() {
  const [skinType, setSkinType] = useState('fair'); // 'fair' | 'medium' | 'deep'
  const [makeupType, setMakeupType] = useState('lipstick'); // 'lipstick' | 'blush' | 'eyeshadow'
  const [selectedColor, setSelectedColor] = useState('#B80029'); // ruby valentine
  const [intensity, setIntensity] = useState(70); // % opacity
  const [isBlinking, setIsBlinking] = useState(false);

  // Skin backgrounds
  const skinColors = {
    fair: 'bg-[#FFDFD3]',
    medium: 'bg-[#F0C0A0]',
    deep: 'bg-[#C08560]'
  };

  const makeupOptions = {
    lipstick: [
      { name: 'Ruby Valentine', hex: '#B80029', description: 'Deep iconic ruby red' },
      { name: 'Bombshell Pink', hex: '#E25B81', description: 'Cute playful bubblegum pink' },
      { name: 'Velvet Nude', hex: '#A86B61', description: 'Earth-tone warm daily wear' },
      { name: 'Berry Burgundy', hex: '#58111A', description: 'Elegant dark sophisticated wine' },
      { name: 'Sunset Peach', hex: '#E07A5F', description: 'Vibrant cheerful coral tint' }
    ],
    blush: [
      { name: 'Peachy Rose', hex: '#F08080', description: 'Sunkissed delicate peach highlight' },
      { name: 'Plum Flush', hex: '#BA55D3', description: 'Rich bold editorial magenta blush' },
      { name: 'Pink Coral', hex: '#FF7F50', description: 'Juicy summer high-heat glow' },
      { name: 'Soft Mallow', hex: '#DB7093', description: 'Subtle daily healthy natural blood flow' }
    ],
    eyeshadow: [
      { name: 'Golden Apricot', hex: '#DAA520', description: 'Slick metallic warm amber sheen' },
      { name: 'Rose Quartz', hex: '#CD5C5C', description: 'Romantic dusty quartz matte lid' },
      { name: 'Midnight Violet', hex: '#4B0082', description: 'Dramatic smokey royal indigo highlight' },
      { name: 'Emerald Forest', hex: '#2E8B57', description: 'Lustrous deep woodland green eye finish' }
    ]
  };

  const handleReset = () => {
    setSelectedColor(makeupType === 'lipstick' ? '#B80029' : (makeupType === 'blush' ? '#F08080' : '#DAA520'));
    setIntensity(70);
  };

  // Trigger brief simulation blink
  const triggerBlink = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 300);
  };

  return (
    <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm text-left max-w-4xl mx-auto mb-10">
      
      {/* Title */}
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-[#FC2779] text-white p-1 rounded-sm">
          <Eye className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold font-serif text-stone-900">Nykaa Interactive Mirror</h2>
        <span className="bg-pink-100 text-[#FC2779] text-[9px] font-bold px-2 py-0.5 rounded-full select-none">
          VIRTUAL TRY-ON
        </span>
      </div>
      <p className="text-xs text-stone-500 font-light mb-6">
        Select skin undertones, toggle cosmetic items, and customize shades using standard React state rendering pipelines!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Visual Simulated Mirror Canvas (Left 5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center">
          
          {/* Portrait frame */}
          <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-3xl overflow-hidden border-4 border-stone-100 bg-stone-50 shadow-inner flex flex-col items-center justify-center transition-all">
            
            {/* Skin base color */}
            <div className={`absolute inset-0 transition-colors duration-500 ${skinColors[skinType]} flex flex-col items-center justify-center`}>
              
              {/* Minimalistic Face details generated purely through Tailwind and custom markup layers */}
              <div className="relative w-40 h-48 flex flex-col items-center justify-center">
                
                {/* Simulated Hair crown */}
                <div className="absolute top-1 w-36 h-20 bg-stone-900 rounded-b-full rounded-t-lg z-0 opacity-95"></div>

                {/* Eyebrows matching standard contours */}
                <div className="absolute top-12 left-6 w-10 h-1.5 bg-stone-800 rounded-full transform -rotate-6 z-10"></div>
                <div className="absolute top-12 right-6 w-10 h-1.5 bg-stone-800 rounded-full transform rotate-6 z-10"></div>

                {/* Eyes containing dynamic blink effect */}
                <div className="absolute top-15 left-8 flex flex-col items-center z-10">
                  <div className={`w-6 bg-stone-900 rounded-full transition-all duration-150 ${isBlinking ? 'h-0.5 mt-2' : 'h-3.5'}`}>
                    {/* Iris pupil shine highlight */}
                    {!isBlinking && <span className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>}
                  </div>
                </div>
                <div className="absolute top-15 right-8 flex flex-col items-center z-10">
                  <div className={`w-6 bg-stone-900 rounded-full transition-all duration-150 ${isBlinking ? 'h-0.5 mt-2' : 'h-3.5'}`}>
                    {!isBlinking && <span className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>}
                  </div>
                </div>

                {/* EYE SHADOW OVERLAY LAYER (Dynamic shader top lids) */}
                <div 
                  className="absolute top-14 left-7 w-7 h-2.5 rounded-full transition-all duration-300 blur-[2px] z-20 pointer-events-none"
                  style={{ 
                    backgroundColor: makeupType === 'eyeshadow' ? selectedColor : 'transparent',
                    opacity: makeupType === 'eyeshadow' ? (intensity / 100) : 0,
                    transform: 'scaleY(1.3)' 
                  }}
                ></div>
                <div 
                  className="absolute top-14 right-7 w-7 h-2.5 rounded-full transition-all duration-300 blur-[2px] z-20 pointer-events-none"
                  style={{ 
                    backgroundColor: makeupType === 'eyeshadow' ? selectedColor : 'transparent',
                    opacity: makeupType === 'eyeshadow' ? (intensity / 100) : 0,
                    transform: 'scaleY(1.3)' 
                  }}
                ></div>

                {/* Blush cheeks highlight circles */}
                <div 
                  className="absolute top-22 left-4 w-12 h-10 rounded-full blur-[7px] transition-all duration-300 pointer-events-none z-10"
                  style={{
                    backgroundColor: makeupType === 'blush' ? selectedColor : 'transparent',
                    opacity: makeupType === 'blush' ? (intensity / 120) : 0
                  }}
                ></div>
                <div 
                  className="absolute top-22 right-4 w-12 h-10 rounded-full blur-[7px] transition-all duration-300 pointer-events-none z-10"
                  style={{
                    backgroundColor: makeupType === 'blush' ? selectedColor : 'transparent',
                    opacity: makeupType === 'blush' ? (intensity / 120) : 0
                  }}
                ></div>

                {/* Nose bridge tip */}
                <div className="absolute top-18 w-3 h-8 bg-black/5 rounded-full z-10"></div>
                <div className="absolute top-24 w-4 h-2 bg-black/10 rounded-full z-10"></div>

                {/* LIPSTICK LIP OVERLAY BOUNDARIES */}
                {/* Lip outlines */}
                <div className="absolute bottom-10 w-14 h-6 flex flex-col items-center justify-center z-20">
                  {/* Top lip curve */}
                  <div 
                    className="w-12 h-2.5 bg-rose-400 rounded-t-full transition-all duration-300 cursor-pointer hover:scale-105"
                    style={{ 
                      backgroundColor: makeupType === 'lipstick' ? selectedColor : '#DF9898',
                      opacity: makeupType === 'lipstick' ? (intensity / 100) : 0.8
                    }}
                  ></div>
                  {/* Bottom lip curve */}
                  <div 
                    className="w-12 h-3 bg-rose-500 rounded-b-full transition-all duration-300 mt-[1px]"
                    style={{ 
                      backgroundColor: makeupType === 'lipstick' ? selectedColor : '#CD7D7D',
                      opacity: makeupType === 'lipstick' ? (intensity / 100) : 0.9
                    }}
                  ></div>
                </div>

                {/* Chin line contours */}
                <div className="absolute bottom-2 w-16 h-4 border-b border-black/5 rounded-full z-10"></div>

              </div>
            </div>

            {/* Absolute watermark branding */}
            <span className="absolute bottom-3 left-4 text-[9px] font-bold font-serif text-white/50 tracking-wider">NYKAA MIRROR V2</span>
            
            {/* Quick action button for model action */}
            <button
              id="tryon-blink-btn"
              onClick={triggerBlink}
              className="absolute bottom-3 right-3 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer text-[10px] flex items-center gap-1"
              title="Blink simulation eyes"
            >
              <span>😉 Blink</span>
            </button>
          </div>

          {/* Model Skinundertone select list */}
          <div className="flex gap-2 mt-4">
            {['fair', 'medium', 'deep'].map((type) => (
              <button
                key={type}
                id={`tryon-skin-btn-${type}`}
                onClick={() => setSkinType(type)}
                className={`px-3 py-1 bg-stone-50 hover:bg-stone-100 rounded-full text-[10px] font-bold border transition-all capitalize select-none cursor-pointer ${
                  skinType === type ? 'border-[#FC2779] text-[#FC2779] bg-pink-50/20' : 'border-stone-250 text-stone-500'
                }`}
              >
                {type} Undertone
              </button>
            ))}
          </div>

        </div>

        {/* Adjustments control grid (Right 7 cols) */}
        <div className="md:col-span-7 flex flex-col space-y-4">
          
          {/* Choose category tags */}
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">1. Choose Make-up Target</span>
            <div className="flex gap-2">
              {[
                { id: 'lipstick', label: '💋 Lips pigment', initial: '#B80029' },
                { id: 'blush', label: '🌸 Cheek blush', initial: '#F08080' },
                { id: 'eyeshadow', label: '✨ Eye shadows', initial: '#DAA520' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  id={`tryon-opt-btn-${opt.id}`}
                  onClick={() => {
                    setMakeupType(opt.id);
                    setSelectedColor(opt.initial);
                  }}
                  className={`flex-1 max-w-[120px] py-2 rounded-xl border text-center transition-all text-xs font-semibold cursor-pointer ${
                    makeupType === opt.id 
                      ? 'border-[#FC2779] bg-pink-50/30 text-[#FC2779] font-bold' 
                      : 'border-stone-200 text-stone-600 bg-white hover:border-stone-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Choose shade grids */}
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">2. Pick Shade Pigment</span>
            <div className="grid grid-cols-2 gap-2">
              {makeupOptions[makeupType].map((shade) => {
                const isChosen = selectedColor === shade.hex;
                return (
                  <button
                    key={shade.name}
                    id={`tryon-shade-${shade.name.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedColor(shade.hex)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all bg-white relative cursor-pointer ${
                      isChosen ? 'border-[#FC2779] bg-[#FC2779]/5 ring-1 ring-[#FC2779]/30' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span 
                      className="w-5 h-5 rounded-full border border-stone-200 shadow-inner flex items-center justify-center shrink-0" 
                      style={{ backgroundColor: shade.hex }}
                    >
                      {isChosen && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                    </span>
                    <div className="truncate text-left leading-tight">
                      <p className="text-xs font-bold text-stone-800 truncate">{shade.name}</p>
                      <p className="text-[9px] text-stone-400 truncate font-light">{shade.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Opacity slider */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#FC2779]" /> 3. Adjust Formulation coverage
              </span>
              <span className="text-xs font-extrabold text-[#FC2779]">{intensity}% coverage</span>
            </div>
            <input
              id="tryon-intensity-slider"
              type="range"
              min="20"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-[#FC2779] h-1 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-stone-400">
              <span>Sheer Gloss (20%)</span>
              <span>Rich Matte (100%)</span>
            </div>
          </div>

          {/* Reset Action and advice info bubble */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-light">
              <Sparkles className="w-4 h-4 text-[#FC2779]" />
              <span>Real-time pigments matched with safe organic cosmetics.</span>
            </div>
            
            <button
              id="tryon-reset-btn"
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-[#FC2779] transition-colors cursor-pointer bg-stone-100 px-3 py-1.5 rounded-lg w-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Tone</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
