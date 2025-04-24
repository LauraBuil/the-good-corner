// Types
export interface AdCardProps {
    id: number;
    title: string;
    description?: string;
    author?: string;
    price: number;
    pictureUrl: string;
    city?: string;
    createdAt?: string;
    category?: Category;
    tags?: Tags[];
    link: string;
}

export interface AdDetails {
    id: number;
    title: string;
    description?: string;
    author?: string;
    price: number;
    pictureUrl: string;
    city?: string;
    createdAt?: string;
    category: Category;
    tags?: number[];
    link: string;
}

export interface AdDetailsTest {
    id: number;
    title: string;
    description: string;
    author: string;
    price: number;
    pictureUrl: string;
    city: string;
    createdAt: string;
    category: {
      id: number;
      label: string;
    };
    tags: {
      id: number;
      label: string;
    }[];
}

export interface Tags {
    id: number;
    label: string;
}

export interface CategoryProps {
    label: string;
    link?: string;
    id?: number;
}

export interface Category {
    id: number,
    label: string,
}

export interface InputType {
    inputName: string | undefined;
    name: string;
    type?: string;
    accept?: string;
    defaultValue?: string;
}

export interface AdFormData {
    title: string;
    description: string;
    author: string;
    price: number;
    pictureUrl: string;
    city: string;
    createdAt: string;
    categoryId: string | number;
    tags: string[] | string; // parfois c’est juste un string
  }
