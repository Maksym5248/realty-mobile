import { StyleSheet } from 'react-native';

import { dimensions } from '~/styles';

export const s = StyleSheet.create({
  headlineContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: dimensions.l,
  },
});
