import { ThemedText } from '@/components/themed-text';
import { ThemedButton } from '@/components/ThemedButton';
import { Fonts } from '@/constants/theme';
import { fetchAPI } from '@/lib/api';
import { ISearchResult } from '@/lib/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { ActivityIndicator, ImageBackground, Keyboard, StyleSheet, TextInput } from 'react-native';

type ErrorType = 404 | 500;

const LoginSearch = ({
  searchResult,
  setSearchResult,
}: {
  searchResult: null | 'NOT_FOUND';
  setSearchResult: Dispatch<SetStateAction<ISearchResult | null>>;
}) => {
  const errorMessage: Record<ErrorType, string> = {
    404: 'Login non trouvé',
    500: 'Une erreure est survenue',
  };
  const [login, setLogin] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function searchLogin() {
    if (!login) return;
    setLoading(true);
    Keyboard.dismiss();
    try {
      const res = (await fetchAPI('get', `/v2/users/${login.toLowerCase()}`)) as any;
      if (res) {
        const dataRes = res.data as ISearchResult;
        const data = dataRes;

        setLoading(false);
        setSearchResult(data);
      }
    } catch (err: any) {
      setError(errorMessage[err.status as ErrorType] || errorMessage[500]);
      setLoading(false);
    }
  }

  const fortyTwoImage = {
    uri: 'https://auth.42.fr/auth/resources/yyzrk/login/students/img/bkgrnd.jpg',
  };

  if (loading)
    return (
      <ImageBackground source={fortyTwoImage} style={styles.container}>
        <ActivityIndicator size="large" color="rgba(255, 255, 255, 0.4)" />
      </ImageBackground>
    );

  return (
    <ImageBackground source={fortyTwoImage} style={styles.container}>
      <ThemedText
        type="title"
        style={{
          fontFamily: Fonts.rounded,
          marginBottom: 10,
          color: '#bdc28fad',
        }}
      >
        {'Tapez un login'}
      </ThemedText>

      <TextInput
        textContentType="name"
        value={login}
        placeholder="Eazenag"
        placeholderTextColor={'grey'}
        style={styles.input}
        onChangeText={(login: string) => {
          setLogin(login);
          if (error) setError(null);
        }}
      />
      {login && !error && (
        <ThemedButton title="Rechercher" onPress={searchLogin} disabled={!login} />
      )}

      {error && <ThemedText style={styles.errorResult}>{error}</ThemedText>}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    width: 150,
    textAlign: 'center',
    color: 'white',
  },
  errorResult: {
    position: 'absolute',
    top: '65%',
    color: 'orange',
  },
  button: {
    backgroundColor: '#ffffff66',
    height: 30,
    width: 30,
  },
});

export default LoginSearch;
