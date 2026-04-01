import { getUser, useApp } from '@/data/app-context';
import { CATEGORIES } from '@/data/mock-data';
import { useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AvailableChoresScreen() {
  const { currentUser, chores, setChores } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const openChores = chores.filter(
    (c) => c.status === 'open' && (selectedCategory === 'All' || c.category === selectedCategory)
  );

  const acceptChore = (choreId: string) => {
    Alert.alert('Accept Chore', 'Are you sure you want to accept this chore?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept',
        onPress: () => {
          setChores((prev) =>
            prev.map((c) => (c.id === choreId ? { ...c, status: 'accepted', taskerId: currentUser!.id } : c))
          );
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.filterChip, selectedCategory === c && styles.filterChipActive]}
            onPress={() => setSelectedCategory(c)}
          >
            <Text style={[styles.filterText, selectedCategory === c && styles.filterTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {openChores.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No open chores available.</Text>
        </View>
      ) : (
        <FlatList
          data={openChores}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const requester = getUser(item.requesterId);
            return (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                <Text style={styles.cardDetail}>📍 {item.location}</Text>
                <Text style={styles.cardDetail}>📅 {item.scheduledDate}</Text>
                {requester && (
                  <Text style={styles.cardDetail}>
                    👤 {requester.name} (⭐ {requester.rating})
                  </Text>
                )}
                <View style={styles.cardFooter}>
                  <Text style={styles.price}>${item.price}</Text>
                  <TouchableOpacity style={styles.acceptButton} onPress={() => acceptChore(item.id)}>
                    <Text style={styles.acceptText}>Accept</Text>
                  </TouchableOpacity>
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
  filterRow: { flexGrow: 0, flexShrink: 0, paddingHorizontal: 12, paddingVertical: 12 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: '#2ec4b6' },
  filterText: { color: '#495057', fontWeight: '500' },
  filterTextActive: { color: '#fff' },
  list: { padding: 16, paddingTop: 4 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#6c757d' },
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
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a2e' },
  cardCategory: { fontSize: 13, color: '#6c757d', marginTop: 2 },
  cardDesc: { fontSize: 14, color: '#495057', marginTop: 8 },
  cardDetail: { fontSize: 14, color: '#495057', marginTop: 6 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  price: { fontSize: 22, fontWeight: '800', color: '#2ec4b6' },
  acceptButton: {
    backgroundColor: '#2ec4b6',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  acceptText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
