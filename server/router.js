const express = require("express");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const userController = require("./controllers/User.js");
const { route } = require("express/lib/application");

const router = express.Router();

router.put("/api/users/:id/resetPassword",  celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required().min(6),
  })
}), userController.resetPassword);

router.get(
  "/api/users/tokens/:token",
  userController.getUserByResetPasswordToken
  // console.log ('entre')
);

// router.post(
//   "/api/users",
//   [
//     check("email").isEmail().normalizeEmail(),
//     check("password").isLength({ min: 6 }),
//   ],
//   userController.create
// );

router.post(
  `/api/users`,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    })
  }),
  userController.create
);

router.post(
  "/api/users/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    })
  }),
  userController.login
);

router.post(
  "/api/users/sendResetPasswordRequest",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
    })
  }),
  userController.sendResetPasswordRequest
);

router.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    res.end();
  });
  // console.log('test 123')
  // res.end()
});

router.use(errors())
module.exports = router;
