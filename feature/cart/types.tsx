export interface CartStore {
  items: CartItemType[]
  addItem: (item: Omit<CartItemType, "quantity">) => void
  removeItem: (id: string, customizations: CartCustomization[]) => void
  increaseQty: (id: string, customizations: CartCustomization[]) => void
  decreaseQty: (id: string, customizations: CartCustomization[]) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isItemInCart: (id: string) => boolean
}
export interface CartItemType {
  id: string // menu item id
  name: string
  price: number
  image_url: string
  quantity: number
  customizations?: CartCustomization[]
}
export interface CartCustomization {
  id: string
  name: string
  price: number
  type: string
}
