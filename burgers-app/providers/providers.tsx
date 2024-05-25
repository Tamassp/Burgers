'use client';

import { RestaurantProvider } from "@/contexts/RestaurantContext"



export function Providers({ children }: { children: React.ReactNode}) {
  return (
    <RestaurantProvider>
        {children}
    </RestaurantProvider>
  );
}