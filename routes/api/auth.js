const express = require("express");
const validate = require("../middleware/validation");
const schemas = require("../schemas");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");


const {  register, login, getCurrent, logout, updataAvatar } = require("../../controllers");



router.post("/register", upload.single("avatarURL"), validate(schemas.registerSchema), register);
router.post("/login", validate(schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent)
router.post("/logout", authenticate, logout)
router.patch("/avatars", authenticate, upload.single("avatarURL"), updataAvatar)




module.exports = router;
