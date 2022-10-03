import { Category } from './category';

export interface Products {
  name: string;
  description: string;
  richDescription: string;
  brand: string;
  image: string;
  price: string;
  category: Category;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: Date;
}
