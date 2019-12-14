"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_service_1 = require("./elastic-service");
async function getMemberByUid(uid) {
    const res = await elastic_service_1.ElasticService.service.getAllIndexes();
    console.log(res);
}
exports.getMemberByUid = getMemberByUid;
