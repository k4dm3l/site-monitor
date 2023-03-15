import axios from 'axios';

import { ITwilioIntegrationContract } from '../shared/interfaces';

const twilioIntegration = ({
  accountSid,
  authToken,
  twilioPhoneNumber,
}: {
  accountSid: string;
  authToken: string;
  twilioPhoneNumber: string;
}): ITwilioIntegrationContract => ({
  sendSMS: async (to, message) => {
    const apiUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const data = new URLSearchParams({
      To: to,
      From: twilioPhoneNumber,
      Body: message,
    }).toString();

    const apiResponse = await axios.post(apiUrl, data, {
      auth: {
        username: accountSid,
        password: authToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return apiResponse;
  },
});

export default twilioIntegration;
