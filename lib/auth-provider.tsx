import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import userApiRequest from "@/apiRequest/user";
import { getPorfileType } from "@/schemaValidations/user.schema";
import { TokenManager } from "./http1";

interface AuthContextType {
    isLogged: boolean;
    user: getPorfileType | null;
    loading: boolean;
    refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

async function getCurrentUser() {
    const token = await TokenManager.getToken()

    if (token == "" || !token) {
        return null
    }
    try {
        const result = await userApiRequest.getProfile();
        if (result.status === 200) {
            return result.payload;
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        return null;
    }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const {
        data: userData,
        loading,
        refetch,
    } = useAuth<getPorfileType | null, {}>({
        fn: getCurrentUser,
    });

    const [user, setUser] = useState<getPorfileType | null>(null);

    useEffect(() => {
        setUser(userData || null);
    }, [userData]);

    const isLogged = !!user;

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                user,
                loading,
                refetch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
