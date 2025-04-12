import useAuthRedirect from "@hooks/useAuthRedirect"
import useCheckAuth from "@hooks/useCheckAuth";

const AuthService = {
    checkToken: () => {
        useAuthRedirect();
    },
    checkAuth: () => {
        useCheckAuth();
    }
}

export default AuthService;