import {defineStore} from 'pinia';
import api from '@/api';

const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            username: localStorage.getItem('username') || '',
            token: localStorage.getItem('token') || '',
            fail_time: localStorage.getItem('fail_time') || ''
        }),
        getters: {
            isLogin: (state) => {
                let isLogin = false;
                if (state.token) {
                    if (new Date().getTime() < parseInt(state.fail_time) * 1000) {
                        isLogin = true;
                    }
                }
                return isLogin;
            }
        },
        actions: {
            login(data: {
                username: string,
                password: string
            }) {
                return new Promise<void>((resolve, reject) => {
                    api.post('/mock/user/login', data).then(res => {
                        console.log(res)
                        localStorage.setItem('username', res.data.data.username);
                        localStorage.setItem('token', res.data.data.token);
                        localStorage.setItem('fail_time', res.data.data.fail_time);
                        this.username = res.data.data.username;
                        this.token = res.data.data.token;
                        this.fail_time = res.data.data.fail_time;
                        resolve()
                    }).catch(error => {
                        reject(error);
                    });
                });
            }
        }
    }
);

export default useUserStore;
