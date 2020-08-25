"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var data = require("./sample-data.json");
;
var select = function (data, options) {
    var id = options.id, auto = options.auto, minPlayTime = options.minPlayTime, merge = options.merge;
    var mergedData = (merge == true) ? mergeDataSet(data) : data;
    var filteredDataById = mergedData.filter(filerById(id));
    var filteredDataByAuto = filteredDataById.filter(filerByAuto(auto));
    var filteredDataByMinPlayTime = filteredDataByAuto.filter(filerByMinPlayTime(minPlayTime));
    return filteredDataByMinPlayTime;
};
function filerById(id) {
    return function (data) {
        return (id === undefined) || (data["id"] === id);
    };
}
function filerByAuto(auto) {
    return function (data) {
        return (auto === undefined) || (data["auto"] === auto);
    };
}
function filerByMinPlayTime(minPlayTime) {
    return function (data) {
        return (minPlayTime === undefined) || (data["playTime"] >= minPlayTime);
    };
}
function mergeDataSet(dataItems) {
    var reversedDataSet = dataItems.slice(0).reverse();
    var result = [];
    reversedDataSet.forEach(function (data) {
        var found = result.reduce(function (prev, current) {
            return prev || (current.id === data.id);
        }, false);
        if (!found)
            result.push(__assign({}, data));
        else {
            var currentData = result.filter(function (cuData) { return cuData.id === data.id; })[0];
            currentData.auto = currentData.auto && data.auto;
            currentData.playTime = currentData.playTime + data.playTime;
        }
    });
    return result.reverse();
}
var items = [
    { id: 8, playTime: 500, auto: false },
    { id: 7, playTime: 1500, auto: true },
    { id: 1, playTime: 100, auto: true },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true },
    { id: 2, playTime: 2000, auto: true }
];
var first = select(data, { merge: true });
console.log(first);
var second = select(data, { id: 2 });
console.log(second);
var third = select(data, { minPlayTime: 4000 });
console.log(third);
var fourth = select(data, { merge: true, minPlayTime: 4000 });
console.log(fourth);
