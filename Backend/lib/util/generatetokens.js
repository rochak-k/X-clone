import jwt  from "jsonwebtoken";
export const generateTokenandSetCookie = (userid, res)=>{
  const  token = jwt.sign({id: userid}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000 
    });
    return token;
}