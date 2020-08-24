import data from './sample-data.json';

interface DataSet {
    id?: number;
    playTime?: number;
    auto?: boolean;
};

interface Options extends Omit<DataSet, 'playTime'> {
    merge?: boolean;
    minPlayTime: number;
}

const select = (data: DataSet[], options: Options): DataSet[] => {
    const filteredDataById = data.filter(filerById(options));
    const filteredDataByAuto = filteredDataById.filter(filerByAuto(options));
    const filteredDataByMinPlayTime = filteredDataByAuto.filter(filerByMinPlayTime(options));
    const mergedData = (options.merge) ? mergeDataSet(filteredDataByMinPlayTime) : filteredDataByMinPlayTime;
    return mergedData;
}

function filerById({ id }: Options) {
    return function (data: DataSet) {
        return (data.id === id);
    };
}

function filerByAuto({ auto }: Options) {
    return function (data: DataSet) {
        return (data.auto === auto);
    };
}

function filerByMinPlayTime({ minPlayTime }: Options) {
    return function (data: DataSet) {
        return (data.playTime >= minPlayTime);
    };
}

function mergeDataSet(data: DataSet[]) {
    const reversedDataSet = data.reverse();
    const result = [];
    reversedDataSet.forEach(data => {
        const found = result.reduce((prev, current) => {
            return prev || (current.id === data.id);
        }, false);
        if (!found) result.push(data);
        else result[data.id] = result[data.id] + data.playTime;
    });
    return result.reverse();
}