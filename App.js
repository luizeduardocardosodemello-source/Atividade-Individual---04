import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CharacterCard from './src/components/CharacterCard';
import CharacterModal from './src/components/CharacterModal';
import { useCharacters } from './src/hooks/useCharacters';
import { colors } from './src/theme';

export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const { items, status, error, refreshing, loadingMore, reload, refresh, loadMore } =
    useCharacters(query);

  function renderBody() {
    if (status === 'loading') {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.hint}>Carregando personagens…</Text>
        </View>
      );
    }

    if (status === 'error') {
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Não foi possível carregar</Text>
          <Text style={styles.hint}>{error}</Text>
          <Pressable style={styles.button} onPress={reload}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CharacterCard character={item} onPress={setSelected} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={refresh}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.title}>Nenhum resultado</Text>
            <Text style={styles.hint}>Tente buscar por outro nome.</Text>
          </View>
        }
        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={styles.footer} color={colors.accent} /> : null
        }
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.heading}>Multiverso</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar personagem"
            placeholderTextColor={colors.textMuted}
            style={styles.search}
            autoCorrect={false}
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
        </View>
        {renderBody()}
        <CharacterModal character={selected} onClose={() => setSelected(null)} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, gap: 12 },
  heading: { color: colors.text, fontSize: 32, fontWeight: '800' },
  search: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  list: { paddingHorizontal: 10, paddingBottom: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 10 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  hint: { color: colors.textMuted, fontSize: 14, textAlign: 'center' },
  button: {
    marginTop: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: { color: colors.bg, fontWeight: '700', fontSize: 15 },
  footer: { paddingVertical: 20 },
});
