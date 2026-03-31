import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/data/app-context';

export default function TaskerLayout() {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2ec4b6',
        tabBarStyle: { paddingBottom: 6, height: 56 },
        headerStyle: { backgroundColor: '#2ec4b6' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Available',
          headerTitle: 'Available Chores',
          tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-tasks"
        options={{
          title: 'My Tasks',
          tabBarIcon: ({ color, size }) => <Ionicons name="checkmark-done-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
