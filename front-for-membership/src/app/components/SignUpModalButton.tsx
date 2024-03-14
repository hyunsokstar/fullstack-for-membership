import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
    Button,
    Flex,
    Input,
    InputGroup,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    FormLabel,
    FormControl,
    useDisclosure,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type SignUpFormData = {
    email: string
    password: string
    password_check: string
}

const signUpSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    password_check: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required(),
})

const SignUpModalButton: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: yupResolver(signUpSchema),
    })

    const onSubmit = (data: SignUpFormData) => {
        console.log(data)
    }

    return (
        <>
            <Button
                onClick={onOpen}
                as="a"
                fontSize="sm"
                fontWeight={400}
                colorScheme='blue'
                mr={4}
            >
                Sign Up
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" {...register('email')} />
                                <FormLabel color="red.500">{errors.email?.message}</FormLabel>
                            </FormControl>

                            <FormControl isInvalid={!!errors.password} mt={4}>
                                <Flex justifyContent="space-between" alignItems="center" mb={1}>
                                    <FormLabel>Password</FormLabel>
                                    <Button
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                        bg="transparent"
                                        _hover={{ bg: "transparent" }}
                                        _active={{ bg: "transparent" }}
                                        _focus={{ boxShadow: "none" }}
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </Flex>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                    />
                                </InputGroup>
                                <FormLabel color="red.500">{errors.password?.message}</FormLabel>
                            </FormControl>

                            <FormControl isInvalid={!!errors.password_check} mt={4}>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password_check")}
                                />
                                <FormLabel color="red.500">{errors.password_check?.message}</FormLabel>
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type="submit" form="signup-form">
                            Sign Up
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SignUpModalButton
