import { Api } from './index';

export default {
    async addSubject(subject) {
        return  await Api.post('subject/create', subject);
    },

    async getSubjectById(params) {
        return await Api.get(`subject/list/${params.id}`);
    }
}