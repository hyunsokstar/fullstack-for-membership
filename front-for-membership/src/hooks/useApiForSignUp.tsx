import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { ResponseTypeForSignUp } from '@/types/typeForUser';
import { apiForSignUp } from '@/app/apis/apiForAuth';

const useApiForSignUp = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutationForSignUp = useMutation({
        mutationFn: apiForSignUp,
        onSuccess: (data: ResponseTypeForSignUp) => {
            console.log('Sign Up success', data);
            toast({
                title: 'Sign Up success',
                description: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            // queryClient.invalidateQueries('user');
        },
        onError: (error: any) => {
            console.error('Sign Up error', error);
            toast({
                title: 'Sign Up error',
                description: error.response.data.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        },
    });

    return mutationForSignUp;
};

export default useApiForSignUp;
