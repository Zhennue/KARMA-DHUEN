export type DrinkMenuItem = {
  name: string;
  price: string;
  note: string;
};

export type DrinkMenuSection = {
  id: string;
  title: string;
  subtitle: string;
  items: DrinkMenuItem[];
};

export const drinkSections: DrinkMenuSection[] = [
  {
    id: "signature-sips",
    title: "Signature Sips",
    subtitle: "House favorites with bright, balanced flavor.",
    items: [
      {
        name: "Karma Citrus Cooler",
        price: "Nu. 95",
        note: "Lemon, mint, soda",
      },
      {
        name: "Honey Lime Spark",
        price: "Nu. 90",
        note: "Citrus and light fizz",
      },
      { name: "Berry Fizz", price: "Nu. 110", note: "Mixed berries, tonic" },
    ],
  },
  {
    id: "hot-beverages",
    title: "Hot Beverages",
    subtitle: "Warm drinks for slow mornings and late evenings.",
    items: [
      { name: "Butter Tea", price: "Nu. 55", note: "Traditional salted tea" },
      { name: "Black Tea", price: "Nu. 40", note: "Clean and classic" },
      {
        name: "Hot Coffee",
        price: "Nu. 70",
        note: "Bold roast, smooth finish",
      },
    ],
  },
  {
    id: "fresh-juices",
    title: "Fresh Juices",
    subtitle: "Pressed and blended to keep it light.",
    items: [
      { name: "Orange Juice", price: "Nu. 90", note: "Fresh citrus squeeze" },
      {
        name: "Mixed Fruit Juice",
        price: "Nu. 110",
        note: "Seasonal fruit blend",
      },
      { name: "Pineapple Juice", price: "Nu. 95", note: "Sweet with a tang" },
    ],
  },
  {
    id: "iced-drinks",
    title: "Iced Drinks",
    subtitle: "Cool and crisp for the hottest part of the day.",
    items: [
      {
        name: "Iced Lemon Tea",
        price: "Nu. 85",
        note: "Tea with citrus chill",
      },
      {
        name: "Sparkling Water",
        price: "Nu. 60",
        note: "Simple and refreshing",
      },
      { name: "Chilled Cola", price: "Nu. 65", note: "Classic soda finish" },
    ],
  },
  {
    id: "milkshakes",
    title: "Milkshakes",
    subtitle: "Creamy blends with a dessert feel.",
    items: [
      {
        name: "Chocolate Shake",
        price: "Nu. 130",
        note: "Rich cocoa and milk",
      },
      { name: "Vanilla Shake", price: "Nu. 125", note: "Soft and smooth" },
      {
        name: "Strawberry Shake",
        price: "Nu. 135",
        note: "Fruit-forward cream",
      },
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails",
    subtitle: "Layered flavors without the alcohol.",
    items: [
      { name: "Virgin Mojito", price: "Nu. 120", note: "Mint, lime, soda" },
      {
        name: "Sunset Cooler",
        price: "Nu. 125",
        note: "Orange, grenadine, fizz",
      },
      {
        name: "Cucumber Splash",
        price: "Nu. 115",
        note: "Fresh and herbaceous",
      },
    ],
  },
];
