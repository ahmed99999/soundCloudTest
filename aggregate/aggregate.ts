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

    return data;
}

function filerById({ id }: Options) {
    return function (data: DataSet) {
        return data.id === id;
    };
};

function filerByAuto({ auto }: Options) {
    return function (data: DataSet) {
        return data.auto === auto;
    };
}