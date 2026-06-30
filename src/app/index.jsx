import Snackbar from '@/components/common/Snackbar';
import { routeName } from '@/services/api';
import { authStorage } from '@/services/localStorage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';

// Login Screen
export default function Index() {
  const router = useRouter();

  // Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Snackbar UI
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  // Behaviour
  const [isLoading, setIsLoading] = useState(false)

  async function authenticate() {
    setIsLoading(true);

    await axios.post(routeName({ name: 'auth' }), {
        email: email,
        password: password
      })
      .then(response => {
        if (response.data.status == true) {
          authStorage.setToken(response.data.data.token);
          router.replace('/(tabs)/movies');
        } else {
          setSnackbarVisible(true)
          setSnackbarMessage(response.data.message);
        }
      })

    setIsLoading(false);
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior="height">
      <Snackbar visible={snackbarVisible} message={snackbarMessage} onDismiss={() => setSnackbarVisible(false)} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign in</Text>

          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
            activeOpacity={0.85}
            disabled={isLoading}
            onPress={() => authenticate()}>
            {
              isLoading == false 
                ? <Text style={styles.loginBtnText}>Sign in</Text> 
                : <ActivityIndicator animating={true} color="white"  />
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function AppInput({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType }) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputWrap, focused && styles.inputWrapFocused]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#4A5978"
          secureTextEntry={hidden}
          keyboardType={keyboardType ?? 'default'}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
          selectionColor="#2563EB"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden((v) => !v)} style={styles.eyeBtn}>
            <IconButton
              icon={hidden ? "eye-outline" : "eye-off-outline"}
              iconColor="#4A5978"
              size={18}
              style={{ margin: 0 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 48,
  },

  // Card
  card: {
    backgroundColor: '#131929',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1C2438',
    marginBottom: 24,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSub: {
    color: '#4A5978',
    fontSize: 13,
    marginBottom: 24,
    lineHeight: 19,
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
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0F1E',
    borderWidth: 1,
    borderColor: '#2A3550',
    borderRadius: 8,
  },
  inputWrapFocused: {
    borderColor: '#2563EB',
    backgroundColor: '#0F1E38',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    letterSpacing: 0.3,
  },
  eyeBtn: {
    paddingRight: 4,
  },

  // Login button
  loginBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnDisabled: {
    backgroundColor: '#2A3550',
    opacity: 0.6,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
