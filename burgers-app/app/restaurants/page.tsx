
// import { useRouter } from "next/navigation"
import { redirect } from 'next/navigation'
import styles from "./../page.module.css"
import Map from "@/components/Map/Map"
import Image from "next/image"
import TitleDescription from '@/components/TitleDescription/TitleDescription'
import Card from '@/components/Card/Card'
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard'
import Swiper from '@/components/Swiper/Swiper'
import Divider from '@/components/Divider/Divider'

async function fetchRestaurants() {
    // const router = useRouter();
    const response = await fetch("http://localhost:3000/restaurants/restaurants.json");
    // const response = await fetch("https://api.github.com/repos/vercel/next.js");
    // console.log("RRRRR",response.json());
    return response.json();
}

export default async function Restaurants() {
    
    const restaurants = await fetchRestaurants();
    console.log("RR",restaurants);
    return (
        <main style={containerStyles}>
            <section className={styles.fullWidthSection}>
                <div style={{marginTop: 16}}>
                    <Map />
                </div>
                
            </section>
            <section className={styles.paddingSection} >
                <Divider scale={4} />
                <h1>Restaurants</h1>
                {/* <div style={{position: 'relative', width: 406, height: 244}}>
                    <Image src={"/images/burger-shock.jpg"} alt="Burger" fill />
                </div>    */}
                <Swiper>
                    {restaurants.map((restaurant: any) => (
                        <RestaurantCard key={restaurant} id={restaurant} />
                    ))}
                </Swiper>
            </section>
        </main>
    );
}

const containerStyles: React.CSSProperties = {
    height: '100vh',
}
