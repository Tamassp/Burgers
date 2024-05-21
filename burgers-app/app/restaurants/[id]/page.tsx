
'use client'
import { useRouter } from "next/navigation"
import styles from "./../../page.module.css"

export default function Restaurant({ params }: { params: { id: string } }) {
    const router = useRouter();
    

    return (
        <main className={styles.main}>
        <h1>Restaurant {params.id}</h1>
        
        </main>
    );
}
