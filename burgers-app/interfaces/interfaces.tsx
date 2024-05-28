export interface IMenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
}

export interface IReview {
    id: string;
    name: string;
    comment: string;
    rating: number;
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
}

export interface IRestaurant {
    id: string;
    name: string;
    image: string;
    openingTime: string;
    address: string;
    phone: string;
    rating: number;
    menuItems: IMenuItem[];
    reviews: IReview[];
    location: {
        lat: number;
        lng: number;
    };
}

