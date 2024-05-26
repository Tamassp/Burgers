'use client'
import React, { useCallback, useEffect } from 'react';
import Card from '../Card/Card'
import TitleDescription from '../TitleDescription/TitleDescription'
import Image from "next/image";


export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    description?: string
    id: string
    imageSrc: string
    price?: number
    title: string
}

const ProductCard = ({
    children,
    description,
    id,
    imageSrc,
    price,
    style,
    title,
    ...props
}: ProductCardProps): JSX.Element => {
    const [loading, setLoading] = React.useState<boolean>(true);

    return (
        <Card>
            {imageSrc ? (
                <div style={{position: 'relative', height: 224, width: 406}}>
                    <Image src={imageSrc} alt="Burger" fill style={imageStyles} />
                </div>
            ) : (
                <div style={{height: 224, width: '100%'}}>
                    <p>loading</p>
                </div>
            )}
            
            {title && description ? (
                <TitleDescription title={title} description={description} style={titleDescriptionStyles} >
                    {price && <p style={priceStyles}>{price}.-</p>}
                </TitleDescription>) : (
                    <p>Loading...</p>
            )}
        </Card>
    )
}

const containerStyles: React.CSSProperties = {
    

    
};

const imageStyles: React.CSSProperties = {
    borderRadius: '8px',
}

const priceStyles: React.CSSProperties = {
    marginTop: '8px',
    fontSize: 20,
    fontWeight: 'bold',
}

const titleDescriptionStyles: React.CSSProperties = {
    marginTop: '24px',
}

export default ProductCard;