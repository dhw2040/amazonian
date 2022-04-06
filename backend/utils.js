import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "wowSuper!@$#$Secret",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const author = req.headers.authorization;
  if (author) {
    const token = author.slice(7, author.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "wowSuper!@$#$Secret",
      (err, decode) => {
        if (err) {
          //Token invalid
          return res.status(401).send({ message: "Invalid Token." });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    return res.status(401).send({ message: "No Token." });
  }
};
