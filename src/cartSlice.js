import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const existingIndex = state.cartItems.findIndex(
                item => (item.productId === action.payload.productId && item.option === action.payload.option)
            );

            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + action.payload.cartQuantity,
                };
                toast.info("Increased product quantity", {
                    position: "bottom-left",
                });
            } else {
                let tempProductItem = { ...action.payload};
                state.cartItems.push(tempProductItem);
                toast.success("Product added to cart", {
                    position: "bottom-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(
                item => (item.productId === action.payload.productId && item.option === action.payload.option)
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    item => !(item.productId === action.payload.productId && item.option === action.payload.option)
                    // !== in the return logic will not recognize && operator, weird bug[ eg. All option as 'XL' will be deleted even not same productId ]
                    // for another solution, I use ! operator instead, to only filter the matched productId and option[ which mean only matched to be filtered from array ]
                )
                 state.cartItems = nextCartItems;
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        increaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(
                item => (item.productId === action.payload.productId && item.option === action.payload.option)
            );

            if (itemIndex !== null) {
                state.cartItems[itemIndex].cartQuantity += 1;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }
        },clearCart(state,action){
            state.cartItem = null;
            localStorage.removeItem("cartItems",JSON.stringify(state.cartItem));
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { productPrice, cartQuantity } = cartItem;
                    const itemTotal = productPrice * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
    },
});

export const { addToCart, decreaseCartQuantity , increaseCartQuantity , clearCart ,getTotals } = cartSlice.actions;

export default cartSlice.reducer;