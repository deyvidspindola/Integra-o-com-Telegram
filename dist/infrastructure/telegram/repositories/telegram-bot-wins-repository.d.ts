import { ObjectFactory } from 'typescript-ioc';
import { sendMessage } from '../../../domain/entities/message';
import { Bot } from 'grammy';
import { Configurations } from '../../configuration/configurations';
import { BotWinsRepository } from '../../../domain/bots/repository/bot-wins-repository';
export declare const repositoryRegisterStoryFactory: ObjectFactory;
export declare class TelegramBotWinsRepository implements BotWinsRepository {
    private client;
    private config;
    private chat;
    constructor(client: Bot, config: Configurations);
    start(): Promise<void>;
    sendMessage(message: sendMessage): Promise<any>;
    subscribe(): Promise<void>;
    unsubscribe(): Promise<void>;
}
