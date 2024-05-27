'use client';

import { RestaurantProvider } from "@/contexts/RestaurantContext"
import { UserProvider } from "@/contexts/UserContext"



export function Providers({ children }: { children: React.ReactNode}) {
  return (
    <UserProvider>
      <RestaurantProvider>
          {children}
      </RestaurantProvider>
    </UserProvider>
  );
}