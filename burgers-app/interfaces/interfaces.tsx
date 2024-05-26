export default interface IMenuItem {
    name: string;
    description?: string;
    price: number;
}

export default interface IRestaurant {
    id: string;
    name: string;
    address: string;
    phone: string;
    rating: number;
    menuItems: IMenuItem[];
    location: {
        lat: number;
        lng: number;
    };
}

