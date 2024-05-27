'use client'
import React, { use, useCallback, useEffect } from 'react';
import { IUser } from '@/interfaces/interfaces'
import Card, { CardProps } from '../Card/Card'
import TitleDescription from '../TitleDescription/TitleDescription'


export interface RatingCardProps extends CardProps {
    comment: string
    // id: string
    name: string
    rating: number
}

const RatingCard = ({
    children,
    comment,
    // id,
    name,
    rating,
    style,
    ...props
}: RatingCardProps): JSX.Element => {
    const [user, setUser] = React.useState<IUser | null>(
        //DUMMY USER
        { name: '', email: '', phone: '' }
    );
    const [loading, setLoading] = React.useState<boolean>(true);

    // IN CASE WE WANT AN ID FOR THE USER
    // WE CAN FETCH THE USER BY ID
    // useEffect(() => {
    //     fetch(`http://localhost:3000/users/${id}.json`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setUser(data)
    //     setLoading(false)
    //   })
    // }, [])

    return (
        <Card {...props}>
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