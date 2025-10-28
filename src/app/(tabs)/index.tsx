import { StyleSheet } from 'react-native';

import { ISearchResult } from '@//lib/types';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import LoginResult from '../views/LoginResult';
import LoginSearch from '../views/LoginSearch';

export default function App() {
  const [searchResutl, setSearchResult] = useState<ISearchResult | null>(null);

  return (
    <>
      {!searchResutl ? (
        <LoginSearch searchResult={searchResutl} setSearchResult={setSearchResult} />
      ) : (
        <LoginResult setSearchResult={setSearchResult} res={searchResutl} />
      )}
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
