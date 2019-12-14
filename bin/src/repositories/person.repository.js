"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_model_1 = require("../seq-models/person.model");
const user_suqadrons_model_1 = require("../seq-models/user-suqadrons-model");
class PersonRepository {
    static async getPersonByUid(uid) {
        return person_model_1.PersonModel.findOne({ where: { uid } });
    }
    static findPerson(where) {
        console.log(where);
        const w = where;
        console.log(w);
        return person_model_1.PersonModel.findOne(w);
    }
    static async upsert(where, body) {
        console.log(' where ', where);
        console.log('body ', body);
        const member = new person_model_1.VOMember(body);
        delete body.subscription;
        delete body.squadronIDs;
        const squadrons = member.squadronIDs;
        const subscriptions = member.subscription;
        const w = where;
        let person = await person_model_1.PersonModel.findOne(w);
        if (!person) {
            person = new person_model_1.VOPerson(body);
            person = await person_model_1.PersonModel.create(person);
        }
        else {
            person.apply(body);
            await person_model_1.PersonModel.update(person);
        }
        const user_id = person.id;
        if (squadrons) {
            const del = await user_suqadrons_model_1.UserSuqadronsModel.destroy({ where: { user_id } });
            console.log(' delete result ', del);
            const ar = squadrons.map(function (item) {
                return {
                    user_id,
                    squadron_id: item
                };
            });
            const cre = await user_suqadrons_model_1.UserSuqadronsModel.bulkCreate(ar);
            console.log(' cretae result ', cre);
        }
        return { success: 'updated', message: ' person ' + squadrons };
    }
    static delete(ids) {
        return person_model_1.PersonModel.destroy({ where: { id: ids } });
    }
}
exports.PersonRepository = PersonRepository;
