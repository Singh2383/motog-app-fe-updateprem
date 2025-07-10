'use client'

import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const plans = [
  {
    name: 'FREE',
    monthly: 0,
    yearly: 0,
    features: ['1 Listing per Month', 'Lifetime Validity', 'Customer Service Support', 'No Promotion Credit'],
    popular: false,
  },
  {
    name: 'Dealer',
    monthly: 299,
    yearly: 3500,
    features: ['20 Listing per Month', 'Lifetime Validity', 'Customer Service Support', 'No Promotion Credit'],
    popular: true,
  },
  {
    name: 'Dealer Plus',
    monthly: 899,
    yearly: 10599,
    features: ['Unlimited Listings', 'Lifetime Validity', 'Featured Listings', 'Phone Support'],
    popular: false,
  },
]

const SubscriptionPage = () => {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
<header className="bg-white shadow-md sticky top-0 z-10">
  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-blue-600">MotoG</h1>
    <nav className="text-gray-600 font-medium space-x-4 hidden md:block">
      <a href="#" className="hover:text-blue-600">Home</a>
      <a href="#" className="hover:text-blue-600">Pricing</a>
      <a href="#" className="hover:text-blue-600">Contact</a>
    </nav>
  </div>
</header>

{/* 👇 Push content below the header */}
<div className="pt-10 px-4 text-center">
  <h2 className="text-4xl font-bold text-white"></h2>
  <p className="text-white/90 mt-2"></p>
</div>


      {/* Title & Toggle */}
      <div className=" text-center py-10 px-4">
        <h2 className="text-4xl font-bold text-gray-800">Choose Your Plan</h2>
        <p className="text-gray-600 mt-2 font-extralarge">Flexible Pricing for all Users</p>

        <div className="flex justify-center items-center gap-4 mt-6">
          <span className="text-sm font-medium text-gray-600">Monthly</span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-sm font-medium text-gray-600">Yearly</span>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-16">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.name

          return (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
                 className={`relative rounded-2xl border p-6 shadow-md bg-red-600 text-white cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
                 isSelected ? 'ring-4 ring-white border-white' : 'border-red-500'
  }`}
>

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Selected Check Icon */}
              {isSelected && (
                <CheckCircle className="absolute top-13 right-5 text-white-600 w-6 h-6" />
              )}

              {/* Plan Info */}
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>

              <p className="text-4xl font-bold text-white">
              ₹{isYearly ? plan.yearly : plan.monthly}
              <span className="text-base text-white/80 font-medium">/ {isYearly ? 'year' : 'month'}</span>
            </p>


              {/* Features */}
              <ul className="mt-6 space-y-3 text-sm text-white/90">
              {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center">
               <span className="inline-block w-2 h-2 mr-2 bg-white rounded-full"></span>
             {feature}
            </li>
            ))}
            </ul>


              {/* Subscribe Button */}
              <button
  className={`mt-6 w-full py-2 px-4 rounded-lg font-semibold transition duration-300 ${
    isSelected
      ? 'bg-black text-white-600 hover:bg-black-100'
      : 'bg-red-100 text-black hover:bg-black-200'
  }`}
>
  {isSelected ? 'Selected' : 'Select Plan'}
</button>

            </div>
            
          )
        })}
      </div>{/* Plan Comparison Table */}
<div className="max-w-6xl mx-auto px-4 mt-16 mb-24 text-black">
  <h3 className="text-2xl font-semibold text-grey-800 mb-6 text-center">Plan Feature Comparison</h3>

  <div className="overflow-x-auto border rounded-lg bg-white shadow-sm ">
    <table className="min-w-full text-sm text-left text-black-700 border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-4 border-b font-semibold">Feature</th>
          {plans.map((plan) => (
            <th key={plan.name} className="p-4 border-b text-center font-semibold">{plan.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          'Car Listings',
          'Validity',
          'Promotion Credit',
          'Support Type',
          'Featured Listing',
        ].map((feature, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="p-4 border-t">{feature}</td>
            {plans.map((plan) => {
              let value = '—'
              if (feature === 'Car Listings') {
                value = plan.name === 'FREE' ? ' 1 Listing / Month' : plan.name === 'Dealer' ? '20' : 'Unlimited'
              } else if (feature === 'Validity') {
                value = plan.name === 'FREE' ? 'Lifetime' : plan.name === 'Dealer' ? 'Lifetime' : 'Lifetime'
              } else if (feature === 'Promotion Credit') {
                value = plan.name === 'FREE' ? 'No' : plan.name === 'Dealer'? 'No': '1 Week Credit'
              } else if (feature === 'Support Type') {
                value = plan.name === 'FREE' ? 'Email' : plan.name === 'Dealer' ? 'Priority' : 'Phone'
              } else if (feature === 'Featured Listing') {
                value = plan.name === 'Dealer Plus' ? '✓' : '—'
              }

              return (
                <td
                  key={plan.name + feature}
                  className="p-4 border-t text-center"
                >
                  {value === '✓' ? (
                    <span className="text-green-500 font-bold text-lg">✓</span>
                  ) : (
                    <span className="text-black-500">{value}</span>
                  )}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  )
}

export default SubscriptionPage
