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
exports.TelegramBotWinsRepository = exports.repositoryRegisterStoryFactory = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const grammy_1 = require("grammy");
const chat_status_1 = require("../../../domain/entities/enums/chat-status");
const chat_repository_1 = require("../../../domain/chat-repository");
const configurations_1 = require("../../configuration/configurations");
const repositoryRegisterStoryFactory = () => {
    const config = typescript_ioc_1.Container.get(configurations_1.Configurations);
    const telegramClient = new grammy_1.Bot(config.telegramBotWinsToken);
    return new TelegramBotWinsRepository(telegramClient, config);
};
exports.repositoryRegisterStoryFactory = repositoryRegisterStoryFactory;
let TelegramBotWinsRepository = class TelegramBotWinsRepository {
    constructor(client, config) {
        this.client = client;
        this.config = config;
        this.client;
        this.config;
        this.chat = typescript_ioc_1.Container.get(chat_repository_1.ChatRepository);
        this.chat.init(this.config.mongoDbWinsDatabase);
    }
    async start() {
        this.client.start();
        await this.subscribe();
        await this.unsubscribe();
        console.log('Conectado ao BOT Diff Gols');
    }
    async sendMessage(message) {
        return await this.client.api.sendMessage(message.chatId, message.message, {
            parse_mode: 'HTML',
            link_preview_options: { is_disabled: true },
            protect_content: true,
        });
    }
    async subscribe() {
        this.client.command('start', async (ctx) => {
            const chatId = ctx.chat?.id;
            const firstName = ctx.from?.first_name;
            const lastName = ctx.from?.last_name;
            const name = `<b>${firstName} ${lastName}</b>`;
            if (await this.chat.exists(chatId)) {
                this.sendMessage({
                    chatId: chatId.toString(),
                    message: `Olá, ${name}! Você já está cadastrado!\nPara sair digite /sair`,
                });
                return;
            }
            const message = `Olá ${name} seja bem vindo!\nPara sair digite /sair`;
            const data = {
                firstName,
                lastName,
                chatId,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: chat_status_1.ChatStatus.ACTIVE,
            };
            this.chat.save(data);
            this.sendMessage({ chatId: chatId.toString(), message });
        });
    }
    async unsubscribe() {
        this.client.command('sair', async (ctx) => {
            const chatId = ctx.chat?.id;
            const firstName = ctx.from?.first_name;
            const lastName = ctx.from?.last_name;
            const name = `<b>${firstName} ${lastName}</b>`;
            if (!(await this.chat.exists(chatId))) {
                this.sendMessage({
                    chatId: chatId.toString(),
                    message: `Olá, ${name}! Você não está cadastrado!\nPara se cadastrar digite /start`,
                });
                return;
            }
            const message = `Olá ${name}, que pena que você está saindo.\nPara se cadastrar digite /start`;
            this.chat.remove(chatId);
            this.sendMessage({ chatId: chatId.toString(), message });
        });
    }
};
exports.TelegramBotWinsRepository = TelegramBotWinsRepository;
exports.TelegramBotWinsRepository = TelegramBotWinsRepository = __decorate([
    (0, typescript_ioc_1.Factory)(exports.repositoryRegisterStoryFactory),
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [grammy_1.Bot,
        configurations_1.Configurations])
], TelegramBotWinsRepository);
//# sourceMappingURL=telegram-bot-wins-repository.js.map