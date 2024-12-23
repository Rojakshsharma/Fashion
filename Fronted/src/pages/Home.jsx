import React from 'react'
import Hero from '../components/Hero'
import LatetsCollection from '../components/LatetsCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
function Home() {
  return (
    <div>
      <Hero></Hero>
      <LatetsCollection></LatetsCollection>
      <BestSeller></BestSeller>
      <OurPolicy></OurPolicy>
      <NewsLetter></NewsLetter>
    </div>
  )
}

export default Home