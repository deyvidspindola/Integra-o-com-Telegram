import { Configurations } from '../configuration/configurations';
export declare class BetApi {
    private config;
    constructor(config: Configurations);
    betApiKey: string;
    setApiKey(betApiKey: string): Promise<void>;
    getBetsInplay(): Promise<any>;
    getMock(): Promise<{
        data: {
            success: number;
            pager: {
                page: number;
                per_page: number;
                total: number;
            };
            results: {
                id: string;
                sport_id: string;
                time: string;
                time_status: string;
                league: {
                    id: string;
                    name: string;
                };
                home: {
                    id: string;
                    name: string;
                };
                away: {
                    id: string;
                    name: string;
                };
                ss: string;
                our_event_id: string;
                r_id: string;
                ev_id: string;
                updated_at: string;
            }[];
        };
    }>;
}
