import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function CardPayment() {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const expiryRef = useRef(null);
  const cvvRef = useRef(null);

  const isReady =
    cardNumber.replace(/\s/g, "").length === 16 &&
    expiry.length === 5 &&
    cvv.length >= 3;

  return (
    <KeyboardAvoidingView style={styles.root} behavior="height">
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.prompt}>Please enter your card details</Text>

        <CardInput
          label="Card number"
          placeholder="1212 1212 1212 1212"
          value={cardNumber}
          onChangeText={(t) => setCardNumber(formatCardNumber(t))}
          maxLength={22} // 16 digits + 3 spaces
          onSubmitEditing={() => expiryRef.current?.focus()}
        />

        <View style={styles.twoCol}>
          <CardInput
            label="Expiry date"
            placeholder="MM/YY"
            value={expiry}
            onChangeText={(t) => setExpiry(formatExpiry(t))}
            maxLength={5}
            inputRef={expiryRef}
            onSubmitEditing={() => cvvRef.current?.focus()}
            style={{ flex: 1 }}
          />
          <CardInput
            label="CVV"
            placeholder="234"
            value={cvv}
            onChangeText={(t) => setCvv(t.replace(/\D/g, "").slice(0, 4))}
            maxLength={4}
            secureTextEntry
            inputRef={cvvRef}
            style={{ flex: 1 }}
          />
        </View>

        <TouchableOpacity style={[styles.payBtn, !isReady && styles.payBtnDisabled]} activeOpacity={0.85} onPress={() => router.push('/booking/booking-success')}>
          <Text style={styles.payText}>Pay RM 30.00</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

function formatExpiry(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

function formatCardNumber(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.match(/.{1,4}/g)?.join('  ') ?? digits;
}

function CardInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'numeric',
  maxLength,
  secureTextEntry,
  inputRef,
  onSubmitEditing,
  style,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.fieldWrap, style]}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#4A5978"
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        returnKeyType="next"
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          focused && styles.inputFocused,
        ]}
        selectionColor="#2563EB"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },

  // Scroll
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },

  // Prompt
  prompt: {
    color: '#8A9BB5',
    fontSize: 13,
    marginBottom: 28,
  },

  // Two column
  twoCol: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 0,
  },

  // Field
  fieldWrap: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: '#8A9BB5',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: '#131929',
    borderWidth: 1,
    borderColor: '#2A3550',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 5,
    letterSpacing: 0.5,
  },
  inputFocused: {
    borderColor: '#2563EB',
    backgroundColor: '#0F1E38',
  },

  // Pay button
  payBtn: {
    backgroundColor: '#2A3550',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  payBtnDisabled: {
    opacity: 0.45,
  },
  payText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});