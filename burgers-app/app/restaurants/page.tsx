
// import { useRouter } from "next/navigation"
import { redirect } from 'next/navigation'
import styles from "./../page.module.css"
import Map from "@/components/Map/Map"
import Image from "next/image"
import TitleDescription from '@/components/TitleDescription/TitleDescription'
import Card from '@/components/Card/Card'
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard'

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
        <main className={styles.main}>
            <section className={styles.section}>
                <Map />
                <h1>Restaurants</h1>
                <div style={{position: 'relative', width: 406, height: 244}}>
                    <Image src={"/images/burger-shock.jpg"} alt="Burger" fill />
                </div>   
                {restaurants.map((restaurant: any) => (
                    <RestaurantCard key={restaurant} id={restaurant} />
                ))}
            </section>
        </main>
    );
}
