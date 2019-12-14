"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elastic = require("elasticsearch");
const elastic_models_1 = require("./elastic-models");
class ElasticService {
    constructor(url, log) {
        this.url = url;
        this.log = log;
        ElasticService.service = this;
    }
    async getAllIndexes() {
        if (this.documents)
            return Promise.resolve(this.documents);
        return this.client.cat.indices({ v: true, format: 'json' }).then(res => {
            this.documents = res.map(function (item) {
                return {
                    health: item.health,
                    status: item.status,
                    index: item.index,
                    uuid: item.uuid,
                    pri: +item.pri,
                    rep: +item.rep,
                    docsCount: +item['docs.count'],
                    docsDeleted: +item['docs.deleted'],
                    storeSize: item['store.size'],
                    priStoreSize: item['pri.store.size']
                };
            });
            return this.documents;
        });
    }
    getMapping(field) {
        return this.client.indices.getMapping({
            index: field
        });
    }
    raw(obj) {
        this.client.get(obj);
    }
    static unique(ar) {
        return ar.filter(function (item) {
            if (this.u[item._id])
                return false;
            this.u[item._id] = true;
            return true;
        }, { u: {} });
    }
    async ping() {
        return new Promise((resolve, reject) => {
            this.client.ping({
                requestTimeout: 30000,
            }, (error) => {
                if (error)
                    reject(error.toString());
                else {
                    this.getAllIndexes().then(documents => {
                        this.documentsModels = documents.map(function (item) {
                            switch (item.index) {
                                case 'students': return new elastic_models_1.StudentsModel(item);
                                case 'new_membership_application_cms': return new elastic_models_1.NewMembership(item);
                                case 'renew_membership_application_cms': return new elastic_models_1.RenewMembership(item);
                                case 'users': return new elastic_models_1.UsersModel(item);
                                case 'classes': return new elastic_models_1.ClassesModel(item);
                            }
                        });
                        resolve(documents);
                    }).catch(reject);
                }
            });
        });
    }
    async connect() {
        this.client = new elastic.Client({
            host: this.url
        });
        return this.ping();
    }
}
exports.ElasticService = ElasticService;
