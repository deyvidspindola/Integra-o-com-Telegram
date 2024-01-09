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
exports.BotWinsUseCase = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const chat_repository_1 = require("../domain/chat-repository");
const requests_repository_1 = require("../domain/requests-repository");
const configurations_1 = require("../infrastructure/configuration/configurations");
const message_repository_1 = require("../domain/message-repository");
const bot_wins_repository_1 = require("../domain/bots/repository/bot-wins-repository");
const bet_repository_1 = require("../domain/bet-repository");
const utils_1 = require("./utils");
let send = [];
const diffs = {
    8: 3,
    10: 4,
    12: 4,
};
let BotWinsUseCase = class BotWinsUseCase {
    constructor(configuration, requests, botWinsRepository, chat, message, betRepository) {
        this.configuration = configuration;
        this.requests = requests;
        this.botWinsRepository = botWinsRepository;
        this.chat = chat;
        this.message = message;
        this.betRepository = betRepository;
        this.sendMessageDiffGols = async (bets, chats) => {
            for (const bet of bets) {
                if (bet && bet.ss && bet.time_status == 1) {
                    const result = bet.ss.split('-');
                    const numeroExtraido = this.extrairNumero(bet.league.name);
                    const diff = Math.abs(parseInt(result[0]) - parseInt(result[1]));
                    if (diff >= diffs[numeroExtraido] && !send.includes(bet.id)) {
                        const league = `<b>${bet.league.name}</b>`;
                        const home = this.formatTeam(bet.home.name);
                        const away = this.formatTeam(bet.away.name);
                        const title = `${home} <b>${bet.ss}</b> ${away}`;
                        const message = `${league}\n${title}\n<b>Diferença de gols</b>: ${diff}\n${this.configuration.betUrl}${bet.ev_id}`;
                        this.sendMessage(message, chats, bet);
                        // send.push(bet.id);
                    }
                }
            }
        };
        this.extrairNumero = (texto) => {
            const regex = /\b(\d+)\b/;
            const match = texto.match(regex);
            return match ? parseInt(match[1], 10) : null;
        };
        this.chat.init(this.configuration.mongoDbWinsDatabase);
        this.message.init(this.configuration.mongoDbWinsDatabase);
        this.betRepository.init(this.configuration.mongoDbWinsDatabase);
        this.requests.setApiKey(this.configuration.betBotWinsApiKey);
    }
    async execute() {
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
        let msgId, chatId = [];
        for (const chat of chats) {
            const msg = await this.botWinsRepository.sendMessage({
                chatId: chat.chatId.toString(),
                message,
            });
            chatId.push(chat.chatId);
            msgId.push(msg.message_id);
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
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    }
    formatTeam(team) {
        const formattedName = team.replace(/\(([^)]+)\)/, (_, name) => `(<b>${name}</b>)`);
        const newTeam = formattedName.replace(' Esports', '');
        return newTeam;
    }
};
exports.BotWinsUseCase = BotWinsUseCase;
exports.BotWinsUseCase = BotWinsUseCase = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __param(2, typescript_ioc_1.Inject),
    __param(3, typescript_ioc_1.Inject),
    __param(4, typescript_ioc_1.Inject),
    __param(5, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [configurations_1.Configurations,
        requests_repository_1.RequestsRepository,
        bot_wins_repository_1.BotWinsRepository,
        chat_repository_1.ChatRepository,
        message_repository_1.MessageRepository,
        bet_repository_1.BetRepository])
], BotWinsUseCase);
//# sourceMappingURL=bot-wins-use-case.js.map