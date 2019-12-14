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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Account = class Account extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Account.prototype, "confirmed", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "nickname", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "session", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "statusID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "token", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "uid", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Account.prototype, "updatedAt", void 0);
Account = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'members'
    })
], Account);
exports.Account = Account;
