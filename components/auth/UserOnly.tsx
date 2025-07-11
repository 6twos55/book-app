import { useRouter } from "expo-router"
import { useUser } from "../../hooks/useUser";
import { ReactNode, useEffect } from "react";
import { Text } from "react-native";
import ThemedLoader from "../ThemedLoader";

interface UserOnlyProps {
  children: ReactNode;
}

const UserOnly = ({ children }: UserOnlyProps) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if(authChecked && user === null) {
      router.replace("/login");
    }
  }, [user, authChecked])

  if(!authChecked || !user) {
    return <ThemedLoader />;
  }
  
  return children;
}

export default UserOnly;