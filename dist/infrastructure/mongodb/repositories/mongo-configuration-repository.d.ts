import { MongoDb } from '../mongodb';
import { Configurations } from '../../configuration/configurations';
import { ConfigurationRepository } from '../../../domain/configuration-repository';
export declare class MongoConfigurationRepository implements ConfigurationRepository {
    private readonly mongoDb;
    private readonly configuration;
    constructor(mongoDb: MongoDb, configuration: Configurations);
    setDiffGols(gameTime: number, diffGols: number): Promise<void>;
}
