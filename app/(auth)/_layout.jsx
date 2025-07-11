import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack>
  );
};

export default AuthLayout;
