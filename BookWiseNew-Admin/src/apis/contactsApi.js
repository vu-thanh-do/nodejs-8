import axiosClient from './axiosClient';

const contactsApi = {
    createContact: (data) => {
        const url = '/contacts';
        return axiosClient.post(url, data);
    },
    getContactById: (id) => {
        const url = `/contacts/${id}`;
        return axiosClient.get(url);
    },
    updateContact: (id, data) => {
        const url = `/contacts/${id}`;
        return axiosClient.put(url, data);
    },
    deleteContact: (id) => {
        const url = `/contacts/${id}`;
        return axiosClient.delete(url);
    },
    searchContactsByName: (email) => {
        const url = '/contacts/search';
        const params = { email };
        return axiosClient.get(url, { params });
    },
    getAllContacts: () => {
        const url = '/contacts';
        return axiosClient.get(url);
    }
};

export default contactsApi;
