import subject from './../Api/subject';
import {GET_SUBJECT} from './mutation_type';

const addSubject = async ({commit},data) =>{
    return await subject.addSubject(data);
}

const getSubjectById = async ({commit},params) =>{
    return await subject.getSubjectById(params);
}

export default {
    namespaced: true,
    actions:{
        addSubject,
        getSubjectById
    },
    mutations:{
        GET_SUBJECT
    },
    state:{
        subjects:{}
    },
    getters:{
        getSubjects(state){
            return state.subjects;
        }
    }
    
}
