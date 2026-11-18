// Single source for the dish list. The home page spotlight, the /menu page
// grid, and the `hasMenu` structured data are all derived from here, so a dish
// can never appear in one place and be missing in another.
//
// Prices are deliberately absent: the site never shows menu prices in the UI.
// The published range lives in `restaurant.priceRange` and is emitted only as
// structured data.

export type MenuCategory = "Steak" | "Rice" | "Chicken";

// Display order for the category groups, used by both the /menu page and the
// MenuSection entries in the JSON-LD.
export const menuCategories: MenuCategory[] = ["Steak", "Rice", "Chicken"];

export type Dish = {
  id: string;
  name: string;
  category: MenuCategory;
  /** Path relative to /assets/food. */
  image: string;
  note?: string;
  /** Left-to-right position in the home page "fan" of three spotlight cards. */
  homeFan?: 1 | 2 | 3;
};

const food = (file: string) => `/assets/food/${file}`;

export const dishes: Dish[] = [
  {
    id: "chicken-steak",
    name: "Chicken Steak",
    category: "Steak",
    image: food("chicken-steak-hero.webp"),
    note: "Ayam bersaus, nasi hangat, dan sayuran dalam satu piring.",
    homeFan: 2,
  },
  {
    id: "ayam-bakar-belacan",
    name: "Ayam Bakar Belacan",
    category: "Rice",
    image: food("chicken-balacan.webp"),
    note: "Ayam bakar dengan sambal belacan dan nasi hangat.",
    homeFan: 1,
  },
  {
    id: "chicken-pepper",
    name: "Chicken Pepper",
    category: "Steak",
    image: food("chicken-pepper.webp"),
    note: "Ayam bersaus lada dengan kentang goreng.",
    homeFan: 3,
  },
  // Notes below describe only what the dish name itself states. Replace them
  // with the kitchen's own wording whenever that is available.
  {
    id: "chicken-cheese",
    name: "Chicken Cheese",
    category: "Chicken",
    image: food("chicken-cheese.webp"),
    note: "Ayam dengan saus keju.",
  },
  {
    id: "chicken-serundeng",
    name: "Chicken Serundeng",
    category: "Rice",
    image: food("chicken-serundeng.webp"),
    note: "Ayam dengan taburan serundeng.",
  },
  {
    id: "cheese-golden-chick",
    name: "Cheese Golden Chick",
    category: "Chicken",
    image: food("cheese-golden-chick.webp"),
    note: "Ayam goreng dengan saus keju.",
  },
  {
    id: "nasi-goreng",
    name: "Nasi Goreng",
    category: "Rice",
    image: food("nasi-goreng-top.webp"),
    note: "Nasi goreng khas Dundee.",
  },
  {
    id: "nasi-udang",
    name: "Nasi Udang",
    category: "Rice",
    image: food("nasi-udang.webp"),
    note: "Nasi dengan udang.",
  },
];

/** The three cards shown on the home page, in fan order. */
export const spotlightDishes = [1, 2, 3].map(
  (slot) => dishes.find((dish) => dish.homeFan === slot)!,
);

/** Every dish that is not in the home page fan, in menu order. */
export const otherDishes = dishes.filter((dish) => !dish.homeFan);

export function dishesByCategory(category: MenuCategory) {
  return dishes.filter((dish) => dish.category === category);
}

/** Category groups as plain names, for MenuSection structured data. */
export const menuSections = menuCategories.map((category) => ({
  name: category,
  items: dishesByCategory(category).map((dish) => dish.name),
}));

/** Every dish photo, for the image sitemap. */
export const menuImages = dishes.map((dish) => dish.image);
