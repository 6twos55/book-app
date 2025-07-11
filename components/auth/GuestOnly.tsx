import { useRouter } from "expo-router"
import { useUser } from "../../hooks/useUser";
import { ReactNode, useEffect } from "react";
import ThemedLoader from "../ThemedLoader";

interface GuestOnlyProps {
  children: ReactNode;
}

const GuestOnly = ({ children }: GuestOnlyProps) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if(authChecked && user !== null) {
      router.replace("/profile");
    }
  }, [user, authChecked])

  if(!authChecked || user) {
    return <ThemedLoader />;
  }
  
  return children;
}

export default GuestOnly;