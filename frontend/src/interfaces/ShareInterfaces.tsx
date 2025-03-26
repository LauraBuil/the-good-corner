// Types
export interface AdCardProps {
    id?: number;
    title: string;
    description?: string;
    author?: string;
    price?: number;
    pictureUrl?: string;
    city?: string;
    createdAt?: string;
    category?: string;
    tags?: string;
    link?: string;
}

export interface CategoryProps {
    label: string;
    link: string;
    id?: number;
}

export interface Category {
    id: number,
    title: string,
}

export interface InputType {
    inputName: string | undefined;
    name: string;
    type?: string;
    accept?: string;
    defaultValue?: string;
}
