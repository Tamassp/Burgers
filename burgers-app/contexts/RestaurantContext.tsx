'use client'
import * as React from 'react'
import { Updater, useImmer } from 'use-immer'
import { IRestaurant, IReview } from '@/interfaces/interfaces'



export const initialRestaurant: IRestaurant = {
    id: '',
    name: '',
    address: '',
    phone: '',
    rating: 0,
    menuItems: [],
    reviews: [],
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
    updateRestaurantWithReview: (review: IReview) => Promise<any>,
}

export const RestaurantContext = React.createContext({
    restaurant: initialRestaurant,
    // restaurants: [],
    setRestaurant: (draft: IRestaurant) => {},
    getRestaurantById: async (id: any) => {},
    // getRestaurantsByIds: async (ids) => {},
    updateRestaurantWithReview: async (review: IReview) => {},
})

export const RestaurantProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    
    const [restaurant, setRestaurant] = useImmer<IRestaurant>(initialRestaurant);
    const baseUrl = process.env.BASE_URL;
    // const [restaurant, setRestaurant] = React.useState<IRestaurant>(initialRestaurant)
    

    const getRestaurantById = React.useCallback(async (id: string) => {
        // fetch(`http://localhost:3000/restaurants/${params.id}.json`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setRestaurant(data)
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
        
    // AN EXAMPLE OF FETCHING MULTIPLE RESTAURANTS
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

    const updateRestaurantWithReview = React.useCallback(async (review: IReview) => {
        //ADD REVIEW TO RESTAURANT wITH IMMER
        // setRestaurant((draft) => {
        //     draft.reviews.push(review)
        //     draft.rating = draft.reviews.reduce((acc, review) => acc + review.rating, 0) / draft.reviews.length
        // })

        const updatedRestaurant = { 
            ...restaurant,  
            reviews: [
                ...restaurant.reviews, 
                review
            ]
        }

        // WRITE TO LOCAL JSON FILE
        // ADD REVIEW TO RESTAURANT
        try {
            // console.log('Waiting for API...')
            // setTimeout(() => {}, 2000)
            console.log('Restaurant', updatedRestaurant)
            const response = await fetch(`http://localhost:3000/restaurants/${updatedRestaurant.id}.json`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRestaurant)
            }).then((res) => res.json())
            // setRestaurant(response.data)
            return response
        } catch (error) {
            console.error('Error updating restaurant', error)
        }

        // LATER CONNECT TO API
        
        // try {
        //     const response = await axios({
        //         method: 'put',
        //         url: baseUrl + `api/restaurants`,
        //         data: restaurant
        //     })
        //     return response.data
        // } catch (error) {
        //     console.error('Error updating restaurant', error)
        // }
    }, [restaurant])

    return (
        <RestaurantContext.Provider value={{ restaurant, setRestaurant, getRestaurantById, updateRestaurantWithReview }}>
            {children}
        </RestaurantContext.Provider>
    )
}

export const useRestaurantContext = () => React.useContext(RestaurantContext)