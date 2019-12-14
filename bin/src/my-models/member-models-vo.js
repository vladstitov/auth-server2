"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersModel {
    constructor(data) {
        const defaults = data.students.mappings.default.properties;
        const props = [];
        const prop1 = defaults.courses.properties.courseOtherDetails.properties;
        console.log(prop1);
        for (let str1 in prop1) {
            props.push(str1);
        }
        console.log("'" + props.join("','") + "'");
    }
}
exports.UsersModel = UsersModel;
const students = ['birthdate', 'courses', 'email', 'emailVerified', 'gender', 'givenName', 'lastName', 'memberId',
    'squadronIDs', 'squadronNames', 'userId', 'userName'];
const students_courses = ['assignments', 'classes', 'courseCompleted', 'courseId', 'courseLink', 'courseOtherDetails',
    'dateOfRegistration', 'name', 'publicName', 'shortName'];
const students_courses_assigments = ['assignmentId', 'courseGrades_0', 'courseGrades_1', 'courseGrades_2',
    'courseGrades_3', 'courseGrades_4', 'courseGrades_5', 'courseGrades_6', 'courseGrades_7', 'courseGrades_8',
    'courseGrades_9', 'maxAttempts', 'name'];
const students_courses_assigments_corseGrade_0 = ['attemptNumber', 'gradeHistory', 'marks', 'note', 'testName',
    'testNumber', 'testStatus', 'timeStamp'];
const students_courses_classes = ['classId', 'className', 'classOtherDetails', 'dateOfRegistration'];
const students_courses_classes_classOtherDetails = ['address1', 'address2', 'city', 'contactName', 'email', 'phone',
    'province', 'roomNumber', 'squadron', 'startDate', 'startTime', 'venueName', 'website'];
const students_cources_courseOtherDetails = ['courseDetails', 'courseLanguage', 'coursePrerequisite',
    'coursePublicName', 'courseSubTitle', 'courseType', 'imageurl', 'stopWebsiteEnrollment'];
class VOMemberSubscription {
    constructor(obj) {
        if (obj) {
            for (const str in obj) {
                this[str] = obj[str];
            }
        }
    }
}
exports.VOMemberSubscription = VOMemberSubscription;
class VOMember {
    constructor(obj) {
        if (obj) {
            for (const str in obj) {
                this[str] = obj[str];
            }
        }
    }
}
exports.VOMember = VOMember;
class VOMemberDetails {
    constructor(obj) {
    }
}
exports.VOMemberDetails = VOMemberDetails;
const lmsProps = ['courses', 'email', 'firstName', 'lastName', 'userId', 'userName'];
const lms_cources = ['assignments', 'classes', 'courseCompleted', 'courseId', 'courseLink', 'courseOtherDetails',
    'dateOfRegistration', 'name', 'publicName', 'shortName'];
const lms_cources_assigments = ['assignmentId', 'courseGrades', 'maxAttempts', 'name'];
const lms_cources_assigments_courseGrades = ['attemptNumber', 'gradeHistory', 'marks', 'note', 'testName', 'testNumber',
    'testStatus', 'timeStamp'];
const lms_cources_assigments_courseGrades_gradeHistory = ['marks', 'timeStamp'];
const lms_cources_classes = ['classId', 'className', 'classOtherDetails', 'dateOfRegistration'];
const lms_cources_classes_classOtherDetails = ['address1', 'address2', 'city', 'contactName', 'email', 'phone', 'province',
    'roomNumber', 'squadron', 'startDate', 'startTime', 'venueName', 'website'];
const lms_cources_courseOtherDetails = ['courseDetails', 'coursePrerequisite', 'courseSubTitle', 'courseType'];
const ecommerceProps = ['billingAddress', 'cartHash', 'cartTax', 'customer', 'dateCreated', 'datePaid', 'discountTax',
    'discountTotal', 'expiryDate', 'orderKey', 'parentOrder', 'paymentMethod', 'paymentMethodTitle', 'scheduleNextPayment',
    'shippingAddress', 'shippingTax', 'shippingTotal', 'subscriptionId', 'subscriptionStatus', 'total', 'total_tax'];
const ecommerce_parentOrder = ['billingAddress', 'cartHash', 'cartTax', 'customer', 'dateCreated', 'datePaid', 'discountTax',
    'discountTotal', 'isMigratedOrder', 'lineItems', 'orderId', 'orderKey', 'orderStatus', 'paymentDetails',
    'paymentMethod', 'paymentMethodTitle', 'shippingAddress', 'shippingTax', 'shippingTotal', 'total', 'total_tax'];
const ecommerce_parentOrder_lineItems = ['amount', 'description', 'quantity'];
const ecommerce_parentOrder_paymentDetails = ['authCode', 'cardType', 'createdDate', 'maskedPan', 'message',
    'method_id', 'method_title', 'paid', 'referenceNum', 'transTime', 'transType', 'transactionNo', 'transactionResponse'];
const userProperties = ['addressLine1', 'addressLine2', 'birthdate', 'boatExpCoastal', 'boatExpLargeLakeRiver',
    'boatExpOffshoreCrew2Day', 'boatExpOffshoreCrew3DayPlus', 'boatExpOffshoreNav2Day', 'boatExpOffshoreNav3DayPlus',
    'boatExpSmallLakeRiver', 'boatExpStLawrKingsMont', 'boatExpStLawrMontQbc', 'boatExpStLawrQbcTadousac',
    'boatInfoBoatLength', 'boatInfoBoatName', 'boatInfoBoatType', 'boatInfoEngineHP', 'boatInfoEngineNumber',
    'boatInfoEngineNumberOther', 'boatInfoEngineType', 'boatInfoEngineTypeOther', 'boatInfoHullType', 'boatInfoLocation',
    'boatInfoMMSINumber', 'boatInfoPortLocation', 'boatInfoYachtClubMarina', 'boatInterestCanoe', 'boatInterestKayak',
    'boatInterestPWC', 'boatInterestPower', 'boatInterestSail', 'boatInterestSailBoat', 'boatingActCanoeKayakCamp',
    'boatingActCottage', 'boatingActCruising', 'boatingActDaySailing', 'boatingActFishing', 'boatingActRacing',
    'boatingActRunaboutBoating', 'boatingActScubaDiving', 'boatingActWtrSkiWkBoard', 'city', 'comBadEmail',
    'comBadMailingAddress', 'comEx3rdParty', 'comExEmail', 'comExFromMemRosterInternet', 'comExPMDMemFromPacYachtMail',
    'comExPhone', 'comExPromoMail', 'comExRegisExamProvPub', 'country', 'ecommerce', 'email', 'emailVerified', 'gender',
    'givenName', 'gluuStatus', 'homePhoneNumber', 'imcCollegeDiploma', 'imcHighSchool', 'imcPostGraduateUniversityDegree',
    'imcUniversityBachelorDegree', 'lastName', 'lms', 'loginStatus', 'magazineNoMagazine', 'magazineRecCanYachting',
    'magazineRecLescaleNaut', 'membReasonFamily', 'membReasonHAMLicense', 'membReasonMemberBenefits', 'membReasonOtherReason',
    'membReasonRecogBoatAssoc', 'membReasonSquadronLife', 'membReasonTakingCourses', 'membReasonVolunteering', 'memberId',
    'memberIdCreatedAt', 'membershipType', 'middleName', 'othAssocAmericanSailingAssoc', 'othAssocAssocMaritimeDuQuebec',
    'othAssocBoatUS', 'othAssocCanadianBoatersAll', 'othAssocCanadianCoastGuardAux', 'othAssocCanadianSafeBoatsAll',
    'othAssocCanadianYachtingAssoc', 'othAssocConseilQbcDuNautisme', 'othAssocOtherBoatingAssoc', 'othAssocRoyalYachtAssoc',
    'othAssocUSPowerSquadron', 'othAssocUSSailingAssoc', 'postalCodeZip', 'preferredLanguage', 'primaryFax', 'profileType',
    'provinceState', 'referrerArticle', 'referrerBoatShow', 'referrerBulletinBoardAdvert', 'referrerInternet',
    'referrerMagazine', 'referrerOpnHouseMarinaYClub', 'referrerPCCourstesyCheck', 'referrerRadio', 'referrerSeminar',
    'referrerTelevision', 'referrerWordOfMouth', 'roles', 'rolesName', 'salutation', 'squadronIDs', 'squadronNames', 'uid',
    'volunExpAdmin', 'volunExpEducation', 'volunExpEducationOther', 'volunExpElectrical', 'volunExpElectronics',
    'volunExpEngineering', 'volunExpGovermentLiason', 'volunExpGraphicDesign', 'volunExpInformationTech', 'volunExpLaw',
    'volunExpMarineSurveyor', 'volunExpMarinerNavigator', 'volunExpMarinerSHabourPlt', 'volunExpMarinerSearchResc',
    'volunExpMarketingPR', 'volunExpMechanical', 'volunExpMeteorology', 'volunExpNavalArchitect', 'volunExpOther',
    'volunExpPhotography', 'volunExpPilorAir', 'volunExpTranslation', 'volunExpWebmaster', 'volunExpWriterEditor',
    'volunIntAdmin', 'volunIntCourseDev', 'volunIntEditorial', 'volunIntInstruction', 'volunIntSocAct',
    'volunIntTranslation', 'workPhoneNumber'];
