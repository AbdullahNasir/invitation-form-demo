const express = require("express");
const router = express.Router();

const invitations = require("./invitations/invitation.route");

router.use("/invitations", invitations);
module.exports = router;
