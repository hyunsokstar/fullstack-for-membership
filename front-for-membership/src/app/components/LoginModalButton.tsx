import React from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, ModalContent, ModalCloseButton, Button, Input, FormLabel, FormControl, useDisclosure, Box } from "@chakra-ui/react";
import { useAuthStore } from "@/store/AuthStore";

type FormData = {
    email: string;
    password: string;
};

const LoginModalButton: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { login } = useAuthStore();

    const onSubmit = (data: FormData) => {
        login(data.email, data.password);
        onClose();
    };

    return (
        <>
            <Button
                onClick={onOpen} as="a" fontSize="sm" fontWeight={400}
                variant="outline" mr={4}>
                Sign in
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" {...register("email")} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" {...register("password")} />
                            </FormControl>

                            <Box mt={4} display="flex" justifyContent="flex-end">
                                <Button colorScheme="gray" mr={2} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" colorScheme="blue">
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default LoginModalButton;
