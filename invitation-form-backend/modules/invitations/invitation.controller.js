'use strict';
const invitationFormService = require('./invitation.service');
const {
  HttpException
} = require('../../services/error');
const {
  INVITATION_ERRORS
} = require('../../error-code');

// Response handling
let responseObj = {
  status: 200,
  data: [],
};

// this function expects the following the request body to be in the following format
// {emails: string[]}
exports.handleBulkInvitationFlow = async (req, res, next) => {
  let response = {
    ...responseObj
  };
  try {
    if (!req.body.emails || !req.body.emails.length) {
      throw new HttpException(400, INVITATION_ERRORS.EMAIL.REQUIRED);
    }
    const invitationResponse = await invitationFormService.bulkInvite(
      req.body.emails
    );
    response.data = invitationResponse;
    response.status = 201;
    res.json(response);

  } catch (err) {
    next(err);
  }
};