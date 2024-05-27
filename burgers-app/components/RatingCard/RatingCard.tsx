'use client'
import React, { use, useCallback, useEffect } from 'react';
import Card from '../Card/Card'
import TitleDescription from '../TitleDescription/TitleDescription'
import { useRouter } from 'next/navigation'
import { IRestaurant, IUser } from '@/interfaces/interfaces'


export interface RatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    comment: string
    id: string
    name: string
    rating: number
}

const RatingCard = ({
    children,
    comment,
    id,
    name,
    rating,
    style,
    ...props
}: RatingCardProps): JSX.Element => {
    const [user, setUser] = React.useState<IUser | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
    }, [])

    //DUMMY USER
    useEffect(() => {
        setUser({
            id: '1',
            email: 'asd@asd.com',
            name: 'John Doe',
            phone: '1234567890',
        })
    }, [])
    return (
        <Card>
            {user ? (
            <TitleDescription title={name} description={comment}>
                <p>Rating: {rating}</p>
            </TitleDescription>) : (
                <p>Loading...</p>
            )}
        </Card>
    )
}

const containerStyles: React.CSSProperties = {
    

    
};

export default RatingCard;