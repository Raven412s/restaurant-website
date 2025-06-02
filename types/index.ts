export type NutritionInfo = {
    Calories: number;
    "Total Fat": string;
    Cholesterol: string;
    Sodium: string;
    "Total Carbohydrates": string;
    Protein: string;
};

export interface MenuItem {
    name: string;
    price: string;
    description: string;
    image?: string; // Optional image URL for the dish
}

export interface MenuSubSection {
    section: string | null;
    items: MenuItem[];
}

export interface MenuSection {
    title: string;
    sections: MenuSubSection[];
}


export interface NutritionPopupProps {
    info: NutritionInfo;
    position: 'left' | 'right';
    itemRect: DOMRect | null;
    image?: string;
}
