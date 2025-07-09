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
exports.EnergyController = void 0;
const common_1 = require("@nestjs/common");
const energy_service_1 = require("./energy.service");
const energy_dto_1 = require("../dto/energy.dto");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const api_key_guard_1 = require("../auth/api-key.guard");
const common_4 = require("@nestjs/common");
let EnergyController = class EnergyController {
    energyService;
    constructor(energyService) {
        this.energyService = energyService;
    }
    getLatestMonitorData() {
        return this.energyService.getLastMonitoredData();
    }
    monitorEnergy(energyDto) {
        this.energyService.monitorEnergy(energyDto);
        return { message: 'Monitoreo recibido' };
    }
    getOverloadHistory() {
        return this.energyService.getOverloadHistory();
    }
    deleteOverloadHistory() {
        return this.energyService.deleteOverloadHistory();
    }
    deleteSingleOverload(id) {
        return this.energyService.deleteSingleOverload(id);
    }
};
exports.EnergyController = EnergyController;
__decorate([
    (0, common_3.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('monitor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnergyController.prototype, "getLatestMonitorData", null);
__decorate([
    (0, common_3.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Post)('monitor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [energy_dto_1.EnergyDto]),
    __metadata("design:returntype", void 0)
], EnergyController.prototype, "monitorEnergy", null);
__decorate([
    (0, common_3.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnergyController.prototype, "getOverloadHistory", null);
__decorate([
    (0, common_3.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnergyController.prototype, "deleteOverloadHistory", null);
__decorate([
    (0, common_3.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('history/:id'),
    __param(0, (0, common_2.Param)('id', common_4.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EnergyController.prototype, "deleteSingleOverload", null);
exports.EnergyController = EnergyController = __decorate([
    (0, common_1.Controller)('energy'),
    __metadata("design:paramtypes", [energy_service_1.EnergyService])
], EnergyController);
//# sourceMappingURL=energy.controller.js.map