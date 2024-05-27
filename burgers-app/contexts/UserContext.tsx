'use client'
import * as React from 'react'
import { IUser } from '@/interfaces/interfaces'
// import { Updater, useImmer } from 'use-immer'

export const initialUser: IUser = {
    email: '',
    name: '',
    phone: '',
}

export interface IRestaurantContext {
    restaurant: IUser,
    setUser: (draft: IUser) => void,
    updateUser: (user: IUser) => Promise<any>,
}

export const UserContext = React.createContext({
    user: initialUser,
    setUser: (draft: any) => {},
    updateUser: async (user: IUser) => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const baseUrl = process.env.BASE_URL;
    const [user, setUser] = React.useState<IUser>(initialUser)
    
    const getUserById = React.useCallback(async (id: string) => {
        // fetch(`http://localhost:3000/Users/${params.id}.json`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUser(data)
        try {
            console.log('baseUrl', baseUrl)
            const response = await fetch(`http://localhost:3000/users/${id}.json`)
                .then((res) => res.json())
            // const response = await axios.get(`${baseUrl}api/users/${id}`)
            setUser(response.data)
            return response.data
        } catch (error) {
            console.log('error', error)
        }
    }, [baseUrl])

    const updateUser = React.useCallback(async (user: IUser) => {
        
        setUser(user)

        //LATER CONNECT TO API
        // try {
        //     const response = await axios({
        //         method: 'put',
        //         url: baseUrl + `api/users`,
        //         data: user
        //     })
        //     return response.data
        // } catch (error) {
        //     console.error('Error updating user', error)
        // }
        
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)