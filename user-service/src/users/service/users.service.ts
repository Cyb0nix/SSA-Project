import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../controller/dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    ) {}

    private userEntityToDto(user: Partial<UserEntity>): UserDto {
        const userDto = new UserDto();
        userDto.id = user.id;
        userDto.email = user.email;
        userDto.firstname = user.firstname;
        userDto.lastname = user.lastname;
        userDto.role = user.role;
        userDto.walletBalance = user.walletBalance;
        return userDto;
    }

    // Get me
    async getMe(id: string): Promise<UserDto> {
        return this.userEntityToDto(await this.getUserById(id));
    }

    // Delete me
    async deleteMe(id: string): Promise<boolean> {
        return this.deleteUser(id);
    }

    // Update me
    async updateMe(id: string, updateData: Partial<UserEntity>): Promise<UserDto> {
        return this.userEntityToDto(await this.updateProfile(id, updateData));
    }

    // Create a user
    async createUser(user: Partial<UserEntity>): Promise<string> {
        const createdUser = await this.userRepo.save(user);
        return createdUser.id;
    }

    // Fetch user by ID
    async getUserById(id: string): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return this.userEntityToDto(user);
    }

    // Update user profile
    async updateProfile(id: string, updateData: Partial<UserEntity>): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        await this.userRepo.update(id, updateData);
        return this.getUserById(id);
    }

    // Update wallet balance
    async updateWalletBalance(id: string, amount: number): Promise<number> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        user.walletBalance += amount;
        await this.userRepo.save(user);
        return user.walletBalance;
    }

    // Get wallet balance
    async getWalletBalance(id: string): Promise<number> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return user.walletBalance;
    }

    // Update user role (admin feature)
    async updateUserRole(id: string, role: string): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        user.role = role;
        await this.userRepo.save(user);
        return this.userEntityToDto(user);
    }

    // Delete user
    async deleteUser(id: string): Promise<boolean> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        await this.userRepo.delete({ id });
        return true;
    }

    // Fetch all users
    async getUsers(): Promise<UserEntity[]> {
        return this.userRepo.find();
    }
}
