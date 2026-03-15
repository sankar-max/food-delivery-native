import { Models } from "react-native-appwrite"

export interface MenuItem extends Models.DefaultRow {
  name: string
  price: number
  image_url: string
  description: string
  calories: number
  protein: number
  rating: number
  type: string
}

export interface Category extends Models.DefaultRow {
  name: string
  description: string
}
