'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

interface ILisiting {
  vehicle_type: string;
  reg_no: string;
  kilometers_driven: number;
  price: number;
  usr_inp_city: string;
  city: string;
  seller_phone: string;
  description: string;
  id: number;
  user_id: number;
  is_active: boolean;
  created_at: string;
  owner_email: string;
  rc_details: string;
  images: string[];
}

export default function Home() {
  const { data } = useQuery<ILisiting[]>({
    queryKey: ["listings"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings`),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Custom Backdrop */}
      <section className="mt-28 sm:mt-16 md:mt-28 relative w-full h-[420px] sm:h-[550px] md:h-[520px] lg:h-[450px] xl:h-[600px]">
        <Image
          src="/images/hero-background.png"
          alt="Car marketplace backdrop"
          fill
          priority
          className="object-cover object-bottom-right hidden md:inline-block"
          quality={100}
        />
        <Image
          src="/images/hero-img2.png"
          alt="Car marketplace backdrop"
          fill
          priority
          className="object-cover object-bottom md:hidden"
          quality={100}
        />

        {/* Card Overlay Responsive */}
        <div className="relative z-10 container mx-auto px-8 pt-4 lg:pt-[10%]">
          <Card className="hidden lg:block max-w-sm shadow-lg mb-6 ml-[4%]">
            <CardContent className="py-6 xl:p-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                SELL NOW @ EASE
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-6 font-medium">
                Free Listing & Buying for Lifetime
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 text-base font-bold"
                  asChild
                >
                  <Link href="/sell">List Your Vehicle</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-gray-900 py-4 text-base font-bold border-gray-300"
                  asChild
                >
                  <Link href="/inventory">Browse Inventory</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="lg:hidden w-full mx-auto sm:pt-12">
            <div className="p-6 sm:p-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-nowrap">
                SELL NOW @ EASE
              </h1>
              <p className="text-base sm:text-lg text-white mb-6 font-medium">
                Free Listing & Buying for Lifetime
              </p>

              <div className="flex flex-wrap gap-3 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 text-base font-bold"
                  asChild
                >
                  <Link href="/sell">List Your Vehicle</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-gray-900 py-4 text-base font-bold border-gray-300"
                  asChild
                >
                  <Link href="/inventory">Browse Inventory</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Listings */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Vehicles</h2>
          <p className="text-muted-foreground text-base">Latest listings this week</p>
        </div>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((car) => (
              <Card
                key={car.id}
                className="hover:shadow-xl transition-all overflow-hidden group rounded-lg"
              >
                <div className="relative h-40 sm:h-56">
                  <Image
                    src={car.images[0]}
                    alt={car.images[0]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{car.vehicle_type}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold text-base">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p>{car.city}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full text-sm" variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No vehicles available at the moment</p>
          </div>
        )}
      </section>
    </div>
  );
}
