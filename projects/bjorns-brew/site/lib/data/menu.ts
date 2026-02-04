export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  dietary?: ('vegan' | 'gf' | 'df')[]
  featured?: boolean
}

export interface MenuCategory {
  id: string
  name: string
  icon: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    icon: '☕',
    items: [
      {
        id: 'drip-coffee',
        name: 'Drip Coffee',
        description: 'Our signature house blend, freshly brewed throughout the day',
        price: 3.5,
        category: 'coffee',
      },
      {
        id: 'pour-over',
        name: 'Pour Over',
        description: 'Hand-poured single origin coffee, made to order',
        price: 5.0,
        category: 'coffee',
        featured: true,
      },
      {
        id: 'cold-brew',
        name: 'Cold Brew',
        description: 'Smooth and bold, steeped for 20 hours',
        price: 4.5,
        category: 'coffee',
        dietary: ['vegan', 'df'],
      },
      {
        id: 'nitro-cold-brew',
        name: 'Nitro Cold Brew',
        description: 'Creamy, velvety cold brew infused with nitrogen',
        price: 5.5,
        category: 'coffee',
        dietary: ['vegan', 'df'],
        featured: true,
      },
    ],
  },
  {
    id: 'espresso',
    name: 'Espresso',
    icon: '🥛',
    items: [
      {
        id: 'espresso-shot',
        name: 'Espresso',
        description: 'Rich, bold shot of our house espresso blend',
        price: 3.0,
        category: 'espresso',
        dietary: ['vegan', 'df'],
      },
      {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso diluted with hot water for a smooth, rich coffee',
        price: 3.75,
        category: 'espresso',
        dietary: ['vegan', 'df'],
      },
      {
        id: 'latte',
        name: 'Latte',
        description: 'Espresso with steamed milk and a light layer of foam',
        price: 5.0,
        category: 'espresso',
      },
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Equal parts espresso, steamed milk, and velvety foam',
        price: 5.0,
        category: 'espresso',
      },
      {
        id: 'mocha',
        name: 'Mocha',
        description: 'Espresso with rich chocolate and steamed milk, topped with whipped cream',
        price: 5.5,
        category: 'espresso',
        featured: true,
      },
      {
        id: 'macchiato',
        name: 'Macchiato',
        description: 'Espresso "stained" with a dollop of foamed milk',
        price: 4.0,
        category: 'espresso',
      },
    ],
  },
  {
    id: 'tea',
    name: 'Tea',
    icon: '🍵',
    items: [
      {
        id: 'matcha-latte',
        name: 'Matcha Latte',
        description: 'Ceremonial-grade matcha whisked with steamed milk',
        price: 5.5,
        category: 'tea',
        featured: true,
      },
      {
        id: 'chai-latte',
        name: 'Chai Latte',
        description: 'Spiced black tea with steamed milk and warming spices',
        price: 5.0,
        category: 'tea',
      },
      {
        id: 'london-fog',
        name: 'London Fog',
        description: 'Earl Grey tea with vanilla and steamed milk',
        price: 5.0,
        category: 'tea',
      },
      {
        id: 'herbal-tea',
        name: 'Herbal Tea',
        description: 'Selection of caffeine-free herbal blends',
        price: 3.5,
        category: 'tea',
        dietary: ['vegan', 'gf', 'df'],
      },
      {
        id: 'iced-tea',
        name: 'Iced Tea',
        description: 'House-brewed black or green tea over ice',
        price: 3.5,
        category: 'tea',
        dietary: ['vegan', 'gf', 'df'],
      },
    ],
  },
  {
    id: 'specialty',
    name: 'Specialty',
    icon: '✨',
    items: [
      {
        id: 'bjorns-blend',
        name: "Bjorn's Blend",
        description: 'Our signature house creation with vanilla, honey, and a hint of cinnamon',
        price: 6.0,
        category: 'specialty',
        featured: true,
      },
      {
        id: 'pup-cup',
        name: 'Pup Cup',
        description: 'A dog-friendly whipped cream treat for your furry friend — always FREE! 🐾',
        price: 0.0,
        category: 'specialty',
        featured: true,
      },
      {
        id: 'honey-lavender-latte',
        name: 'Honey Lavender Latte',
        description: 'Espresso with local honey, lavender, and steamed oat milk',
        price: 6.5,
        category: 'specialty',
        dietary: ['df'],
      },
      {
        id: 'salted-caramel-mocha',
        name: 'Salted Caramel Mocha',
        description: 'Rich mocha with salted caramel and whipped cream',
        price: 6.5,
        category: 'specialty',
      },
    ],
  },
  {
    id: 'pastries',
    name: 'Pastries',
    icon: '🥐',
    items: [
      {
        id: 'butter-croissant',
        name: 'Butter Croissant',
        description: 'Flaky, buttery French croissant baked fresh daily',
        price: 4.0,
        category: 'pastries',
      },
      {
        id: 'almond-croissant',
        name: 'Almond Croissant',
        description: 'Butter croissant filled with almond cream and topped with sliced almonds',
        price: 5.0,
        category: 'pastries',
        featured: true,
      },
      {
        id: 'blueberry-muffin',
        name: 'Blueberry Muffin',
        description: 'Classic muffin bursting with fresh blueberries',
        price: 3.5,
        category: 'pastries',
      },
      {
        id: 'chocolate-chip-cookie',
        name: 'Chocolate Chip Cookie',
        description: 'Warm, gooey cookie with premium chocolate chips',
        price: 3.0,
        category: 'pastries',
      },
      {
        id: 'vegan-banana-bread',
        name: 'Vegan Banana Bread',
        description: 'Moist, naturally sweetened banana bread',
        price: 4.0,
        category: 'pastries',
        dietary: ['vegan', 'df'],
      },
    ],
  },
]

export const getAllMenuItems = (): MenuItem[] => {
  return menuCategories.flatMap((category) => category.items)
}

export const getFeaturedItems = (): MenuItem[] => {
  return getAllMenuItems().filter((item) => item.featured)
}
