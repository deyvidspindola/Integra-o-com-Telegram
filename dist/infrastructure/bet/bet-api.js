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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetApi = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const configurations_1 = require("../configuration/configurations");
const axios_1 = __importDefault(require("axios"));
const environment_1 = require("../../domain/entities/enums/environment");
let BetApi = class BetApi {
    constructor(config) {
        this.config = config;
        this.betApiKey = '';
    }
    async setApiKey(betApiKey) {
        this.betApiKey = betApiKey;
    }
    async getBetsInplay() {
        if (this.config.environment === environment_1.Environments.DEV) {
            return this.getMock();
        }
        const url = `${this.config.betApiUrl}/v1/bet365/inplay_filter?sport_id=1&token=${this.betApiKey}`;
        const response = await axios_1.default.get(url);
        return response;
    }
    async getMock() {
        return {
            data: {
                success: 1,
                pager: {
                    page: 1,
                    per_page: 1000,
                    total: 71,
                },
                results: [
                    {
                        id: '112919479',
                        sport_id: '1',
                        time: '1640828040',
                        time_status: '1',
                        league: {
                            id: '10047781',
                            name: 'Esoccer Battle - 8 mins play',
                        },
                        home: {
                            id: '10749284',
                            name: 'Tottenham (Nik33) Esports',
                        },
                        away: {
                            id: '10613750',
                            name: 'Liverpool (Calvin) Esports',
                        },
                        ss: '0-3',
                        our_event_id: '4499000',
                        r_id: '112919479C1A',
                        ev_id: '15692509192C1',
                        updated_at: '1640828487',
                    },
                ],
            },
        };
    }
};
exports.BetApi = BetApi;
exports.BetApi = BetApi = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [configurations_1.Configurations])
], BetApi);
//# sourceMappingURL=bet-api.js.map