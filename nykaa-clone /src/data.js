/**
 * Nykaa UI Clone - Beginner Friendly Static Data Store
 * All data has been curated with high-quality free imagery and realistic beauty product details.
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', count: 18 },
  { id: 'makeup', name: 'Makeup', count: 6, icon: '💄' },
  { id: 'skin', name: 'Skincare', count: 5, icon: '🧴' },
  { id: 'hair', name: 'Haircare', count: 4, icon: '💇‍♀️' },
  { id: 'fragrance', name: 'Fragrance', count: 3, icon: '✨' }
];

export const BRANDS = [
  'All Brands',
  'Nykaa Cosmetics',
  'Maybelline New York',
  'The Ordinary',
  'Minimalist',
  'L\'Oreal Paris',
  'M.A.C',
  'Clinique',
  'Estée Lauder'
];

export const BANNER_SLIDES = [
  {
    id: 1,
    title: 'THE PINK FRIDAY PREVIEW',
    description: 'Up To 50% OFF on elite global beauty brands + exciting free gifts!',
    tag: 'GRAND EXCLUSIVE',
    bgClass: 'from-pink-600 to-rose-500',
    btnText: 'Shop Best Sellers',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'GLOW FROM WITHIN',
    description: 'Scientific skincare solutions starting at just ₹399. Clear skin awaits!',
    tag: 'MINIMALIST & MORE',
    bgClass: 'from-indigo-900 to-purple-800',
    btnText: 'Explore Skincare',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'LUXE COUTURE FRAGRANCE',
    description: 'Receive an exclusive designer travel pouch with orders of ₹5,000 & above.',
    tag: 'PREMIUM LUXE',
    bgClass: 'from-amber-800 to-stone-900',
    btnText: 'Browse Fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop'
  }
];

export const PRODUCTS = [
  {
    id: 1,
    brand: 'Nykaa Cosmetics',
    name: 'Matte to Last! Liquid Lipstick',
    category: 'makeup',
    price: 649,
    originalPrice: 799,
    discount: 18,
    rating: 4.6,
    reviewsCount: 3240,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop',
    tag: 'Bestseller',
    description: 'An ultra-matte liquid lipstick that stays flawless all day. Enriched with Vitamin E for weightless hydration.',
    shades: [
      { name: 'Bombshell Pink', hex: '#E25B81', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop' },
      { name: 'Ruby Valentine', hex: '#B80029', img: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=600&auto=format&fit=crop' },
      { name: 'Velvet Nude', hex: '#A86B61', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop' },
      { name: 'Berry Cherry', hex: '#800020', img: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=600&auto=format&fit=crop' }
    ],
    details: {
      benefits: 'Transfer-proof, waterproof, highly pigmented, lasts up to 12 hours.',
      howToUse: 'Exfoliate lips before applying. Outline with precise applicator, then fill in with a smooth single sweep.',
      ingredients: 'Isododecane, Dimethicone, Vitamin E Acetate, Jojoba Seed Oil, Castor Oil Ester.'
    }
  },
  {
    id: 2,
    brand: 'Minimalist',
    name: 'Niacinamide 10% Face Serum',
    category: 'skin',
    price: 599,
    originalPrice: 599,
    discount: 0,
    rating: 4.8,
    reviewsCount: 1845,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    tag: 'Top Rated',
    description: 'A daily serum containing pure Vitamin B3 to clear acne spots, reduce sebum overproduction, and restore skin barrier.',
    shades: [],
    details: {
      benefits: 'Reduces spots, controls oil, refines large pores, calms irritation.',
      howToUse: 'Apply 2-3 drops onto clean dry face after cleansing. Gently pat until fully absorbed. Follow up with SPF.',
      ingredients: 'Aloe Barbadensis Leaf Juice, Niacinamide, Zinc PCA, Dimethicone cross-polymer, Phenoxyethanol.'
    }
  },
  {
    id: 3,
    brand: 'Maybelline New York',
    name: 'Fit Me Matte + Poreless Foundation',
    category: 'makeup',
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.4,
    reviewsCount: 9422,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop',
    tag: 'Super Saver',
    description: 'A lightweight foundation that refines pores, mats shine, and delivers a natural custom skin-like finish.',
    shades: [
      { name: '128 Warm Nude', hex: '#EAC3A4' },
      { name: '220 Natural Beige', hex: '#DFB08D' },
      { name: '310 Sun Beige', hex: '#CD9A75' },
      { name: '330 Toffee', hex: '#B57C54' }
    ],
    details: {
      benefits: 'Absorbs sweat, contains clay micro-particles, stays non-greasy up to 16 hours.',
      howToUse: 'Apply foundation onto skin and blend thoroughly using a damp blender sponge or flat synthetic foundation brush.',
      ingredients: 'Water, Cyclohexasiloxane, Nylon-12, Silica Silylate, Kaolin Clay, Titanium Dioxide.'
    }
  },
  {
    id: 4,
    brand: 'M.A.C',
    name: 'Prep + Prime Fix+ Setting Spray',
    category: 'makeup',
    price: 2150,
    originalPrice: 2450,
    discount: 12,
    rating: 4.9,
    reviewsCount: 1540,
    image: 'https://images.unsplash.com/photo-1631730359575-38e475566570?q=80&w=600&auto=format&fit=crop',
    tag: 'Luxe Chosen',
    description: 'A lightweight water mist packed with green tea, chamomile, and cucumber essence to prep, refresh, and lock makeup in place.',
    shades: [],
    details: {
      benefits: 'Sets and locks cosmetics for 16 hours. Boosts skin hydration by 82% immediately.',
      howToUse: 'Hold bottle 12 inches away from your freshly painted face and mist evenly over skin to fuse makeup layers.',
      ingredients: 'Aqua, Glycerin, Cucumber Fruit Extract, Camellia Sinensis (Green Tea) Leaf Extract, Tocopheryl Acetate.'
    }
  },
  {
    id: 5,
    brand: 'The Ordinary',
    name: 'Glycolic Acid 7% Toning Solution',
    category: 'skin',
    price: 950,
    originalPrice: 950,
    discount: 0,
    rating: 4.7,
    reviewsCount: 2280,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
    tag: 'Viral Pick',
    description: 'An alpha hydroxy acid exfoliating toner that works overnight to clarify complexion and noticeably boost brightness.',
    shades: [],
    details: {
      benefits: 'Improves skin clarity, minimizes rough texture, fades hyperpigmentation lines.',
      howToUse: 'Pour a small amount onto a soft cotton pad and sweep gently dry clean face. DO NOT rinse. Use once daily at night only.',
      ingredients: 'Glycolic Acid, Rosa Damascena Flower Water, Aloe Barbadensis Leaf Water, Ginseng Root Extract.'
    }
  },
  {
    id: 6,
    brand: 'L\'Oreal Paris',
    name: 'Hyaluronic Acid Plumping Day Cream',
    category: 'skin',
    price: 749,
    originalPrice: 999,
    discount: 25,
    rating: 4.5,
    reviewsCount: 3120,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    tag: 'Hot Deal',
    description: 'Formulated with ultra-fine micro hyaluronic acid particles that sink deeper into cells, plumping lines and locking dewy moisture.',
    shades: [],
    details: {
      benefits: 'Plumps skin cells instantly, reduces dehydration fine lines by 60%, leaves a non-sticky finish.',
      howToUse: 'Massage gently on clean face and neck in circular upward movements. Excellent base helper under foundations.',
      ingredients: 'Aqua, Dimethicone, Glycerin, Micro-Molecular Sodium Hyaluronate, Salicylic Acid, Linalool.'
    }
  },
  {
    id: 7,
    brand: 'Nykaa Cosmetics',
    name: 'Moi by Nykaa - EDP Perfume',
    category: 'fragrance',
    price: 1499,
    originalPrice: 1800,
    discount: 16,
    rating: 4.3,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
    tag: 'Signature EDP',
    description: 'A mesmerizing high-concentration Eau De Parfum featuring notes of fresh rose buds, sweet vanilla pod details, and royal amber.',
    shades: [],
    details: {
      benefits: 'Fragrance concentration of 18% +, stays vibrant for up to 10 hours. Cruelty-free.',
      howToUse: 'Spritz onto your warm pulse points (wrists, side-necks, and inner-elbow pits) from 6 inches away.',
      ingredients: 'Denatured Ethyl Alcohol, Aqua, Concentrated Perfume Compound, Benzophenone-3.'
    }
  },
  {
    id: 8,
    brand: 'L\'Oreal Paris',
    name: 'Total Repair 5 Hair Masque',
    category: 'hair',
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.6,
    reviewsCount: 5410,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop',
    tag: 'Saloon Essential',
    description: 'Specially created for damaged hair structure, repairing the 5 signs: dryness, split-ends, texture roughness, and brittleness.',
    shades: [],
    details: {
      benefits: 'Keratin-XS infused science to mend split extensions and rebuild damaged outer cuticles inside out.',
      howToUse: 'Apply evenly mid-lengths to absolute ends of wet washed hair. Leave it on for 5 magical minutes, then rinse off fully.',
      ingredients: 'Water, Cetearyl Alcohol, L-Arginine, Hydrolyzed Wheat Protein, Salicylic Acid, Limonene.'
    }
  }
];

export const TUTORIALS = [
  {
    id: 1,
    title: '5-Minute Everyday Glass Skin Routine',
    duration: '5:12',
    category: 'Skincare',
    author: 'Aisha Sharma',
    summary: 'A simple layer strategy focusing on hyaluronic acid serum and water gel moisturizers to achieve a bouncy, hyper-dewy skin texture.'
  },
  {
    id: 2,
    title: 'Flawless Winged Eyeliner Tutorial',
    duration: '3:45',
    category: 'Makeup',
    author: 'Rhea Patel',
    summary: 'A beginner-friendly dot-to-dot stencil method showing how to map standard, balanced wings using felt-tip ink liner pens.'
  },
  {
    id: 3,
    title: 'Moisture Lock Method for Dry Curls',
    duration: '6:30',
    category: 'Haircare',
    author: 'Karan Malhotra',
    summary: 'Discover the LOC (Liquid-Oil-Cream) technique to condition coarse curls and achieve long-lasting moisture definitions without frizzy flyaways.'
  }
];

export const FAQS = [
  {
    q: 'Are these products 100% authentic and genuine?',
    a: 'Absolutely! At Nykaa, security and authenticity are our prime commitments. All cosmetics are sourced directly from global brands or authorized importers with valid batch certificates.'
  },
  {
    q: 'How does the Lipstick Try-On simulator work?',
    a: 'We use dynamic Canvas state overlays. Select any color dot to instantly preview shades mapped across standard lip contours on our mock model template for real-time beauty planning!'
  },
  {
    q: 'What is the standard delivery timeline for parcels?',
    a: 'Orders are packed within 24 hours of confirmation and typically arrive within 2-4 business days across metro cities in India, complete with safe courier tracking.'
  }
];
