
'use client'
import * as React from "react"
import { useRouter } from "next/navigation"
import { useRestaurantContext } from "@/contexts/RestaurantContext"
import { Rating } from "react-simple-star-rating"
import styles from "./page.module.css"
import globalStyles from "./../../page.module.css"
import { calculateAverage } from "@/helpers/helpers"
import Image from "next/image"
import Swiper from "@/components/Swiper/Swiper"
import ProductCard from "@/components/ProductCard/ProductCard"
import Divider from "@/components/Divider/Divider"
import RatingCard from "@/components/RatingCard/RatingCard"
import { IMenuItem, IReview } from "@/interfaces/interfaces"
import TitleDescription from "@/components/TitleDescription/TitleDescription"
import FileUpload from "@/components/FileUpload/FileUpload"

export default function Restaurant({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { restaurant, getRestaurantById, setRestaurant, updateRestaurantWithReview } = useRestaurantContext();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [tasteRating, setTasteRating] = React.useState<number>(0);
    const [textureRating, setTextureRating] = React.useState<number>(0);
    const [presentationRating, setPresentationRating] = React.useState<number>(0);
    const [isRatingReady, setIsRatingReady] = React.useState<boolean>(false);
    
    const dynamicRating = calculateAverage(restaurant.reviews.map((review: IReview) => review.rating));
    
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
        const ratingAVG =  calculateAverage([tasteRating, textureRating, presentationRating]);
        await updateRestaurantWithReview({
            id: '1', // GUID
            name: 'John Doe', // GET FROM USER CONTEXT
            comment: 'Great burgers!', // USE TEXT INPUT
            rating: ratingAVG
        });
    }, [tasteRating, textureRating, presentationRating, updateRestaurantWithReview]);

    const handleFileChange = (e: any) => {
        console.log('File', e.target.files);
    }

    // CHECK IF RATINGS ARE READY
    React.useEffect(() => {
        if (tasteRating && textureRating && presentationRating) {
            setIsRatingReady(true);
        }
    }, [tasteRating, textureRating, presentationRating]);

    // DEBUGGING
    // CHECK IF RESTAURANT IS READY
    React.useEffect(() => {
        console.log('Restaurant', restaurant);
    }
    , [restaurant]);

    return (
        <main style={containerStyles}>

            {/* COVER IMAGE */}
            <div className={globalStyles.fullWidthSection} style={{position: 'relative'}}>
                <div style={imageWrapperStyles}>
                    <Image src={`/images/${params.id}.jpg`} alt="Burger" fill style={{objectFit: 'cover', }} />
                </div>
            </div>

            {/* RESTAURANT DESCRIPTION */}
            <div className={globalStyles.fullWidthSection} style={restaurantDescriptionStyles}>
                    <Divider scale={4} />
                    {restaurant ? (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h1>{restaurant.name}</h1>
                        <Divider scale={2} />
                        <TitleDescription
                            title={restaurant.openingTime}
                            description={restaurant.address}
                            titleStyle={{textAlign: 'center'}}
                            descriptionStyle={{textAlign: 'center'}}
                            childrenStyle={{marginTop: 16, textAlign: 'center'}}
                        >
                            <Rating 
                                initialValue={dynamicRating}
                                size={24}
                                transition
                                disableFillHover
                                fillColor='orange'
                                emptyColor='gray'
                                readonly
                                allowFraction    
                            />
                            <p>Rating: {dynamicRating}</p>
                        </TitleDescription>
                    </div>) : (
                        <p>Loading...</p>
                    )}
            <Divider scale={4} />
            </div>

            {/* SWIPERS */}
            <div className={globalStyles.paddingSection} style={swiperSection}>
                <Divider scale={4} />
                <h2>Menu</h2>

                {/* MENU ITEM SWIPER */}
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
                <Divider scale={4} />
                <h2>Reviews</h2>

                {/* REVIEWS SWIPER */}
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
            </div>
            <Divider scale={4} />

            {/* COMPONENTS WERE NOT EXPORTED ON PURPOSE,
            TO SHOWCASE A POSSIBLE SOLUTION ON THE DEMO */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: 16, flexWrap: 'wrap', gap: 32, justifyContent: 'center', width: '100%', padding: 16}}>
                    <TitleDescription title="Taste" titleStyle={{textAlign: 'center'}}>
                        <Rating 
                            onClick={handleRatingTaste}
                            onPointerEnter={onPointerEnter}
                            onPointerLeave={onPointerLeave}
                            onPointerMove={onPointerMove}
                        />
                    </TitleDescription>
                    <TitleDescription 
                        title="Visual Presentation" 
                        titleStyle={{textAlign: 'center'}} 
                        childrenStyle={{display: 'flex', flexDirection:'column', alignItems: 'center'}}
                        >
                        <Rating 
                            onClick={handleRatingPresentation}
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
                </div>
                <Divider />
                <button 
                    disabled={!isRatingReady}
                    onClick={handleSubmitReview}
                    style={isRatingReady ? buttonStyles : disabledStyles} >Submit Review</button>
            </div>
            <Divider scale={4} />

            {/* IMAGE UPLOAD */}
            <div className={globalStyles.fullWidthSection}>

                {/* STYLES COULD BE EXPORTED TO SEPARATE STYLE SHEETS SOON */}
                <TitleDescription 
                    title="Upload Image"
                    description="The best pictures will be featured on our website!" 
                    titleStyle={{textAlign: 'center'}}
                    childrenStyle={{marginTop: 16}}
                    descriptionStyle={{maxWidth: 300, marginTop: 16, textAlign: 'center'}}
                    style={uploadImageStyles}>
                    <FileUpload />
                </TitleDescription>
            </div>
        </main>
    );
}

const containerStyles: React.CSSProperties = {
    // padding: 16,
}

const imageWrapperStyles: React.CSSProperties = {
    // position: 'sticky',
    // top: -16,
    // left: 0,
    // right: 0,
    height: 300,
    width: '100%',
}

const restaurantDescriptionStyles: React.CSSProperties = {
    flexDirection: 'column', 
    display: 'flex', 
    alignItems: 'center',
    // paddingTop: 64,
    // paddingBottom: 64,
    backgroundColor: 'white',
}

const swiperSection: React.CSSProperties = {
    // paddingTop: 64,
    // paddingBottom: 64,
}

const uploadImageStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
}

const buttonStyles: React.CSSProperties = {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'black',
    color: 'white',
    cursor: 'pointer',
    minWidth: 100,
}

const disabledStyles: React.CSSProperties = {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'gray',
    color: 'white',
    cursor: 'not-allowed',
    minWidth: 100,
}
