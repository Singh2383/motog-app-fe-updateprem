'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const plans = [
  {
    name: 'Basic',
    monthly: 299,
    yearly: 2999,
    features: ['1 Car Listing', '3 Days Validity', 'No Ads', 'Email Support']
  },
  {
    name: 'Pro',
    monthly: 799,
    yearly: 7999,
    features: ['5 Car Listings', '15 Days Validity', 'Priority Support', 'Ad Free']
  },
  {
    name: 'Premium',
    monthly: 1499,
    yearly: 14999,
    features: ['Unlimited Listings', '30 Days Validity', 'Featured Listings', 'Phone Support']
  }
]

const SubscriptionPage = () => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-gray-600">Switch between monthly and yearly plans</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <span className="text-sm">Monthly</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className="text-sm">Yearly</span>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="shadow-xl hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">
                ₹{isYearly ? plan.yearly : plan.monthly}
                <span className="text-sm text-gray-500 ml-1">/ {isYearly ? 'year' : 'month'}</span>
              </div>
              <ul className="text-gray-700 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Subscribe</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SubscriptionPage
