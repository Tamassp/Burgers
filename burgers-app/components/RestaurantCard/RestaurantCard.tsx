'use client'
import React, { useCallback, useEffect } from 'react';
import Card from '../Card/Card'
import TitleDescription from '../TitleDescription/TitleDescription'
import { useRouter } from 'next/navigation'
import { IRestaurant } from '@/interfaces/interfaces'


export interface RestaurantCardProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
}

const RestaurantCard = ({
    id,
    children,
    style,
    ...props
}: RestaurantCardProps): JSX.Element => {
    const router = useRouter();
    const [restaurant, setRestaurant] = React.useState<IRestaurant | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        fetch(`http://localhost:3000/restaurants/${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data)
        setLoading(false)
      })
    }, [])

    const handleClick = useCallback(() => {
        // console.log('RestaurantID', id);
        router.push(`/restaurants/${id}`);
    }, [id]);

    React.useEffect(() => {
        console.log('Restaurant', restaurant);
    }, [restaurant]);

    return (
          <Card onClick={handleClick}>
            {/* Image */}
            {/* Logo */}
            {restaurant ? (
            <TitleDescription title={restaurant.id} description={restaurant.address}>
                <p>{restaurant.rating}</p>
            </TitleDescription>) : (
                <p>Loading...</p>
            )}
        </Card>
    )
}

const containerStyles: React.CSSProperties = {
    

    
};

export default RestaurantCard;