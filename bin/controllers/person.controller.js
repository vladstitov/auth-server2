"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_utils_1 = require("../utils/app-utils");
const person_model_1 = require("../seq-models/person.model");
const upload_file_1 = require("./upload-file");
function initPersonApis(app) {
    app.route("/api/whoami")
        .get(function (req, resp) {
        const id = req.session.userID;
        console.log('whoami ' + id + ' expires ' + req.session.cookie.expires);
        person_model_1.PersonModel.findOne({ where: { id }, raw: true }).then((res) => {
            if (res) {
                resp.json({ success: 'success', data: { id: res.id, uid: res.uid } });
            }
            else {
                resp.json({ error: 'no_user', message: 'NO_PROFILE_YET' });
            }
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/user/:id/profile")
        .get(function (req, resp) {
        const id = Number(req.params.id);
        person_model_1.PersonModel.findOne({ where: { id }, raw: true }).then((res) => {
            if (res) {
                resp.json({ success: 'success', data: res });
            }
            else {
                resp.json({ success: 'no_user', message: 'NO_PROFILE_YET' });
            }
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.route("/api/private/user/:id/profile")
        .post(async function (req, resp) {
        const person = req.body.data;
        const id = Number(req.params.id);
        person.id = id;
        if (person.addresses) {
            const addresses = person.addresses;
            delete person.addresses;
            await addresses.map(function (item) {
                item.user_id = id;
                if (item.id)
                    return person_model_1.AddressModel.update(item, { where: { id: item.id } });
                else
                    return person_model_1.AddressModel.create(item);
            });
        }
        person_model_1.PersonModel.update(person, { where: { id } }).then(res => {
            if (res) {
                resp.json({ success: 'updated', data: res });
            }
        }).catch(err => app_utils_1.onProcessError(req, resp, err));
    });
    app.post('/api/private/user/:id/upload/:belongs', function (req, resp) {
        const userId = Number(req.params.id);
        const belongs = req.params.belongs;
        if (!userId || !belongs) {
            resp.json({ error: 'user_id', message: 'NOT_FULL_URL' });
            return;
        }
        upload_file_1.savePersonalFiles(req, resp, userId, belongs);
    });
}
exports.initPersonApis = initPersonApis;
