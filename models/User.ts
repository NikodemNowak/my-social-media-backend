import { Document, ObjectId } from 'mongoose';
import { Schema } from 'mongoose';
import { model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    tokenVersion: number;
    avatarUrl: string;
    bio: string;
    friends: ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,   
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokenVersion: {
        type: Number,
        default: 0
    },
    avatarUrl: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true });

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.tokenVersion;

        if (ret.avatarUrl === undefined) {
            ret.avatarUrl = '';
        }

        if (ret.bio === undefined) {
            ret.bio = '';
        }

        return ret;
    }
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ friends: 1 });

const User = model<IUser>('User', userSchema);
export default User;