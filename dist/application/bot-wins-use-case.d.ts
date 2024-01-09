import { ChatRepository } from '../domain/chat-repository';
import { RequestsRepository } from '../domain/requests-repository';
import { Configurations } from '../infrastructure/configuration/configurations';
import { MessageRepository } from '../domain/message-repository';
import { BotWinsRepository } from '../domain/bots/repository/bot-wins-repository';
import { BetRepository } from '../domain/bet-repository';
export declare class BotWinsUseCase {
    private readonly configuration;
    private readonly requests;
    private readonly botWinsRepository;
    private readonly chat;
    private readonly message;
    private readonly betRepository;
    constructor(configuration: Configurations, requests: RequestsRepository, botWinsRepository: BotWinsRepository, chat: ChatRepository, message: MessageRepository, betRepository: BetRepository);
    execute(): Promise<void>;
    private sendMessageDiffGols;
    private sendMessage;
    private saveBets;
    private extrairNumero;
    private formatTeam;
}
