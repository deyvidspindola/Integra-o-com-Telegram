import { ObjectFactory } from 'typescript-ioc';
import { sendMessage } from '../../../domain/entities/message';
import { Bot } from 'grammy';
import { Configurations } from '../../configuration/configurations';
import { BotDiffGolsRepository } from '../../../domain/bots/repository/bot-diff-gols-repository';
export declare const repositoryRegisterStoryFactory: ObjectFactory;
export declare class TelegramBotDiffGolsRepository implements BotDiffGolsRepository {
    private client;
    private config;
    private chat;
    constructor(client: Bot, config: Configurations);
    start(): Promise<void>;
    sendMessage(message: sendMessage): Promise<any>;
    subscribe(): Promise<void>;
    unsubscribe(): Promise<void>;
}
