export type Category = {
  id: number;
  name: string;
  image_url: string | null;
};

export type MenuItem = {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};