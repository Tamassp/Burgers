import Image from "next/image";
import styles from "./page.module.css";
// import { useRouter } from "next/navigation"
import Link from "next/link"


export default function Home() {
  // const router = useRouter();
  return (
    <main className={styles.main}>
        {/* NAVIGATING USING BUTTON */}
        {/* <button className={styles.button} onClick={() => router.replace("/restaurants")}>
          Navigate to Restaurants
        </button> */}

         {/* NAVIGATING USING LINK */}
        <Link href="/restaurants">
          Navigate to Restaurants
        </Link>
    </main>
  );
}
