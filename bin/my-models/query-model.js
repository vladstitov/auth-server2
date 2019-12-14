"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Op;
(function (Op) {
    Op[Op["or"] = 0] = "or";
    Op[Op["gt"] = 1] = "gt";
    Op[Op["gte"] = 2] = "gte";
    Op[Op["lt"] = 3] = "lt";
    Op[Op["lte"] = 4] = "lte";
    Op[Op["ne"] = 5] = "ne";
    Op[Op["between"] = 6] = "between";
    Op[Op["notBetween"] = 7] = "notBetween";
    Op[Op["in"] = 8] = "in";
    Op[Op["notIn"] = 9] = "notIn";
    Op[Op["like"] = 10] = "like";
    Op[Op["notLike"] = 11] = "notLike";
    Op[Op["iLike"] = 12] = "iLike";
    Op[Op["notILike"] = 13] = "notILike";
    Op[Op["overlap"] = 14] = "overlap";
    Op[Op["contains"] = 15] = "contains";
    Op[Op["contained"] = 16] = "contained";
    Op[Op["any"] = 17] = "any";
})(Op = exports.Op || (exports.Op = {}));
class QueryModel {
    constructor(index) {
        this.index = index;
    }
    findOne(q) {
    }
    findAll(q) {
    }
}
exports.QueryModel = QueryModel;
