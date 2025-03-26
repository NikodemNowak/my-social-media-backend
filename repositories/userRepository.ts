import User, { IUser } from '../models/User';
import { z } from 'zod';
import { registerSchema } from '../validations/userValidation';

export class UserRepository {
    async findById(userId: string) {
        return User.findById(userId).exec();
    }

    async findByEmail(email: string) {
        return User.findOne({ email }).exec();
    }

    async findByUsername(username: string) {
        return User.findOne({ username }).exec();
    }

    async register(userData: z.infer<typeof registerSchema>) {
        const user = new User(userData);
        console.log(user);
        return user.save();
    }

    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser> {
        // Implementation for updating user in the database
        // This is a placeholder, replace with actual implementation
        const user = await this.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, updateData);
        // Ensure the updated user is saved to the database
        return await user.save();
    }
}