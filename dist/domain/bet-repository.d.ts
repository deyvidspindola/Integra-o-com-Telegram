import { Bet, BetFilters } from './entities/bet';
export declare abstract class BetRepository {
    abstract init(database: string): Promise<any>;
    abstract save(bet: Bet): Promise<any>;
    abstract oldBets(filters: BetFilters): Promise<any>;
}
