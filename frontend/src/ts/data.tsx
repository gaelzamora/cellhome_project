import iconMac from '../assets/mac.png'
import iconIphone from '../assets/iphone.png'
import iconIpad from '../assets/ipads.png'
import iconAppleWatch from '../assets/applewatch.png'
import iconAirPods from '../assets/airpods.png'
import iconAccesories from '../assets/accesories.png'

import bgIphone from '../assets/card-1.jpg'
import bgAppleVision from '../assets/card-2.jpg'
import bgAppleWatch from '../assets/card-3.jpg'
import bgMac from '../assets/card-4.jpg'
import bgIpad from '../assets/card-5.jpg'
import bgBlackUnity from '../assets/card-7.jpg'

import bgSpecialist from '../assets/card-8.jpg'
import bgNew from '../assets/card-9.jpg'
import bgToday from '../assets/card-10.jpg'

export const categories = [
    {name: 'Mac', image: iconMac},
    {name: 'iPhone', image: iconIphone},
    {name: 'iPad', image: iconIpad},
    {name: 'Apple Watch', image: iconAppleWatch},
    {name: 'AirPods', image: iconAirPods},
    {name: 'Accessories', image: iconAccesories},
  ]
  
export const banners = [
    {product: "Apple Vision Pro", title: "Prepare for pre-order.", description: "Pre-order starting 1.19 at 5:00 a.m. PT", img: bgAppleVision, isWhite: true},
    {product: "iPhone 15 Pro", title: "Titanium", description: "From $999 or $41.62/mo. for 24 mo.*", img: bgIphone, isWhite: false},
    {product: "Apple Watch Series 9", title: "Smarter. Brighter. Mighter.", description: "From $399 or $33.257mo. for 12 mo.*", img: bgAppleWatch, isWhite: false},
    {product: "Macbook Pro 14'' and 16'' ", title: "Mind-blowing. Head-turning.", description: "From $1599 or $133.25/mo. for 12 mo.*", img: bgMac, isWhite: true},
    {product: "Black Unity Sport Band", title: "Unity in bloom.", description: "$49.00", img: bgBlackUnity, isWhite: false},
    {product: "Ipad", title: "Lovable.Drawable.Magicial", description: "From $449 or $39.41/mo. for 12 mo.*", img: bgIpad, isWhite: true},
]

export const helpBanners = [
  {type: "Apple Specialist", title: "Shop one on one with a Specialist. Online or in a store.", description: "", isColor: true, img: bgSpecialist},
  {type: "New", title: "Shop with a Specialist over video.", description: "Choose your next device in a guided, one-way video session.", isColor: false, img:bgNew},
  {type: "Today at apple", title: "Join free sessions at your Apple Store.", description: "Learn about the latest features and how to go further with your Apple devices.", isColor: true, img: bgToday}
]