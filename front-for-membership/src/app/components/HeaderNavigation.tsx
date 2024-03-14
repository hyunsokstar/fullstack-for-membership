import { Box, Flex, Link, Button, Divider } from "@chakra-ui/react";
import LoginModalButton from "./LoginModalButton";
import SignUpModalButton from "./SignUpModalButton";
import { useAuthStore } from "@/store/AuthStore";

const HeaderNavigation = () => {
    const { user } = useAuthStore();

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
                {user ? (
                    <Box display={"flex"}>
                        <Box mr={2}>안녕하세요 {user.email}님</Box>
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
