import { EnergyService } from './energy.service';
import { EnergyDto } from '../dto/energy.dto';
export declare class EnergyController {
    private readonly energyService;
    constructor(energyService: EnergyService);
    getLatestMonitorData(): EnergyDto | null;
    monitorEnergy(energyDto: EnergyDto): {
        message: string;
    };
    getOverloadHistory(): Promise<import("./overload.entity").OverloadEntity[]>;
    deleteOverloadHistory(): Promise<void>;
    deleteSingleOverload(id: number): Promise<{
        message: string;
    }>;
}
