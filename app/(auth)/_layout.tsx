import { Stack } from "expo-router";
import React from "react";
import GuestOnly from "../../components/auth/GuestOnly";

const AuthLayout = () => {  
  return (
    <GuestOnly>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none"
        }}
      />
    </GuestOnly>
  );
};

export default AuthLayout;
