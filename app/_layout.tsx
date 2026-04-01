import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AppProvider } from '@/data/app-context';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="requester" />
        <Stack.Screen name="tasker" />
      </Stack>
      <StatusBar style="dark" />
    </AppProvider>
  );
}
