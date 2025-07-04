"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./user.entity");
const common_2 = require("@nestjs/common");
let AuthService = class AuthService {
    userRepo;
    jwtService;
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async getAllUsers() {
        return this.userRepo.find({ select: ['id', 'username', 'email'] });
    }
    async register(username, email, password) {
        const existingUser = await this.userRepo.findOne({
            where: [{ username }, { email }],
        });
        if (existingUser) {
            throw new common_1.ConflictException('El usuario o correo ya existe');
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ username, email, password: hashed });
        await this.userRepo.save(user);
        return { message: 'Usuario registrado' };
    }
    async login(username, password) {
        const user = await this.userRepo.findOneBy({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_2.UnauthorizedException('Credenciales inválidas');
        }
        const token = this.jwtService.sign({ sub: user.id, username: user.username });
        return { token };
    }
    async deleteUserById(id) {
        const result = await this.userRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return { message: `Usuario con id ${id} eliminado` };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map