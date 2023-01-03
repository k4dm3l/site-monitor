import bcrypt from 'bcrypt';

import env from '../configs';
import { ICryptContract } from '../shared/interfaces';

const Crypt = (): ICryptContract => ({
  comparePassword: async (plainPassword, hashedPassword) => {
    const result = await bcrypt.compare(plainPassword, hashedPassword);

    return result;
  },
  hashPassword: async (plainPassword) => {
    const salt = await bcrypt.genSalt(Number(env.CRYPT_ROUNDS));
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    return hashedPassword;
  },
});

export default Crypt;
