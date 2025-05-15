import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = () => {
  const router = useRouter();

  return (
    <View style={{
      borderWidth: 5,
      // borderColor: 'red',
      height: '100%'
    }}>
      <Image source={images.landing} style={styles.heroImage} />
      <View style={styles.btmContainer}>
        <Text style={styles.pageCaption}>Create An Account</Text>
        <TextInput placeholder='Full name' style={styles.textInput} placeholderTextColor={colors.MID_GRAY} />
        <TextInput placeholder='Email' style={styles.textInput} placeholderTextColor={colors.MID_GRAY} />
        <TextInput placeholder='Password' style={styles.textInput} placeholderTextColor={colors.MID_GRAY} secureTextEntry={true} />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.ahaBox}>
          <Text style={styles.ahaText}>
            Already have an account?
          </Text>
          <Pressable onPress={() => router.push('/auth/login')}>
            <Text style={styles.ahaLink}>Login in Here</Text>
          </Pressable>
        </View>
      </View>

      <Image
        source={images.accentBlob}   // or { uri: '…' }
        style={styles.accentBlob}
      />
      <Image
        source={images.accentBlob}   // or { uri: '…' }
        style={styles.accentBlob2}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 300,
    marginTop: 70,
  },
  btmContainer: {
    padding: 25,
    height: '100%',
    // TODO remove
    // margin: 4,
    // borderWidth: 1,
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
  },
  accentBlob: {
    position: 'absolute',
    bottom: -64,
    right: -100,
    width: 200,
    height: 200,
    resizeMode: 'contain',      // <-- preserve aspect ratio
    opacity: 0.3,
    transform: [
      { rotate: '150deg' }
    ],
  },
  accentBlob2: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    opacity: 0.3,
  },
});