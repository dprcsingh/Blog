import * as  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const User = mongoose.model<mongoose.Document>('users', UserSchema);
export default User;
