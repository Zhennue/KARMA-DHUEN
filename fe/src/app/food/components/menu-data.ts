export type FoodMenuItem = {
  name: string;
  price: string;
  image?: string;
  description: string;
  ingredients: string[];
  spiceLevel: "Low" | "Medium" | "High";
};

export type FoodMenuSection = {
  id: string;
  title: string;
  items: FoodMenuItem[];
};

export const menuSections: FoodMenuSection[] = [
  {
    id: "cuisine",
    title: "Cuisine",
    items: [
      {
        name: "Kewa Datshi",
        price: "Nu. 180",
        image: "/BC.png",
        description:
          "A classic Bhutanese comfort plate with potatoes, cheese, and a warm chili finish.",
        ingredients: ["Bhutanese cheese", "potato", "green chili", "butter"],
        spiceLevel: "Medium",
      },
      {
        name: "Ema Datshi",
        price: "Nu. 190",
        image: "/bg.png",
        description:
          "Creamy chili-and-cheese stew with a bright, lingering heat and soft richness.",
        ingredients: ["Bhutanese cheese", "ema chili", "onion", "garlic"],
        spiceLevel: "High",
      },
      {
        name: "Shakam Paa",
        price: "Nu. 220",
        image: "/bg.png",
        description:
          "Smoked dried beef cooked down with chili, radish, and mountain aromatics.",
        ingredients: ["dried beef", "radish", "chili", "aromatic spices"],
        spiceLevel: "High",
      },
      {
        name: "Phaksha Paa",
        price: "Nu. 240",
        image: "/bg.png",
        description:
          "Tender pork with radish and chili for a deep, savory bite.",
        ingredients: ["pork", "radish", "dried chili", "garlic"],
        spiceLevel: "Medium",
      },
    ],
  },
  {
    id: "fast-foods",
    title: "Fast Foods",
    items: [
      {
        name: "Crispy Chicken Burger",
        price: "Nu. 150",
        image: "/bg.png",
        description:
          "Crispy chicken, lettuce, and a soft bun with a light smoky mayo finish.",
        ingredients: ["crispy chicken", "lettuce", "bun", "smoky mayo"],
        spiceLevel: "Low",
      },
      {
        name: "Loaded Fries",
        price: "Nu. 120",
        image: "/bg.png",
        description:
          "Golden fries topped with creamy sauce, herbs, and a savory melted finish.",
        ingredients: ["fries", "cheese sauce", "herbs", "seasoning"],
        spiceLevel: "Low",
      },
      {
        name: "Veg Club Sandwich",
        price: "Nu. 135",
        image: "/bg.png",
        description:
          "Layered vegetables and toast with a crisp bite and a clean, fresh finish.",
        ingredients: ["toast", "mixed vegetables", "mayo", "lettuce"],
        spiceLevel: "Low",
      },
    ],
  },
  {
    id: "noodles",
    title: "Noodles",
    items: [
      {
        name: "Chicken Thukpa",
        price: "Nu. 210",
        image: "/bg.png",
        description:
          "A warming noodle bowl with chicken, broth, vegetables, and a satisfying finish.",
        ingredients: ["chicken", "noodles", "broth", "vegetables"],
        spiceLevel: "Medium",
      },
      {
        name: "Veg Hakka Noodles",
        price: "Nu. 160",
        image: "/bg.png",
        description:
          "Stir-fried noodles with crisp vegetables and a light, savory sauce.",
        ingredients: [
          "noodles",
          "mixed vegetables",
          "soy sauce",
          "spring onion",
        ],
        spiceLevel: "Low",
      },
      {
        name: "Spicy Beef Chowmein",
        price: "Nu. 240",
        image: "/bg.png",
        description:
          "Beef chowmein with a strong chili kick and a rich, smoky stir-fry flavor.",
        ingredients: ["beef", "noodles", "chili", "capsicum"],
        spiceLevel: "High",
      },
    ],
  },
  {
    id: "hot-drinks",
    title: "Hot Drinks",
    items: [
      {
        name: "Butter Tea",
        price: "Nu. 55",
        image: "/bg.png",
        description:
          "Traditional buttery tea with a warm, lightly salty finish.",
        ingredients: ["tea", "butter", "salt"],
        spiceLevel: "Low",
      },
      {
        name: "Black Tea",
        price: "Nu. 40",
        image: "/bg.png",
        description: "Simple black tea, hot and clean with a smooth finish.",
        ingredients: ["tea leaves", "hot water"],
        spiceLevel: "Low",
      },
      {
        name: "Hot Coffee",
        price: "Nu. 70",
        image: "/bg.png",
        description:
          "Warm coffee with a balanced roast and a comforting aroma.",
        ingredients: ["coffee", "milk", "sugar"],
        spiceLevel: "Low",
      },
    ],
  },
  {
    id: "cold-drinks",
    title: "Cold Drinks",
    items: [
      {
        name: "Iced Lemon Tea",
        price: "Nu. 85",
        image: "/bg.png",
        description:
          "Refreshing lemon tea with a cool citrus lift and a crisp finish.",
        ingredients: ["tea", "lemon", "ice", "sugar"],
        spiceLevel: "Low",
      },
      {
        name: "Sparkling Water",
        price: "Nu. 60",
        image: "/bg.png",
        description: "Clean sparkling water for a light and refreshing reset.",
        ingredients: ["sparkling water", "ice"],
        spiceLevel: "Low",
      },
      {
        name: "Chilled Cola",
        price: "Nu. 65",
        image: "/bg.png",
        description: "Cold cola served crisp for a fast refresh.",
        ingredients: ["cola", "ice"],
        spiceLevel: "Low",
      },
    ],
  },
  {
    id: "fresh-juices",
    title: "Fresh Juices",
    items: [
      {
        name: "Orange Juice",
        price: "Nu. 90",
        image: "/bg.png",
        description:
          "Bright orange juice with a naturally sweet, fresh finish.",
        ingredients: ["orange", "ice"],
        spiceLevel: "Low",
      },
      {
        name: "Mixed Fruit Juice",
        price: "Nu. 110",
        image: "/bg.png",
        description:
          "A blended juice with layered fruit sweetness and a smooth finish.",
        ingredients: ["mixed fruits", "ice", "honey"],
        spiceLevel: "Low",
      },
      {
        name: "Pineapple Juice",
        price: "Nu. 95",
        image: "/bg.png",
        description:
          "Tropical pineapple juice with a sharp, juicy, sunny taste.",
        ingredients: ["pineapple", "ice"],
        spiceLevel: "Low",
      },
    ],
  },
];
