import { getUser, useApp } from '@/data/app-context';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STATUS_COLORS: Record<string, string> = {
  accepted: '#f9a825',
  in_progress: '#ff6d00',
  completed: '#2ec4b6',
};

const STATUS_LABELS: Record<string, string> = {
  accepted: 'Accepted',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export default function MyTasksScreen() {
  const { currentUser, chores, setChores } = useApp();
  const myTasks = chores.filter((c) => c.taskerId === currentUser?.id);

  const updateStatus = (choreId: string, newStatus: 'in_progress' | 'completed') => {
    setChores((prev) => prev.map((c) => (c.id === choreId ? { ...c, status: newStatus } : c)));
  };

  return (
    <View style={styles.container}>
      {myTasks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No tasks yet.</Text>
          <Text style={styles.emptySubtext}>Accept chores from the Available tab</Text>
        </View>
      ) : (
        <FlatList
          data={myTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const requester = getUser(item.requesterId);
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status] || '#adb5bd' }]}>
                    <Text style={styles.badgeText}>{STATUS_LABELS[item.status] || item.status}</Text>
                  </View>
                </View>
                <Text style={styles.cardDetail}>📍 {item.location}</Text>
                <Text style={styles.cardDetail}>📅 {item.scheduledDate}</Text>
                {requester && <Text style={styles.cardDetail}>👤 Requester: {requester.name}</Text>}
                <View style={styles.cardFooter}>
                  <Text style={styles.price}>${item.price}</Text>
                  {item.status === 'accepted' && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#ff6d00' }]}
                      onPress={() => updateStatus(item.id, 'in_progress')}
                    >
                      <Text style={styles.actionText}>Start</Text>
                    </TouchableOpacity>
                  )}
                  {item.status === 'in_progress' && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#2ec4b6' }]}
                      onPress={() =>
                        Alert.alert('Complete Task', 'Mark this task as completed?', [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Complete', onPress: () => updateStatus(item.id, 'completed') },
                        ])
                      }
                    >
                      <Text style={styles.actionText}>Complete</Text>
                    </TouchableOpacity>
                  )}
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
  cardDetail: { fontSize: 14, color: '#495057', marginTop: 6 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  price: { fontSize: 20, fontWeight: '800', color: '#2ec4b6' },
  actionButton: { borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
