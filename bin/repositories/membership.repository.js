"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_model_1 = require("../seq-models/person.model");
async function saveMemberFamilyProfile(data) {
    const mainApplicant = data.mainApplicant;
    const id = mainApplicant.id;
    const email = mainApplicant.email;
    const overwrite = data.overwrite;
    let existingPerson;
    const family = data.familyMembers;
    if (id) {
        existingPerson = await person_model_1.PersonModel.findOne({ where: { id: id }, raw: true });
    }
    else {
        existingPerson = await person_model_1.PersonModel.findOne({ where: { email: email }, raw: true });
        if (!overwrite)
            return { error: 'exists', message: 'Do you want to overwrite existing person?' };
    }
    if (!existingPerson) {
    }
}
exports.saveMemberFamilyProfile = saveMemberFamilyProfile;
async function saveMemberProfile(data) {
}
exports.saveMemberProfile = saveMemberProfile;
async function saveMembersProfile(data) {
}
exports.saveMembersProfile = saveMembersProfile;
