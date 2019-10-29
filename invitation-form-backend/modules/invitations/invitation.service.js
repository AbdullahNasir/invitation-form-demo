const Invitations = require('./invitation.model');
const {
  HttpException
} = require('../../services/error');
const {
  sendEmail
} = require('../../services/nodemailer');
const {
  INVITATION_ERRORS
} = require('../../error-code');


async function findByEmails(emails) {
  try {
    return await Invitations.find({
      email: {
        $in: emails
      }
    }).exec();
  } catch (err) {
    throw new HttpException(400, err);
  }
}

const findDuplicateEmails = async emails => {
  const existingInvitations = await findByEmails(emails);
  return existingInvitations.map(invitation => invitation.email);
};

const bulkInvite = async emails => {
  let response = [];
  const duplicateEmails = await findDuplicateEmails(emails);

  response = await Promise.all(
    emails.map(async email => {
      let isDuplicate = duplicateEmails.indexOf(email) > -1;
      if (isDuplicate) {
        return {
          email: email,
          isSent: false,
          reason: INVITATION_ERRORS.EMAIL.DUPLICATE
        };
      }

      await saveInvitation(email);
      return await sendInvitation(email);
    })
  );
  return response;
};

const sendInvitation = async email => {
  let mailOption = {
    from: '"Invitation Link" <invitationLink@info.com>',
    to: email,
    subject: 'Invitation Link',
    text: `You're invited.`
  };
  try {
    await sendEmail(mailOption);
    return {
      email: email,
      isSent: true
    };
  } catch (err) {
    console.log(err);
    return {
      email: email,
      isSent: false,
      reason: INVITATION_ERRORS.EMAIL.SERVICE_PROVIDER
    };
  }
};

const saveInvitation = async email => {
  try {
    const invitation = new Invitations({
      email: email
    });
    return await invitation.save();
  } catch (err) {
    throw new HttpException(400, err);
  }
};

module.exports = {
  bulkInvite
};