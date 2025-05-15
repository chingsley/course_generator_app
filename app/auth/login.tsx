import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
  const router = useRouter();

  return (
    <View>
      <Image source={images.landing} style={styles.heroImage} />
      <View style={styles.btmContainer}>
        <Text style={styles.pageCaption}>Login to Continue</Text>
        <TextInput placeholder='Email' style={styles.textInput} placeholderTextColor={colors.MID_GRAY} />
        <TextInput placeholder='Password' style={styles.textInput} placeholderTextColor={colors.MID_GRAY} secureTextEntry={true} />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.ahaBox}>
          <Text style={styles.ahaText}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => router.push('/auth/register')}>
            <Text style={styles.ahaLink}>Register Here</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 300,
    marginTop: 70,
  },
  btmContainer: {
    padding: 25,
    height: '100%'
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.DARK_BLUE,
    width: '100%',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    fontFamily: 'roboto',
    fontSize: 18,
  },
  pageCaption: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'roboto-bold',
    color: colors.DARK_BLUE,
  },
  btn: {
    backgroundColor: colors.PRIMARY_BLUE,
    padding: 15,
    width: '100%',
    marginTop: 25,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: 'roboto',
    fontSize: 20,
    color: colors.WHITE,
    textAlign: 'center',
  },
  ahaBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
    justifyContent: 'center',
  },
  ahaText: {
    fontFamily: 'roboto',
    fontSize: 18,
  },
  ahaLink: {
    color: colors.PRIMARY_BLUE,
    fontFamily: 'roboto-bold',
    fontSize: 18,
  }
});