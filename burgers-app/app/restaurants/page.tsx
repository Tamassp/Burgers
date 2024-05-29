import styles from "./../page.module.css"
import Map from "@/components/Map/Map"
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard'
import Swiper from '@/components/Swiper/Swiper'
import Divider from '@/components/Divider/Divider'

async function fetchRestaurants() {
    const response = await fetch("http://localhost:3000/restaurants/restaurants.json");
    return response.json();
}

export default async function Restaurants() {
    
    const restaurants = await fetchRestaurants();

    return (
        <main style={containerStyles}>
            {/* MAP TO BE IMPLEMENTED */}
            <section className={styles.fullWidthSection}>
                <div style={{marginTop: 16}}>
                    <Map />
                </div>  
            </section>

            {/* RESTAURANT SWIPER */}
            <section className={styles.paddingSection} >
                <Divider scale={4} />
                <h1>Restaurants</h1>
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
