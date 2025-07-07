import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<UserEntity>, jwtService: JwtService);
    getAllUsers(): Promise<UserEntity[]>;
    register(username: string, email: string, password: string): Promise<{
        message: string;
    }>;
    login(username: string, password: string): Promise<{
        token: string;
    }>;
    deleteUserById(id: string): Promise<{
        message: string;
    }>;
}
