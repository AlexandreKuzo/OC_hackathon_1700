import studentsData from '../data/students.json';

export const dataProvider = {
    getList: async (resource, params) => {
        if (resource === 'students') {
            return {
                data: studentsData,
                total: studentsData.length
            };
        }
        return Promise.reject(`Resource ${resource} non supportée`);
    },
    
    getOne: (resource, params) => Promise.reject('Non implémenté'),
    getMany: (resource, params) => Promise.reject('Non implémenté'),
    getManyReference: (resource, params) => Promise.reject('Non implémenté'),
    create: (resource, params) => Promise.reject('Non implémenté'),
    update: (resource, params) => Promise.reject('Non implémenté'),
    updateMany: (resource, params) => Promise.reject('Non implémenté'),
    delete: (resource, params) => Promise.reject('Non implémenté'),
    deleteMany: (resource, params) => Promise.reject('Non implémenté'),
};