"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotDiffGolsUseCase = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const node_cron_1 = require("node-cron");
const chat_repository_1 = require("../../domain/chat-repository");
const requests_repository_1 = require("../../domain/requests-repository");
const configurations_1 = require("../../infrastructure/configuration/configurations");
const message_repository_1 = require("../../domain/message-repository");
const bot_diff_gols_repository_1 = require("../../domain/bots/repository/bot-diff-gols-repository");
const bet_repository_1 = require("../../domain/bet-repository");
const utils_1 = require("../utils");
let send = [];
const diffs = {
    8: 3,
    10: 4,
    12: 4,
};
let BotDiffGolsUseCase = class BotDiffGolsUseCase {
    constructor(configuration, requests, botDiffGolsRepository, chat, message, betRepository) {
        this.configuration = configuration;
        this.requests = requests;
        this.botDiffGolsRepository = botDiffGolsRepository;
        this.chat = chat;
        this.message = message;
        this.betRepository = betRepository;
        this.sendMessageDiffGols = async (bets, chats) => {
            for (const bet of bets) {
                if (bet && bet.ss && bet.time_status == 1) {
                    const numeroExtraido = (0, utils_1.extrairNumero)(bet.league.name);
                    const diff = (0, utils_1.calcDiff)(bet.ss);
                    if (diff >= diffs[numeroExtraido] && !send.includes(bet.id)) {
                        const league = `<b>${bet.league.name}</b>`;
                        const home = (0, utils_1.formatTeam)(bet.home.name);
                        const away = (0, utils_1.formatTeam)(bet.away.name);
                        const title = `${home} <b>${bet.ss}</b> ${away}`;
                        const message = `${league}\n${title}\n<b>Diferença de gols</b>: ${diff}\n${this.configuration.betUrl}${bet.ev_id}`;
                        this.sendMessage(message, chats, bet);
                        send.push(bet.id);
                    }
                }
            }
        };
        this.chat.init(this.configuration.mongoDbDiffGolsDatabase);
        this.message.init(this.configuration.mongoDbDiffGolsDatabase);
        this.betRepository.init(this.configuration.mongoDbDiffGolsDatabase);
        this.requests.setApiKey(this.configuration.betBotDiffGolsApiKey);
    }
    async execute() {
        await this.botDiffGolsRepository.start();
        await this.botDiffGolsRepository.sendMessage({
            chatId: this.configuration.telegramDefaultChatId,
            message: 'Bot Diff Gols is running',
        });
        (0, node_cron_1.schedule)('*/1 * * * * *', async () => {
            await this.process();
        });
    }
    async process() {
        try {
            const chats = await this.chat.chats();
            if (!chats.length)
                return;
            const bets = await this.requests.execute('Esoccer');
            this.sendMessageDiffGols(bets, chats);
            this.saveBets(bets);
        }
        catch (error) {
            console.log(error);
        }
    }
    async sendMessage(message, chats, bet) {
        let msgId = [];
        let chatId = [];
        for (const chat of chats) {
            const msg = await this.botDiffGolsRepository.sendMessage({
                chatId: chat.chatId.toString(),
                message,
            });
            msgId.push(msg.message_id);
            chatId.push(chat.chatId);
        }
        await this.message.save({
            messageId: JSON.stringify(msgId),
            chatId: JSON.stringify(chatId),
            betId: bet.id,
            eventId: bet.ev_id,
            message: message,
            createdAt: (0, utils_1._todayNow)(),
        });
    }
    saveBets(bets) {
        for (const bet of bets) {
            this.betRepository.save({
                betId: bet.id,
                bet: JSON.stringify(bet),
                createdAt: (0, utils_1._todayNow)(),
                updatedAt: (0, utils_1._todayNow)(),
            });
        }
    }
};
exports.BotDiffGolsUseCase = BotDiffGolsUseCase;
exports.BotDiffGolsUseCase = BotDiffGolsUseCase = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __param(2, typescript_ioc_1.Inject),
    __param(3, typescript_ioc_1.Inject),
    __param(4, typescript_ioc_1.Inject),
    __param(5, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [configurations_1.Configurations,
        requests_repository_1.RequestsRepository,
        bot_diff_gols_repository_1.BotDiffGolsRepository,
        chat_repository_1.ChatRepository,
        message_repository_1.MessageRepository,
        bet_repository_1.BetRepository])
], BotDiffGolsUseCase);
//# sourceMappingURL=bot-diff-gols-use-case.js.map