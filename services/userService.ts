import { z } from 'zod';
import { UserRepository } from '../repositories/userRepository';
import { registerSchema } from '../validations/userValidation';
import bcrypt from 'bcrypt';
import { generateAuthTokens } from '../utils/jwt';
import { CloudinaryService } from '../utils/cloudinaryService';

export class UserService {
  constructor(private userRepository: UserRepository) { }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion || 0
    }

    const tokens = generateAuthTokens(payload);
    return tokens;
  }

  async register(userData: z.infer<typeof registerSchema>) {
    const exisitingUser = await this.userRepository.findByEmail(userData.email);
    if (exisitingUser) {
      throw new Error('Email already exists');
    } else {
      const existingUser = await this.userRepository.findByUsername(userData.username);
      if (existingUser) {
        throw new Error('Username already exists');
      }
    }

    const newUser = await this.userRepository.register(userData);
    return newUser;
  }

  async getUserProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateAvatar(userId: string, imageBase64: string): Promise<any> {
    try {
      // Upload to Cloudinary
      const uploadResult = await CloudinaryService.uploadImage(imageBase64, 'avatars'
      );

      // Update user with new avatar URL
      return await this.userRepository.updateUser(userId, {
        avatarUrl: uploadResult.secure_url
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update avatar: ${error.message}`);
      } else {
        throw new Error('Failed to update avatar');
      }
    }
  }

  async getUserAvatar(userId: string): Promise<string> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.avatarUrl) {
      // Return default avatar
      return CloudinaryService.getImageUrl('avatars/default.jpg');
    }
    return user.avatarUrl;
  }
}