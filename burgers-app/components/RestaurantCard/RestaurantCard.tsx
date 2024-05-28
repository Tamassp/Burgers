'use client'
import React, { useCallback, useEffect } from 'react';
import Card from '../Card/Card'
import TitleDescription from '../TitleDescription/TitleDescription'
import { useRouter } from 'next/navigation'
import { IRestaurant } from '@/interfaces/interfaces'
import Image from "next/image";


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
          <Card onClick={handleClick} style={containerStyles}>
            {restaurant && restaurant.image ? (
                <div style={imageWrapperStyles}>
                    <Image src={restaurant.image} alt="Burger" fill style={imageStyles} />
                </div>
            ) : (
                <div style={imageWrapperStyles}>
                    <p>loading</p>
                </div>
            )}
            {/* Logo */}
            {restaurant ? (
            <TitleDescription title={restaurant.name} description={restaurant.openingTime}>
                <p>{restaurant.rating}</p>
            </TitleDescription>) : (
                <p>Loading...</p>
            )}
        </Card>
    )
}

const containerStyles: React.CSSProperties = {
    
    minWidth: '438px',
};

const imageStyles: React.CSSProperties = {
    borderRadius: '8px',
}

const imageWrapperStyles: React.CSSProperties = {
    position: 'relative',
    height: 224,
    width: 406,
}

export default RestaurantCard;