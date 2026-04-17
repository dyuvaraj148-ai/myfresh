import User from "../models/User.js";

export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;

        const userId = req.user.userId; // ✅ FROM TOKEN

        const cartArray = [];
        if (cartItems && typeof cartItems === 'object' && !Array.isArray(cartItems)) {
            for (const productId in cartItems) {
                const quantity = Number(cartItems[productId]);
                if (
                    productId &&
                    productId !== 'undefined' &&
                    productId !== 'null' &&
                    !productId.includes('undefined') &&
                    !productId.includes('null') &&
                    quantity > 0
                ) {
                    cartArray.push({ productId, quantity });
                }
            }
        }

        await User.findByIdAndUpdate(userId, { cartItems: cartArray });

        return res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};