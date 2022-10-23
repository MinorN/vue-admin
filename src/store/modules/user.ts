import {defineStore} from 'pinia';

const useUserStore = defineStore(
    'user',
    {
        state:()=>({
            username:localStorage.getItem('username') || '',
            token:localStorage.getItem('token') || '',
            fail_time:localStorage.getItem('fail_time') || ''
        }),
        getters:{
            isLogin:(state)=>{
                let isLogin = false
                if(state.token){
                    if(new Date().getTime() < parseInt(state.fail_time)*1000){
                        isLogin = true
                    }
                }
                return isLogin
            }
        },
        actions:{

        }
    }
)

export default useUserStore
