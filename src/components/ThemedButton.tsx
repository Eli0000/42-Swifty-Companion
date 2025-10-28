import React from 'react';
import { type ButtonProps, Pressable, StyleSheet, Text } from 'react-native';

export type ThemedButtonProps = ButtonProps & {
  type?: 'default';
  title: string;
};

export function ThemedButton({
  disabled,
  type = 'default',
  title,
  onPress,
  ...rest
}: ThemedButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles[type],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      {...rest}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  default: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(174, 273, 331, 0.1)', // iOS blue
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#A9A9A9', // gris désactivé
  },
  pressed: {
    backgroundColor: 'rgba(174, 273, 331, 0.3)', // bleu foncé quand pressé
  },

  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  textDisabled: {
    color: '#bcb9b9ff',
  },
});
