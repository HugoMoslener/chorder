import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RequesterLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4361ee',
        tabBarStyle: { paddingBottom: 6, height: 56 },
        headerStyle: { backgroundColor: '#4361ee' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Post Chore',
          headerTitle: 'Post a Chore',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-requests"
        options={{
          title: 'My Requests',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
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
