const express = require("express");
const router = express.Router();
const invitationsController = require("./invitation.controller");

router.post("/bulk", invitationsController.handleBulkInvitationFlow);

module.exports = router;
