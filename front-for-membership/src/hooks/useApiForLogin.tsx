import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { apiForLogin } from '../app/apis/apiForAuth';
import { DataForLogin, LoginResponse } from '../types/typeForUser';
import useAuthStore from '@/store/AuthStore';

const useApiForLogin = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { login } = useAuthStore();


    const mutationForLogin = useMutation<LoginResponse, unknown, DataForLogin>({
        mutationFn: apiForLogin,
        onSuccess: (data) => {
            console.log('Login success', data);

            if (data.success) {
                login(data.loginUser)
                localStorage.setItem('accessToken', data.accessToken);
            }

            toast({
                title: 'Login success',
                description: 'You have successfully logged in',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        },
        onError: (error) => {
            console.error('Login error', error);
            toast({
                title: 'Login error',
                description: 'An error occurred during login',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForLogin;
};

export default useApiForLogin;
