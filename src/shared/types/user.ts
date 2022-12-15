import { Document } from 'mongoose';

type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  hashPassword: string;
  tosAgreement: boolean;
}

export default UserDocument;
