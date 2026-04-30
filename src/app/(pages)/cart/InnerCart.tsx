
// 'use client';
// import { Button } from '@/components';
// import CartProduct from '@/components/products/CartProduct';
// import { formatPrice } from '@/helpers/currency';
// import { GetUserCartResponse } from '@/interfaces'
// import { apiRemove, apiServices } from '@/services/api';
// import { Trash2 } from 'lucide-react';
// import Link from 'next/link';
// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import EmptyCart from './EmptyCartMotion';


// interface InnerCartProps {
//     cartData: GetUserCartResponse;
//     setLoading?: (value: boolean) => void;
// }
// export default function InnerCart({ cartData }: InnerCartProps) {
//     const [InnertCartData, setInnertCartData] = useState(cartData);
//     const [loading, setLoading] = useState(false);


//     async function handleRemoveCartItem(productId: string, setLoading: (value: boolean) => void) {
//         // const router = useRouter()
//         setLoading(true);
//         const responce = await apiRemove.removeProductCart(productId);
//         toast.success('Product removed from cart', {
//             duration: 2500,
//             position: 'bottom-right',
//         });
//         setLoading(false);
//         const UpdateCartresponce = await apiServices.getUserCart();
//         setInnertCartData(UpdateCartresponce);

//         // router.refresh();
//     }

//     async function handelClearCart() {
//         const response = await apiRemove.clearCart();
//         toast.success('Cart cleared successfully', {
//             duration: 2500,
//             position: 'bottom-right',
//         });
//         const UpdateCartresponce = await apiServices.getUserCart();
//         setInnertCartData(UpdateCartresponce);
//     }
//     return (
//         <>
//             {/* Header */}
//             {InnertCartData.numOfCartItems > 0 ?
//                 <>
//                     <div className="mb-8">
//                         <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
//                         {InnertCartData.numOfCartItems > 0 && <p className="text-muted-foreground">
//                             {InnertCartData.numOfCartItems} item
//                             {InnertCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
//                         </p>}
//                     </div >

//                     {/* <div className='bg-red-500 w-fit flex flex-col items-center justify-center m-auto'>hello</div> */}


//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         {/* Cart Items */}
//                         <div className="lg:col-span-2">
//                             <div className="space-y-4">
//                                 {InnertCartData.data.products.map((item) => (
//                                     <CartProduct handleRemoveCartItem={handleRemoveCartItem} item={item} key={item._id} />
//                                 ))}
//                             </div>

//                             {/* Clear Cart */}
//                             <div className="mt-6">
//                                 <Button onClick={handelClearCart} variant="default" className="flex items-center gap-2 hover:bg-red-500">
//                                     <Trash2 className="h-4 w-4 mr-2" />
//                                     Clear Cart
//                                 </Button>
//                             </div>

//                         </div>

//                         {/* Order Summary */}
//                         <div className="lg:col-span-1">
//                             <div className="border rounded-lg p-6 sticky top-4">
//                                 <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

//                                 <div className="space-y-2 mb-4">
//                                     <div className="flex justify-between">
//                                         <span>Subtotal ({InnertCartData.numOfCartItems} items)</span>
//                                         <span>{formatPrice(InnertCartData.data.totalCartPrice)}</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>Shipping</span>
//                                         <span className="text-green-600">Free</span>
//                                     </div>
//                                 </div>

//                                 <hr className="my-4" />

//                                 <div className="flex justify-between font-semibold text-lg mb-6">
//                                     <span>Total</span>
//                                     <span>{formatPrice(InnertCartData.data.totalCartPrice)}</span>
//                                 </div>

//                                 <Button className="w-full" size="lg">
//                                     Proceed to Checkout
//                                 </Button>

//                                 <Button variant="outline" className="w-full mt-2" asChild>
//                                     <Link href="/products">Continue Shopping</Link>
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//                 :

//                 // <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-inner">
//                 //     <div className="text-6xl mb-4">🛒</div>
//                 //     <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
//                 //         سلتك فاضية!
//                 //     </h2>
//                 //     <p className="text-muted-foreground mb-6">
//                 //         أضف منتجاتك الآن واستمتع بتجربة التسوق 😉
//                 //     </p>
//                 //     <Link href="/products">
//                 //         <Button className="px-6 py-3 bg-gradient-to-r from-primary to-blue-500 text-white font-medium rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
//                 //             أضف منتجاتك الآن
//                 //         </Button>
//                 //     </Link>
//                 // </div>

//                 <EmptyCart />
//             }
//         </>
//     )
// }

'use client';
import { Button } from '@/components';
import CartProduct from '@/components/products/CartProduct';
import { formatPrice } from '@/helpers/currency';
import { GetUserCartResponse } from '@/interfaces'
import { apiRemove, apiServices } from '@/services/api';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import EmptyCart from './EmptyCartMotion';

interface InnerCartProps {
    cartData: GetUserCartResponse;
}

export default function InnerCart({ cartData }: InnerCartProps) {
    const [InnertCartData, setInnertCartData] = useState(cartData);

    async function handleRemoveCartItem(productId: string) {
        await apiRemove.removeProductCart(productId);

        toast.success('Product removed from cart', {
            duration: 2500,
            position: 'bottom-right',
        });

        const updatedCart = await apiServices.getUserCart();
        setInnertCartData(updatedCart);
    }

    async function handelClearCart() {
        await apiRemove.clearCart();

        toast.success('Cart cleared successfully', {
            duration: 2500,
            position: 'bottom-right',
        });

        const updatedCart = await apiServices.getUserCart();
        setInnertCartData(updatedCart);
    }

    return (
        <>
            {InnertCartData.numOfCartItems > 0 ? (
                <>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                        <p className="text-muted-foreground">
                            {InnertCartData.numOfCartItems} item
                            {InnertCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {InnertCartData.data.products.map((item) => (
                                    <CartProduct
                                        key={item._id}
                                        item={item}
                                        handleRemoveCartItem={handleRemoveCartItem}
                                    />
                                ))}
                            </div>

                            <div className="mt-6">
                                <Button
                                    onClick={handelClearCart}
                                    className="flex items-center gap-2 hover:bg-red-500"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear Cart
                                </Button>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="border rounded-lg p-6 sticky top-4">
                                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({InnertCartData.numOfCartItems} items)</span>
                                        <span>{formatPrice(InnertCartData.data.totalCartPrice)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between font-semibold text-lg mb-6">
                                    <span>Total</span>
                                    <span>{formatPrice(InnertCartData.data.totalCartPrice)}</span>
                                </div>

                                <Button className="w-full" size="lg">
                                    Proceed to Checkout
                                </Button>

                                <Button variant="outline" className="w-full mt-2" asChild>
                                    <Link href="/products">Continue Shopping</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <EmptyCart />
            )}
        </>
    )
}