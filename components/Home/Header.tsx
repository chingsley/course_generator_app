import { colors } from '@/constants/colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = () => {
  const { userDetail } = useContext(UserDetailContext);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hello, {userDetail?.name}</Text>
        <Text style={styles.letsGetStarted}>Let's get started</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  greeting: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
    color: colors.WHITE
  },
  letsGetStarted: {
    fontFamily: 'roboto',
    fontSize: 17,
  }
});