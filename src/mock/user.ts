export default [
    {
        url: '/mock/user/login',
        method: 'post',
        response: (option: any) => {
            return {
                error: '',
                status: 1,
                data: {
                    username: option.body.username,
                    token: '@string',
                    fail_time : Math.ceil(new Date().getTime() / 1000 + 24 * 60 * 60)
                }
            };
        }

    }
];
