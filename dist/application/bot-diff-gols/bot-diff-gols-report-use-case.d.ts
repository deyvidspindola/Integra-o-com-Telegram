import { BetRepository } from '../../domain/bet-repository';
import { Configurations } from '../../infrastructure/configuration/configurations';
import { MessageRepository } from '../../domain/message-repository';
import { BotDiffGolsRepository } from '../../domain/bots/repository/bot-diff-gols-repository';
export declare class BotDiffGolsReportUseCase {
    private readonly configuration;
    private readonly betRepository;
    private readonly message;
    private readonly botDiffGolsRepository;
    constructor(configuration: Configurations, betRepository: BetRepository, message: MessageRepository, botDiffGolsRepository: BotDiffGolsRepository);
    execute(): Promise<void>;
    process(): Promise<void>;
}
