'use client';
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui'
import { formatPrice } from '@/helpers/currency'
import { CartProduct as CartProductI, InnerCartProduct } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { s } from 'framer-motion/client';

interface CartProductProps {
    item: CartProductI<InnerCartProduct>
    handleRemoveCartItem: (productId: string, setLoading: (value: boolean) => void) => void;
}

export default function CartProduct({ item, handleRemoveCartItem }: CartProductProps) {
    const [loading, setLoading] = useState(false);
    // handleRemoveCartItem(item.product._id, setLoading);
    const [count, setCount] = useState(item.count);


    return (<div key={item._id} className="flex gap-4 p-4 border rounded-lg">
        <div className="relative w-20 h-20 flex-shrink-0">
            <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                className="object-cover rounded-md"
                sizes="80px"
            />
        </div>

        <div className="flex-1 min-w-0">
            <h3 className="font-semibold line-clamp-2">
                <Link
                    href={`/products/${item.product.id}`}
                    className="hover:text-primary transition-colors"
                >
                    {item.product.title}
                </Link>
            </h3>
            <p className="text-sm text-muted-foreground">
                {item.product.brand?.name}
            </p>
            <p className="font-semibold text-primary mt-2">
                {formatPrice(item.price)}
            </p>
        </div>

        <div className="flex flex-col items-end gap-2">
            <Button onClick={() => handleRemoveCartItem(item.product._id, setLoading)
                // console.log('Remove item', item._id);
                // handleRemoveCartItem();
                // document.location.reload();
            } className='hover:bg-red-500!' variant="ghost" size="sm">
                {loading ? <Loader2 className='animate-spin' /> : <Trash2 className="h-4 w-4" />}
            </Button>

            <div className="flex items-center gap-2">
                {/* <Button onClick={() => {item.count-1}} variant="outline" size="sm">
                    <Minus className="h-4 w-4" />
                </Button> */}
                {/* <Button
                    onClick={() => setCount(count - 1),<CartProduct item={item} handleRemoveCartItem={handleRemoveCartItem} />}
                    variant="outline"
                    size="sm"
                >
                    <Minus className="h-4 w-4" />
                </Button> */}
                <Button
                    onClick={() => {
                        setCount(count - 1);
                        handleRemoveCartItem(item.product._id, setLoading);
                    }}
                    variant="outline"
                    size="sm"
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{count}</span>
                <Button
                    onClick={async () => { await handleRemoveCartItem(item.product._id, setLoading); }}
                    variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div >
    )
}
