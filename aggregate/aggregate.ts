import data from './sample-data.json';

interface DataSet {
    id?: number;
    playTime?: number;
    auto?: boolean;
};

const select = (data: DataSet[], options: DataSet): DataSet[] => {
    const filteredDataById = data.filter(filerById(options));
    return data;
}

function filerById({ id }: DataSet) {
    return function (data: DataSet) {
        return data.id === id;
    };
};
