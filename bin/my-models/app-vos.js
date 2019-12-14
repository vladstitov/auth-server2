"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VOPerson {
    constructor(obj) {
        if (obj) {
            this.apply(obj);
        }
    }
    apply(obj) {
        for (const str in obj) {
            this[str] = obj[str];
        }
    }
}
exports.VOPerson = VOPerson;
class VOOrder {
    constructor(obj) {
        if (obj) {
            this.apply(obj);
        }
    }
    apply(obj) {
        for (const str in obj) {
            this[str] = obj[str];
        }
    }
}
exports.VOOrder = VOOrder;
class VOContact {
    constructor(obj) {
        if (obj) {
            this.apply(obj);
        }
    }
    apply(obj) {
        for (const str in obj) {
            this[str] = obj[str];
        }
    }
}
exports.VOContact = VOContact;
class VOMember extends VOPerson {
    constructor(obj) {
        super(obj);
    }
}
exports.VOMember = VOMember;
class VOMemberFamily extends VOMember {
    constructor(obj) {
        super(obj);
    }
}
exports.VOMemberFamily = VOMemberFamily;
