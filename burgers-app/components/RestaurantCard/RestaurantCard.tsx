'use client'
import React, { useCallback, useEffect } from 'react';
import Card from '../Card/Card'
import TitleDescription from '../TitleDescription/TitleDescription'
import IRestaurant from '@/interfaces/interfaces'
import { useRouter } from 'next/navigation'


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
            {restaurant ? (
            <TitleDescription title={restaurant.id} description="The best burgers in town!">
                <p>Rating: 5.0</p>
            </TitleDescription>) : (
                <p>Loading...</p>
            )}
        </Card>
    )
}

const containerStyles: React.CSSProperties = {
    

    
};

export default RestaurantCard;