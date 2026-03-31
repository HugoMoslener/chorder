import { useApp } from '@/data/app-context';
import { MOCK_USERS } from '@/data/mock-data';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { setCurrentUser } = useApp();

  const signIn = (role: 'requester' | 'tasker') => {
    const user = MOCK_USERS.find((u) => u.role === role)!;
    setCurrentUser(user);
    if (role === 'requester') {
      router.replace('/(requester)');
    } else {
      router.replace('/(tasker)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Chorder</Text>
        <Text style={styles.tagline}>An Uber for household chores</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.requesterButton]} onPress={() => signIn('requester')}>
          <Text style={styles.buttonTitle}>I need help</Text>
          <Text style={styles.buttonSubtitle}>Post chores and find taskers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.taskerButton]} onPress={() => signIn('tasker')}>
          <Text style={styles.buttonTitle}>I want to help</Text>
          <Text style={styles.buttonSubtitle}>Browse and complete chores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 8,
  },
  buttons: {
    gap: 16,
  },
  button: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  requesterButton: {
    backgroundColor: '#4361ee',
  },
  taskerButton: {
    backgroundColor: '#2ec4b6',
  },
  buttonIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  buttonTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
});
