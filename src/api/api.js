import axios from 'axios';

let base = '';

//export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const requestLogin = params => { return axios.post(`action/webLoginAction`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getSystem = params => { return axios.get(`${base}/system`, { params: params }); };

export const dialUp = params => { return axios.post(`action/udialHandleAction`,params ); };
//export const dialUp = params => { return axios.post(`${base}/api/dialUp`, params); };
//export const dialUp = params  => {return axios.create({url:'${base}/api/dialUp', method:'post', headers:'Content-Type:text/javascript', params:params}).then(res => res.data)}

//export const getPorts = data => { return axios.post(`${base}/api/ports`, { params: data }); };
export const getPorts = data => { return axios.post(`action/interfaceMonitorAction`); };
