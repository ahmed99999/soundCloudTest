import * as data from './sample-data.json';

interface DataSet {
    id?: number;
    playTime?: number;
    auto?: boolean;
};

interface Options extends Omit<DataSet, 'playTime'> {
    merge?: boolean;
    minPlayTime?: number;
}

const select = (data: DataSet[], options: Options): DataSet[] => {

    const { id, auto, minPlayTime, merge } = options;

    const mergedData = (merge == true) ? mergeDataSet(data) : data;

    const filteredDataById = mergedData.filter(filerById(id));

    const filteredDataByAuto = filteredDataById.filter(filerByAuto(auto));

    const filteredDataByMinPlayTime = filteredDataByAuto.filter(filerByMinPlayTime(minPlayTime));

    return filteredDataByMinPlayTime;
}

function filerById(id: number) {
    return function (data: Object) {
        return (id === undefined) || (data["id"] === id);
    };
}

function filerByAuto(auto: boolean) {
    return function (data: Object) {
        return (auto === undefined) || (data["auto"] === auto);
    };
}

function filerByMinPlayTime(minPlayTime: number) {
    return function (data: Object) {
        return (minPlayTime === undefined) || (data["playTime"] >= minPlayTime);
    };
}

function mergeDataSet(dataItems: DataSet[]) {
    const reversedDataSet = dataItems.slice(0).reverse();
    const result = [];
    reversedDataSet.forEach(data => {
        const found = result.reduce((prev, current) => {
            return prev || (current.id === data.id);
        }, false);
        if (!found) result.push({ ...data });
        else {
            const currentData = result.filter(cuData => cuData.id === data.id)[0];
            currentData.auto = currentData.auto && data.auto;
            currentData.playTime = currentData.playTime + data.playTime;
        }
    });
    return result.reverse();
}

const first = select(data, { merge: true });
console.log(first);

const second = select(data, { id: 2 });
console.log(second);

const third = select(data, { minPlayTime: 4000 });
console.log(third);

const fourth = select(data, { merge: true, minPlayTime: 4000 });
console.log(fourth);
