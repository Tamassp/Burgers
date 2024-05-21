export default interface IRestaurant {
    id: string;
    name: string;
    address: string;
    phone: string;
    rating: number;
    menu: string[];
    location: {
        lat: number;
        lng: number;
    };
}
