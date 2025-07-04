import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getAllUsers(): Promise<import("./user.entity").UserEntity[]>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    deleteSelf(req: any): Promise<{
        message: string;
    }>;
}
