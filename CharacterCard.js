import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, statusInfo } from '../theme';

function CharacterCard({ character, onPress }) {
  const status = statusInfo[character.status] ?? statusInfo.unknown;

  return (
    <Pressable
      onPress={() => onPress(character)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${character.name}, ${status.label}. Ver detalhes`}
    >
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <View style={styles.row}>
          <View style={[styles.dot, { backgroundColor: status.color }]} />
          <Text style={styles.meta} numberOfLines={1}>
            {status.label} · {character.species}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: colors.surface,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  image: { width: '100%', aspectRatio: 1, backgroundColor: colors.surfaceHigh },
  body: { padding: 10, gap: 4 },
  name: { color: colors.text, fontSize: 15, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  meta: { color: colors.textMuted, fontSize: 12, flexShrink: 1 },
});

export default memo(CharacterCard);
