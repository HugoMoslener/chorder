import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '@/data/app-context';

export default function RequesterProfileScreen() {
  const { currentUser, chores, setCurrentUser } = useApp();
  const router = useRouter();
  const myChores = chores.filter((c) => c.requesterId === currentUser?.id);
  const spent = myChores.reduce((sum, c) => sum + c.price, 0);

  const signOut = () => {
    setCurrentUser(null);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{currentUser?.avatar}</Text>
      </View>
      <Text style={styles.name}>{currentUser?.name}</Text>
      <Text style={styles.role}>Requester</Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{myChores.length}</Text>
          <Text style={styles.statLabel}>Posted</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{myChores.filter((c) => c.status === 'completed').length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>${spent}</Text>
          <Text style={styles.statLabel}>Spent</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', alignItems: 'center', paddingTop: 40 },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4361ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', color: '#1a1a2e', marginTop: 14 },
  role: { fontSize: 14, color: '#6c757d', marginTop: 2 },
  statsRow: { flexDirection: 'row', marginTop: 32, gap: 32 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '800', color: '#1a1a2e' },
  statLabel: { fontSize: 13, color: '#6c757d', marginTop: 2 },
  signOut: {
    marginTop: 48,
    backgroundColor: '#e63946',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 14,
  },
  signOutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
