import  { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the shape of authentication data
interface AuthContextType {
  user: any;
  id: string | null;
  login: (userData: { user: any; id: string }) => void;
  logout: () => void;
}

// Create Context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedId = localStorage.getItem("id");

    if (storedUser && storedId) {
      setUser(JSON.parse(storedUser));
      setId(storedId);
    }
  }, []);

  const login = (userData: { user: any; id: string }) => {
    setUser(userData.user);
    setId(userData.id);
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("id", userData.id);
  };

  const logout = () => {
    setUser(null);
    setId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  };

  return (
    <AuthContext.Provider value={{ user, id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
