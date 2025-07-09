import { EnergyDto } from '../dto/energy.dto';
import { Repository } from 'typeorm';
import { OverloadEntity } from './overload.entity';
export declare class EnergyService {
    private readonly overloadRepository;
    private readonly ENERGY_THRESHOLD;
    constructor(overloadRepository: Repository<OverloadEntity>);
    private lastMonitoredData;
    monitorEnergy(energyData: EnergyDto): void;
    getLastMonitoredData(): EnergyDto | null;
    private saveOverload;
    getOverloadHistory(): Promise<OverloadEntity[]>;
    deleteOverloadHistory(): Promise<void>;
    deleteSingleOverload(id: number): Promise<{
        message: string;
    }>;
}
