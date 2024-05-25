'use client'
import * as React from 'react'
// import { Updater, useImmer } from 'use-immer'
import IRestaurant from '@/interfaces/interfaces'


export const initialRestaurant: IRestaurant = {
    id: '',
    name: '',
    address: '',
    phone: '',
    rating: 0,
    menu: [],
    location: {
        lat: 0,
        lng: 0
    }
}

export interface IRestaurantContext {
    restaurant: IRestaurant,
    // restaurants: IRestaurant[],
    setRestaurant: (draft: IRestaurant) => void,
    getRestaurantById: (id: string) => Promise<any>,
    // getRestaurantsByIds: (ids: string[]) => Promise<any>,
    // updateRestaurant: (restaurant: IRestaurant) => Promise<any>,
}

export const RestaurantContext = React.createContext({
    restaurant: initialRestaurant,
    // restaurants: [],
    setRestaurant: (draft) => {},
    getRestaurantById: async (id) => {},
    // getRestaurantsByIds: async (ids) => {},
    // updateRestaurant: async (restaurant) => {},
})

export const RestaurantProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    
    // const [restaurant, setRestaurant] = useImmer<IRestaurant>(initialRestaurant);
    // const [restaurants, setRestaurants] = useImmer<IRestaurant[]>([]);
    const baseUrl = process.env.BASE_URL;
    const [restaurant, setRestaurant] = React.useState<IRestaurant>(initialRestaurant)
    

    const getRestaurantById = React.useCallback(async (id: string) => {
        try {
            console.log('baseUrl', baseUrl)
            const response = await fetch(`http://localhost:3000/restaurants/${id}.json`)
                .then((res) => res.json())
            // const response = await axios.get(`${baseUrl}api/restaurants/${id}`)
            setRestaurant(response.data)
            return response.data
        } catch (error) {
            console.log('error', error)
        }
    }, [baseUrl])
        
    
    // const getRestaurantsByIds = React.useCallback (async (ids: string[]) => {
    //     const idString = ids.map(id => `id=${id}`).join('&')
    //     try {
    //         const response = await fetch(`${baseUrl}/restaurants?${idString}`)
    //         // const response = await axios.get(`${baseUrl}api/restaurants?${idString}`)
    //         setRestaurants(response.data)
    //         return response.data
    //     } catch (error) {
    //         console.log('error', error)
    //     }
    // }, [])

    // const updateRestaurant = React.useCallback(async (restaurant: IRestaurant) => {
    //     try {
    //         const response = await axios({
    //             method: 'put',
    //             url: baseUrl + `api/restaurants`,
    //             data: restaurant
    //         })
    //         return response.data
    //     } catch (error) {
    //         console.error('Error updating restaurant', error)
    //     }
    // }, [])

    return (
        <RestaurantContext.Provider value={{ restaurant, setRestaurant, getRestaurantById }}>
            {children}
        </RestaurantContext.Provider>
    )
}

export const useRestaurantContext = () => React.useContext(RestaurantContext)