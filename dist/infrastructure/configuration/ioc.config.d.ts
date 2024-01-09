import { ChatRepository } from '../../domain/chat-repository';
import { MongoChatRepository } from '../mongodb/repositories/mongo-chat-repository';
import { RequestsRepository } from '../../domain/requests-repository';
import { BetRequestsRepository } from '../bet/repositories/bet-requests-repository';
import { TelegramBotDiffGolsRepository } from '../telegram/repositories/telegram-bot-diff-gols-repository';
import { ConfigurationRepository } from '../../domain/configuration-repository';
import { MongoConfigurationRepository } from '../mongodb/repositories/mongo-configuration-repository';
import { TelegramBotWinsRepository } from '../telegram/repositories/telegram-bot-wins-repository';
import { MessageRepository } from '../../domain/message-repository';
import { MongoMessageRepository } from '../mongodb/repositories/mongo-message-repository';
import { BotDiffGolsRepository } from '../../domain/bots/repository/bot-diff-gols-repository';
import { BotWinsRepository } from '../../domain/bots/repository/bot-wins-repository';
import { BetRepository } from '../../domain/bet-repository';
import { MongoBetRepository } from '../mongodb/repositories/mongo-bet-repository';
declare const _default: ({
    bindName: string;
    to: unknown;
    bind?: undefined;
} | {
    bind: typeof BotDiffGolsRepository;
    to: typeof TelegramBotDiffGolsRepository;
    bindName?: undefined;
} | {
    bind: typeof BotWinsRepository;
    to: typeof TelegramBotWinsRepository;
    bindName?: undefined;
} | {
    bind: typeof ChatRepository;
    to: typeof MongoChatRepository;
    bindName?: undefined;
} | {
    bind: typeof MessageRepository;
    to: typeof MongoMessageRepository;
    bindName?: undefined;
} | {
    bind: typeof ConfigurationRepository;
    to: typeof MongoConfigurationRepository;
    bindName?: undefined;
} | {
    bind: typeof RequestsRepository;
    to: typeof BetRequestsRepository;
    bindName?: undefined;
} | {
    bind: typeof BetRepository;
    to: typeof MongoBetRepository;
    bindName?: undefined;
})[];
export default _default;
