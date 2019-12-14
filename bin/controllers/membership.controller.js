"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_repository_1 = require("../repositories/person.repository");
const app_utils_1 = require("../utils/app-utils");
const membership_repository_1 = require("../repositories/membership.repository");
function initMembership(app) {
    app.route("/api/private/membership/members")
        .get(function (req, resp) {
        console.log(req.query.where);
        const where = JSON.parse(req.query.where);
        person_repository_1.PersonRepository.findPerson({ where }).then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/membership/family")
        .post(function (req, resp) {
        const data = req.body;
        if (!data.mainApplicant || !data.familyMembers) {
            resp.json({ error: 'no-data', message: 'Main applicant should be present' });
            return;
        }
        membership_repository_1.saveMemberFamilyProfile(data).then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/membership/members")
        .post(function (req, resp) {
        const data = req.body.members;
        if (!data || !data.length) {
            resp.json({ error: 'no-data', message: 'You have to send data in array' });
            return;
        }
        let q;
        if (data.length === 1)
            q = membership_repository_1.saveMemberProfile(data[0]);
        else
            q = membership_repository_1.saveMembersProfile(data);
        q.then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/membership/members/:ids")
        .delete(function (req, resp) {
        const ids = req.params.ids.split(',').map(Number);
        person_repository_1.PersonRepository.delete(ids).then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/membership/members")
        .patch(function (req, resp) {
        console.log(req.query.where);
        const where = JSON.parse(req.query.where);
        person_repository_1.PersonRepository.findPerson({ where }).then(res => {
            resp.json(res);
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
}
exports.initMembership = initMembership;
