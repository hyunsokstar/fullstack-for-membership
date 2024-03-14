'use client'
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import usePostsQuery from './hooks/usePostsQuery';
import { Post } from '@/types/typeForTest';

const MyComponent = () => {
  const { isLoading, error, data } = usePostsQuery();

  console.log("data: ", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      {data?.map((post: Post) => (
        <Box key={post.id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
          <Heading as="h2" size="lg" mb={2}>
            {post.name}
          </Heading>
          <Text>
            <strong>Username:</strong> {post.username}<br />
            <strong>Email:</strong> {post.email}<br />
            <strong>Phone:</strong> {post.phone}<br />
            <strong>Website:</strong> {post.website}<br />
            <strong>Address:</strong> {post.street}, {post.district}, {post.city}, {post.province}, {post.zipcode}<br />
            <strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()}<br />
            <strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleDateString()}<br />
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default MyComponent;
