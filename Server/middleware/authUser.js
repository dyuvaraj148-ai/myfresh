import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: "Not AuthoriZed" });
    }
    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecoded) {
            req.user = tokenDecoded;
            return next();
        }
        return res.json({ success: false, message: "Not Authorized" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default authUser;