import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import envs from '../../config/configuration';

class BaseHelper {
    public hashPassword(password: string) {
        const saltRound = envs.SALT;
        const salt = bcrypt.genSaltSync(saltRound);
        return bcrypt.hashSync(password, salt);
    }

}
const baseHelper = new BaseHelper();
export default baseHelper;