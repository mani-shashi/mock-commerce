import { useState, useEffect, useCallback } from "react";
import fakeStoreCartApi from "../services/fakeStoreCartApi";

export default function useFakeStoreCart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fakeStoreCartApi.getCart();
            setCart(res?.data ?? res ?? []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (productId, quantity = 1) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fakeStoreCartApi.addToCart({ productId, quantity });
            setCart(res?.data ?? res ?? cart);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fakeStoreCartApi.removeFromCart(productId);
            setCart(res?.data ?? res ?? cart.filter(item => item.productId !== productId));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fakeStoreCartApi.clearCart();
            setCart(res?.data ?? []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
    };
}