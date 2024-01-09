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
exports.BotDiffGolsReportUseCase = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const bet_repository_1 = require("../../domain/bet-repository");
const configurations_1 = require("../../infrastructure/configuration/configurations");
const message_repository_1 = require("../../domain/message-repository");
const bot_diff_gols_repository_1 = require("../../domain/bots/repository/bot-diff-gols-repository");
const node_cron_1 = require("node-cron");
const utils_1 = require("../utils");
let BotDiffGolsReportUseCase = class BotDiffGolsReportUseCase {
    constructor(configuration, betRepository, message, botDiffGolsRepository) {
        this.configuration = configuration;
        this.betRepository = betRepository;
        this.message = message;
        this.botDiffGolsRepository = botDiffGolsRepository;
        this.betRepository.init(this.configuration.mongoDbDiffGolsDatabase);
        this.message.init(this.configuration.mongoDbDiffGolsDatabase);
    }
    async execute() {
        await this.botDiffGolsRepository.sendMessage({
            chatId: this.configuration.telegramDefaultChatId,
            message: 'Bot Diff Gols Report is running',
        });
        (0, node_cron_1.schedule)('0 0 * * *', async () => {
            await this.process();
        });
    }
    async process() {
        try {
            const filter = {
                startDate: (0, utils_1._startDate)((0, utils_1._yesterday)()),
                endDate: (0, utils_1._endDate)((0, utils_1._yesterday)()),
            };
            const betResults = await this.betRepository.oldBets(filter);
            const messages = await this.message.messages(filter);
            // Initialize counters for the reports
            let gamesLessThan3Goals8Mins = 0;
            let gamesLessThan4Goals10Mins = 0;
            let gamesLessThan4Goals12Mins = 0;
            for (const msg of messages) {
                const bet = betResults.find((b) => b.betId === msg.betId);
                if (!bet)
                    continue;
                const betResult = JSON.parse(bet.bet);
                const diff = (0, utils_1.calcDiff)(betResult.ss);
                if (betResult.league.name.includes('8 mins') && diff <= 3) {
                    gamesLessThan3Goals8Mins++;
                }
                else if (betResult.league.name.includes('10 mins') && diff <= 4) {
                    gamesLessThan4Goals10Mins++;
                }
                else if (betResult.league.name.includes('12 mins') && diff <= 4) {
                    gamesLessThan4Goals12Mins++;
                }
            }
            this.botDiffGolsRepository.sendMessage({
                chatId: this.configuration.telegramDefaultChatId,
                message: `
        Relatório de <b>${(0, utils_1._yesterday)('br')}</b>

        -------------[ <b>Total de Jogos</b> ]-------------
        8 minutos: <b>${betResults.filter((b) => b.bet.includes('8 mins')).length}</b>
        10 minutos: <b>${betResults.filter((b) => b.bet.includes('10 mins')).length}</b>
        12 minutos: <b>${betResults.filter((b) => b.bet.includes('12 mins')).length}</b>
        Total: <b>${betResults.length}</b>

        -------------[ <b>Jogos enviados</b> ]-------------
        8 minutos: <b>${messages.filter((m) => m.message.includes('8 mins')).length}</b>
        10 minutos: <b>${messages.filter((m) => m.message.includes('10 mins')).length}</b>
        12 minutos: <b>${messages.filter((m) => m.message.includes('12 mins')).length}</b>
        Total: <b>${messages.length}</b>
        
        ---------------------[ <b>Jogos</b> ]----------------------
        8 minutos menor ou igual a 3 gols: <b>${gamesLessThan3Goals8Mins}</b>
        10 minutos menor ou igual a 4 gols: <b>${gamesLessThan4Goals10Mins}</b>
        12 minutos menor ou igual a 4 gols: <b>${gamesLessThan4Goals12Mins}</b>
        Total: <b>${gamesLessThan3Goals8Mins + gamesLessThan4Goals10Mins + gamesLessThan4Goals12Mins}</b>
      `,
            });
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
};
exports.BotDiffGolsReportUseCase = BotDiffGolsReportUseCase;
exports.BotDiffGolsReportUseCase = BotDiffGolsReportUseCase = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __param(2, typescript_ioc_1.Inject),
    __param(3, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [configurations_1.Configurations,
        bet_repository_1.BetRepository,
        message_repository_1.MessageRepository,
        bot_diff_gols_repository_1.BotDiffGolsRepository])
], BotDiffGolsReportUseCase);
//# sourceMappingURL=bot-diff-gols-report-use-case.js.map