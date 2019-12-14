"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_repository_1 = require("../repositories/person.repository");
const app_utils_1 = require("../utils/app-utils");
function initSaff(app) {
    app.route("/api/private/stuff/persons/")
        .get(function (req, resp) {
        console.log(req.query.where);
        const where = JSON.parse(req.query.where);
        person_repository_1.PersonRepository.findPerson({ where }).then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/staff/persons/")
        .post(function (req, resp) {
        console.log(req.query.where);
        const where = JSON.parse(req.query.where);
        const body = req.body;
        person_repository_1.PersonRepository.upsert(where, body).then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/staff/persons/")
        .patch(function (req, resp) {
        console.log(req.query.where);
        const where = JSON.parse(req.query.where);
        person_repository_1.PersonRepository.findPerson({ where }).then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/staff/persons/")
        .delete(function (req, resp) {
        console.log(req.query.where);
        const where = JSON.parse(req.query.where);
        person_repository_1.PersonRepository.findPerson({ where }).then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
}
exports.initSaff = initSaff;
