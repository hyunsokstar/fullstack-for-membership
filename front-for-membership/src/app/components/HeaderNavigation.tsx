import { Box, Flex, Link, Button, Divider } from "@chakra-ui/react";
import LoginModalButton from "./LoginModalButton";
import SignUpModalButton from "./SignUpModalButton";
import useAuthStore from "@/store/AuthStore";
import { useEffect } from "react";
import { apiForLoginCheck } from "../apis/apiForAuth";

const HeaderNavigation = () => {
    const { loginUser, login } = useAuthStore();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await apiForLoginCheck();
                console.log("response for logincheck : ", response);

                if (response.loginUser) {
                    login(response.loginUser);
                }
            } catch (error) {
                console.error("Login check error:", error);
            }
        };

        if (!loginUser) {
            checkLogin();
        }

    }, [loginUser, login]);

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={4}
            bg="white"
            position="sticky"
            top={0}
            zIndex={1}
        >
            <Flex align="center" mr={5}>
                <Box>
                    <Link to="/">
                        <Box fontSize="2xl" fontWeight="bold" fontFamily="serif" mt={2}>
                            MemberShip
                        </Box>
                    </Link>
                </Box>
            </Flex>

            <Box mt={2}>
                {loginUser ? (
                    <Box display={"flex"}>
                        <Box mr={2}>안녕하세요 {loginUser.email}님</Box>
                        <Button colorScheme="blue" onClick={() => useAuthStore.getState().logout()}>
                            로그아웃
                        </Button>
                    </Box>
                ) : (
                    <>
                        <LoginModalButton />
                        <SignUpModalButton />
                    </>
                )}
            </Box>
            <Divider orientation="horizontal" mt={4} />
        </Flex>
    );
};

export default HeaderNavigation;
