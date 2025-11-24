import React from 'react'
import { Button } from '../ui'
import { Loader2, ShoppingCart } from 'lucide-react'

interface AddToCartBtnProps {
    productQuantity: number;
    handleAddToCart: () => void;
    AddTOCartLoading: boolean;
    UI: string;
}

export default function AddToCartBtn({ productQuantity, handleAddToCart, AddTOCartLoading, UI }: AddToCartBtnProps) {
    return (
        <Button
            size="lg"
            className={`relative flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-500 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all group-hover:translate-y-[-2px] hover:bg-gradient-to-l hover:from-primary hover:to-blue-500 duration-700 hover:scale-105 ${UI}`}
            disabled={productQuantity === 0 || AddTOCartLoading}
            onClick={handleAddToCart}
        >
            {
                <Loader2 className={`h-5 w-5 mr-2 animate-spin ${AddTOCartLoading ? "block" : "hidden"}`} />
            }
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
        </Button>
    )
}
