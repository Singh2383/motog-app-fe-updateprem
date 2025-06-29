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
  //const setShowLogin = useLoginPopup(state => state.setShow);

  const { data } = useQuery<ILisiting[]>({
    queryKey: ["listings"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings`)
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Custom Backdrop */}
      <section className="mt-28 sm:mt-20 relative w-full h-[300px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
        <Image
          src="/images/hero-background.png"
          alt="Car marketplace backdrop"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />

        {/* Overlay Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl">
              SELL NOW @ EASE
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 font-medium drop-shadow-md">
              Free Listing & Buying for Lifetime
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600/90 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold"
                asChild
              >
                <Link href={"/sell"}>
                  List Your Vehicle
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-900 px-8 py-6 text-lg font-bold"
              >
                <Link href={"/inventory"}>
                  Browse Inventory
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Car Listings */}
      <section className="container mx-au/90to px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Vehicles</h2>
          <p className="text-muted-foreground text-lg">Most popular listings this week</p>
        </div>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((car) => (
              <Card key={car.id} className="hover:shadow-xl transition-all overflow-hidden group">
                <div className="relative h-56 sm:h-64">
                  <Image
                    src={car.images[0]}
                    alt={car.images[0]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{car.vehicle_type}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-semibold text-lg">{car.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
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