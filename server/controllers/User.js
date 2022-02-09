const crypto = require("crypto");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const models = require("../models/index.js");

exports.create = async (req, res) => {
 
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);

    const hash = await bcrypt.hash(req.body.password, salt);
    let user = await models.User.create({
      email: req.body.email,
      password: hash,
    });

    user = user.toJSON();
    user.isAutenticated = true;
    delete user.password;

    req.session.user = user;
    console.log(req.session.user);

    res.status(200).json(req.session.user);
  } catch (err) {
    console.log(err);
  }

  //   sin usar el await
  //bcrypt.genSalt(10, (err, salt)=>{
  //   bcrypt.hash(req.body.password, salt, (err,hash)=>{
  //     models.User.create({
  //       email: req.body.email,
  //       password: hash,
  //     })
  //   })
  // })
};

exports.login = async (req, res) => {
  
    //login here
    let user = await models.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(401).end("correo no existe");
    }
    // user.password
    // bcrypt.compare()
    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid === false) {
      res.status(401).end("usurio o contraseña incorrectos");
    }
    user = user.toJSON();
    user.isAutenticated = true;
    delete user.password;

    req.session.user = user;
    res.json(req.session.user);
  }


exports.sendResetPasswordRequest = async (req, res) => {
  const user = await models.User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(404).end("No existe ese correo en la base");
  }
  const token = crypto.randomBytes(16).toString("hex");
  await user.update({
    resetPasswordToken: token,
    resetPasswordTokenExpiration: moment().add(30, "minute").format(),
  });

  res.json(token);
};

exports.getUserByResetPasswordToken = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        resetPasswordToken: req.params.token,
      },
    });
    if (!user) {
      return res.status(500).end("Ningun usuario Encontrado");
    }
    res.json(user);
  } catch (err) {
    throw new Error(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).end("No existe ese usuario en la base");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    await user.update({
      password: hash,
      resetPasswordTokenExpiration: null,
    });
    res.end()
  } catch (err) {
    throw new Error(err);
  }
};
