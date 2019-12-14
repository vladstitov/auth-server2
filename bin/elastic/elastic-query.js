"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esb = require('elastic-builder');
const _ = require('lodash');
var TextQuery;
(function (TextQuery) {
})(TextQuery = exports.TextQuery || (exports.TextQuery = {}));
function buildTextQuery(type, field, filter) {
    if (_.isNil(filter)) {
        return null;
    }
    const filterText = filter.toString();
    switch (type) {
        case 'contains':
            return esb.wildcardQuery(field, `*${filterText.toLowerCase()}*`);
        case 'startsWith':
            return esb.prefixQuery(field, filterText.toLowerCase());
        case 'endsWith':
            return esb.wildcardQuery(field, `*${filterText.toLowerCase()}`);
        case 'regex':
            return esb.regexpQuery(field, filterText);
        case 'equals':
            return esb.matchQuery(field, filterText);
        default:
            return null;
    }
}
exports.buildTextQuery = buildTextQuery;
;
function buildNumberQuery({ type, field, filter, filterTo }) {
    if (_.isNil(filter)) {
        return null;
    }
    switch (type) {
        case 'greaterThan':
            return esb.rangeQuery(field).gte(filter);
        case 'lessThan':
            return esb.rangeQuery(field).lte(filter);
        case 'inRange':
            return esb
                .rangeQuery(field)
                .gte(filter)
                .lte(filterTo);
        case 'equals':
            return esb.matchQuery(field, filter);
        default:
            return null;
    }
}
exports.buildNumberQuery = buildNumberQuery;
;
function buildDateQuery({ type, field, dateFrom, dateTo }) {
    if (_.isNil(dateFrom)) {
        return null;
    }
    switch (type) {
        case 'greaterThan':
            return esb.rangeQuery(field).gte(dateFrom);
        case 'lessThan':
            return esb.rangeQuery(field).lte(dateFrom);
        case 'inRange':
            return esb
                .rangeQuery(field)
                .gte(dateFrom)
                .lte(dateTo);
        case 'equals':
            return esb.matchQuery(field, dateFrom);
        default:
            return null;
    }
}
exports.buildDateQuery = buildDateQuery;
;
function buildSetQuery({ values, field }) {
    esb.boolQuery().should(values.map(v => esb.matchQuery(field, v)));
}
exports.buildSetQuery = buildSetQuery;
function buildGeoDistanceQuery({ lat, lon, field, distance }) {
    return _.isNil(lat) || _.isNil(lon) || _.isNil(distance) ? null :
        esb
            .geoDistanceQuery(field)
            .distance(distance)
            .geoPoint(esb
            .geoPoint()
            .lat(lat)
            .lon(lon));
}
exports.buildGeoDistanceQuery = buildGeoDistanceQuery;
function generateQuery({ filters, page, perPage, sortOn, sortBy, source }) {
    const filterCriteria = filters.map(f => {
        switch (f.filterType) {
            case 'text': {
                return buildTextQuery('text', f, null);
            }
            case 'number': {
                return buildNumberQuery(f);
            }
            case 'date': {
                return buildDateQuery(f);
            }
            case 'set': {
                return buildSetQuery(f);
            }
            case 'geodistance': {
                return buildGeoDistanceQuery(f);
            }
            default: {
                return null;
            }
        }
    }).filter(f => !_.isNil(f));
    const qry = esb.boolQuery().must(filterCriteria);
    let searchReq = esb.requestBodySearch();
    if (source) {
        searchReq = searchReq.source(source);
    }
    searchReq
        .query(qry)
        .from(page - 1)
        .size(perPage);
    if (sortOn && sortBy) {
        searchReq = searchReq.sort(esb.sort(sortOn, sortBy));
    }
    return searchReq.toJSON();
}
exports.generateQuery = generateQuery;
;
function formatElasticResponse(elasticResponse) {
    const data = _.get(elasticResponse, 'hits.hits', []).map(h => h._source);
    const resultsTotal = _.get(elasticResponse, 'hits.total', 0);
    const error = _.get(elasticResponse, 'error.reason');
    return {
        isSuccess: _.isNil(error),
        error,
        resultsTotal,
        data
    };
}
exports.formatElasticResponse = formatElasticResponse;
;
