
'use client'
import * as React from "react"
import { useRouter } from "next/navigation"
import { useRestaurantContext } from "@/contexts/RestaurantContext"
import { Rating } from "react-simple-star-rating"
import styles from "./page.module.css"
import globalStyles from "./../../page.module.css"
import Image from "next/image"
import Swiper from "@/components/Swiper/Swiper"
import ProductCard from "@/components/ProductCard/ProductCard"
import Divider from "@/components/Divider/Divider"
import RatingCard from "@/components/RatingCard/RatingCard"
import { IMenuItem, IReview } from "@/interfaces/interfaces"
import TitleDescription from "@/components/TitleDescription/TitleDescription"
import { calculateAverage } from "@/helpers/helpers"

export default function Restaurant({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { restaurant, getRestaurantById, setRestaurant, updateRestaurantWithReview } = useRestaurantContext();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [tasteRating, setTasteRating] = React.useState<number>(0);
    const [textureRating, setTextureRating] = React.useState<number>(0);
    const [presentationRating, setPresentationRating] = React.useState<number>(0);
    const [isRatingReady, setIsRatingReady] = React.useState<boolean>(false);
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


    const handleRatingTaste = (rate: number) => {
        setTasteRating(rate);
    }

    const handleRatingTexture = (rate: number) => {
        setTextureRating(rate);
    }

    const handleRatingPresentation = (rate: number) => {
        setPresentationRating(rate);
    }

    const onPointerEnter = (e: any) => {
        console.log('Enter', e);
    }

    const onPointerLeave = (e: any) => {
        console.log('Leave', e);
    }

    const onPointerMove = (e: any) => {
        console.log('Move', e);
    }

    const handleSubmitReview = React.useCallback(async () => {
        console.log('Submit Review', tasteRating, textureRating, presentationRating);
        const ratingAVG =  calculateAverage([tasteRating, textureRating, presentationRating]);
        await updateRestaurantWithReview({
            id: '1',
            name: 'John Doe',
            comment: 'Great burgers!',
            rating: ratingAVG
        });
    }, [tasteRating, textureRating, presentationRating, updateRestaurantWithReview]);

    // CHECK IF RATINGS ARE READY
    React.useEffect(() => {
        if (tasteRating && textureRating && presentationRating) {
            setIsRatingReady(true);
        }
    }, [tasteRating, textureRating, presentationRating]);

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
                    <div className={styles.col5} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h1>{params.id}</h1>
                        <p>The best burgers in town!</p>
                        <p>Rating: {restaurant.rating}</p>
                        {/* COMPONENTS WERE NOT EXPORTED ON PURPOSE,
                        TO SHOWCASE A POSSIBLE SOLUTION ON THE DEMO */}
                        <TitleDescription title="Taste" titleStyle={{textAlign: 'center'}}>
                            <Rating 
                                onClick={handleRatingTaste}
                                onPointerEnter={onPointerEnter}
                                onPointerLeave={onPointerLeave}
                                onPointerMove={onPointerMove}
                            />
                        </TitleDescription>
                        <TitleDescription title="Texture" titleStyle={{textAlign: 'center'}}>
                            <Rating 
                                onClick={handleRatingTexture}
                                onPointerEnter={onPointerEnter}
                                onPointerLeave={onPointerLeave}
                                onPointerMove={onPointerMove}
                            />
                        </TitleDescription>
                        <TitleDescription title="Visual Presentation" titleStyle={{textAlign: 'center'}}>
                            <Rating 
                                onClick={handleRatingPresentation}
                                onPointerEnter={onPointerEnter}
                                onPointerLeave={onPointerLeave}
                                onPointerMove={onPointerMove}
                            />
                        </TitleDescription>
                        <Divider />
                        <button disabled={!isRatingReady} onClick={handleSubmitReview} >Submit Review</button>
                    </div>) : (
                        <p>Loading...</p>
                    )}
                   
                </div>
            </div>
            {/* DIVIDER */}
            {/* SWIPER */}
            <Swiper>
                {restaurant.menuItems ? (
                    restaurant.menuItems.map((menuItem: IMenuItem, index: number) => (
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
            <Divider />
            <Swiper>
                {restaurant.reviews ? (
                    restaurant.reviews.map((review: IReview, index: number) => (
                        <RatingCard
                            key={index}
                            id={review.id}
                            // imageSrc={`/images/${rating.id}.jpg`}
                            name={review.name}
                            comment={review.comment}
                            rating={review.rating}
                            // price={rating.price}
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
