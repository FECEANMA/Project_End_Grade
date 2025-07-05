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
exports.EnergyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const overload_entity_1 = require("./overload.entity");
let EnergyService = class EnergyService {
    overloadRepository;
    ENERGY_THRESHOLD = 2000;
    constructor(overloadRepository) {
        this.overloadRepository = overloadRepository;
    }
    lastMonitoredData = null;
    monitorEnergy(energyData) {
        const { voltage, current, power } = energyData;
        this.lastMonitoredData = energyData;
        console.log(`Monitorizando energía: Voltaje: ${voltage}V, Corriente: ${current}A, Potencia: ${power}W`);
        if (power > this.ENERGY_THRESHOLD) {
            this.saveOverload({ voltage, current, power, status: 'Sobrecargado', timestamp: new Date() });
        }
    }
    getLastMonitoredData() {
        return this.lastMonitoredData;
    }
    async saveOverload(overloadData) {
        const overload = this.overloadRepository.create(overloadData);
        await this.overloadRepository.save(overload);
    }
    async getOverloadHistory() {
        return this.overloadRepository.find();
    }
    async deleteOverloadHistory() {
        return this.overloadRepository.clear();
    }
    async deleteSingleOverload(id) {
        const result = await this.overloadRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`No se encontró la sobrecarga con id ${id}`);
        }
        return { message: `Sobrecarga con id ${id} eliminada` };
    }
};
exports.EnergyService = EnergyService;
exports.EnergyService = EnergyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(overload_entity_1.OverloadEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EnergyService);
//# sourceMappingURL=energy.service.js.map