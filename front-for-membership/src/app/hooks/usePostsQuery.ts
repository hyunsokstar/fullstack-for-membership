import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types/typeForTest';
import { fetchPosts } from '../apis/apiForTest';


const usePostsQuery = () => {
    const { isLoading, error, data } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: fetchPosts,

    });

    return { isLoading, error, data };
};

export default usePostsQuery;