
'use client'
import * as React from "react"
import { useRouter } from "next/navigation"
import { useRestaurantContext } from "@/contexts/RestaurantContext"
import styles from "./page.module.css"
import globalStyles from "./../../page.module.css"
import Image from "next/image"
import Swiper from "@/components/Swiper/Swiper"
import ProductCard from "@/components/ProductCard/ProductCard"

export default function Restaurant({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { restaurant, getRestaurantById, setRestaurant } = useRestaurantContext();

    // React.useEffect(() => {
    //     console.log('Restaurant', restaurant);
    //     getRestaurantById(params.id);
    // }, [params.id]);

    //alternatively
    React.useEffect(() => {
        fetch(`http://localhost:3000/restaurants/${params.id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data)
        // setLoading(false)
      })
    }, [])

    React.useEffect(() => {
        console.log('Restaurant', restaurant);
    }
    , [restaurant]);

    return (
        <main style={containerStyles}>
            {/* <h1>Restaurant {params.id}</h1> */}
            <div className={globalStyles.section} style={{flexDirection: 'row', display: 'flex', flexWrap: 'nowrap'}}>
                <div style={{position: 'relative', width: 406, height: 244}} className={styles.col6}>
                    <Image src={`/images/${params.id}.jpg`} alt="Burger" fill />
                </div>
                <div className={styles.col6} style={{display: 'flex', justifyContent: 'center'}}>
                    {restaurant ? (
                    <div className={styles.col5}>
                        <h1>{params.id}</h1>
                        <p>The best burgers in town!</p>
                        <p>Rating: {restaurant.rating}</p>
                    </div>) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            {/* DIVIDER */}
            {/* SWIPER */}
            <Swiper>
                {restaurant.menuItems ? (
                    restaurant.menuItems.map((menuItem, index) => (
                        <ProductCard
                            key={index}
                            id={menuItem.id}
                            imageSrc={`/images/${menuItem.id}.jpg`}
                            title={menuItem.name}
                            description={menuItem.description}
                            price={menuItem.price}
                            // price={menuItem.price}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Swiper>
        </main>
    );
}

const containerStyles: React.CSSProperties = {
    padding: 16,
}
