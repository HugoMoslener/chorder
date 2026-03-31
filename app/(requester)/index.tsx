import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useApp } from '@/data/app-context';
import { CATEGORIES, type ChoreRequest } from '@/data/mock-data';

export default function PostChoreScreen() {
  const { currentUser, setChores } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Cleaning');

  const handlePost = () => {
    if (!title || !description || !price || !location) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    const newChore: ChoreRequest = {
      id: `c${Date.now()}`,
      title,
      description,
      category,
      price: parseFloat(price),
      location,
      status: 'open',
      requesterId: currentUser!.id,
      postedAt: 'Just now',
      scheduledDate: 'TBD',
    };

    setChores((prev) => [newChore, ...prev]);
    Alert.alert('Success!', 'Your chore has been posted.');
    setTitle('');
    setDescription('');
    setPrice('');
    setLocation('');
  };

  const availableCategories = CATEGORIES.filter((c) => c !== 'All');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Lawn Mowing" placeholderTextColor="#999" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the chore in detail..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {availableCategories.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.categoryChip, category === c && styles.categoryChipActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.categoryText, category === c && styles.categoryTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Budget ($)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="e.g. 50"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="e.g. 123 Maple St" placeholderTextColor="#999" />

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post Chore</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 20 },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  categoryRow: { flexDirection: 'row', marginVertical: 4 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    marginRight: 8,
  },
  categoryChipActive: { backgroundColor: '#4361ee' },
  categoryText: { color: '#495057', fontWeight: '500' },
  categoryTextActive: { color: '#fff' },
  postButton: {
    backgroundColor: '#4361ee',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  postButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
