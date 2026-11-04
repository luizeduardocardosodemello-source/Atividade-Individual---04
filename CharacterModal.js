import React from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, statusInfo } from '../theme';

function Field({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || '—'}</Text>
    </View>
  );
}

export default function CharacterModal({ character, onClose }) {
  const status = character ? statusInfo[character.status] ?? statusInfo.unknown : null;

  return (
    <Modal visible={!!character} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        {character && (
          <View style={styles.sheet}>
            <ScrollView contentContainerStyle={styles.content}>
              <Image source={{ uri: character.image }} style={styles.image} />
              <Text style={styles.name}>{character.name}</Text>
              <View style={styles.statusRow}>
                <View style={[styles.dot, { backgroundColor: status.color }]} />
                <Text style={styles.statusText}>{status.label}</Text>
              </View>

              <Field label="Espécie" value={character.species} />
              <Field label="Gênero" value={character.gender} />
              <Field label="Origem" value={character.origin?.name} />
              <Field label="Última localização" value={character.location?.name} />
              <Field label="Episódios" value={String(character.episode?.length ?? 0)} />
            </ScrollView>

            <Pressable style={styles.close} onPress={onClose} accessibilityRole="button">
              <Text style={styles.closeText}>Fechar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(8,6,20,0.7)' },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: { padding: 20, gap: 12 },
  image: { width: '100%', aspectRatio: 1, borderRadius: 16, backgroundColor: colors.surfaceHigh },
  name: { color: colors.text, fontSize: 26, fontWeight: '800' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  statusText: { color: colors.textMuted, fontSize: 15 },
  field: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10, gap: 2 },
  fieldLabel: { color: colors.textMuted, fontSize: 13 },
  fieldValue: { color: colors.text, fontSize: 16 },
  close: {
    margin: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.accent,
  },
  closeText: { color: colors.bg, fontSize: 16, fontWeight: '700' },
});
