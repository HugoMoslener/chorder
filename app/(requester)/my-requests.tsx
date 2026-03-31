import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useApp, getUser } from '@/data/app-context';

const STATUS_COLORS: Record<string, string> = {
  open: '#4361ee',
  accepted: '#f9a825',
  in_progress: '#ff6d00',
  completed: '#2ec4b6',
};

const STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  accepted: 'Accepted',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export default function MyRequestsScreen() {
  const { currentUser, chores } = useApp();
  const myChores = chores.filter((c) => c.requesterId === currentUser?.id);

  return (
    <View style={styles.container}>
      {myChores.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No chores posted yet.</Text>
          <Text style={styles.emptySubtext}>Go to "Post Chore" to create one!</Text>
        </View>
      ) : (
        <FlatList
          data={myChores}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const tasker = item.taskerId ? getUser(item.taskerId) : null;
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status] }]}>
                    <Text style={styles.badgeText}>{STATUS_LABELS[item.status]}</Text>
                  </View>
                </View>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardDetail}>📍 {item.location}</Text>
                <Text style={styles.cardDetail}>📅 {item.scheduledDate}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.price}>${item.price}</Text>
                  {tasker && <Text style={styles.taskerName}>Tasker: {tasker.name}</Text>}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  list: { padding: 16 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#6c757d' },
  emptySubtext: { fontSize: 14, color: '#adb5bd', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a2e', flex: 1 },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardCategory: { fontSize: 13, color: '#6c757d', marginTop: 4 },
  cardDetail: { fontSize: 14, color: '#495057', marginTop: 6 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  price: { fontSize: 20, fontWeight: '800', color: '#4361ee' },
  taskerName: { fontSize: 13, color: '#6c757d' },
});
