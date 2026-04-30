import { AddToCartResponse, GetUserCartResponse } from "@/interfaces";
import { ProductsResponse, SingleProductResponse } from "@/types";
import { get } from "http";



const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiServices {
    #baseUrl: string = "";
    constructor() {
        this.#baseUrl = baseUrl ?? "https://ecommerce.routemisr.com/";
    }
    async getAllProducts(): Promise<ProductsResponse> {
        // console.log("Fetching from:", this.baseUrl);
        // console.log("API is " + typeof(this.baseUrl));
        return await fetch(
            this.#baseUrl + "api/v1/products"
            , {
                next: {
                    revalidate: 120
                }
                // cache: "no-store",
            }).then((res) => res.json());
    }
    async getProductDetails(productID: string | string[]): Promise<SingleProductResponse> {
        return fetch(this.#baseUrl + "api/v1/products/" + productID).then(res => res.json());
    }
    #getHeaders() {
        return {
            "Content-Type": "application/json",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZGFmYzIyNjYxNDEyNTE3MjlkZjU1MSIsIm5hbWUiOiIzbGFhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzU5NTkxMTksImV4cCI6MTc4MzczNTExOX0.SLTsuehbTyyiqod0kI2-KeC3XEj_XDd2W9zcoaR9xIo"
        }
    }
    async addProducrtToCart(productId: string): Promise<AddToCartResponse> {
        return fetch(this.#baseUrl + "api/v1/cart", {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: this.#getHeaders()
        }).then(res => res.json())
    }

    async getUserCart(): Promise<GetUserCartResponse> {
        return fetch(this.#baseUrl + "api/v1/cart", {
            headers: this.#getHeaders()
        }).then(res => res.json())
    }

}


class ApiRemove {
    #baseUrl: string = "";
    constructor() {
        this.#baseUrl = baseUrl ?? "https://ecommerce.routemisr.com/";
    }
    #getHeaders() {
        return {
            "Content-Type": "application/json",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZGFmYzIyNjYxNDEyNTE3MjlkZjU1MSIsIm5hbWUiOiIzbGFhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzU5NTkxMTksImV4cCI6MTc4MzczNTExOX0.SLTsuehbTyyiqod0kI2-KeC3XEj_XDd2W9zcoaR9xIo"
        }
    }
    async removeProductCart(productId: string): Promise<any> {
        return fetch(this.#baseUrl + "api/v1/cart/" + productId, {
            method: 'DELETE',
            headers: this.#getHeaders(),
        }).then(res => res.json())
    }
    async clearCart(): Promise<any> {
        return fetch(this.#baseUrl + "api/v1/cart", {
            method: 'DELETE',
            headers: this.#getHeaders(),
        }).then(res => res.json())
    }
}
export const apiRemove = new ApiRemove();
export const apiServices = new ApiServices()





