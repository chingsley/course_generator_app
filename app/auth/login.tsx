// app / auth / login.tsx

import { auth, db } from '@/config/firebaseConfig';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { UserDetail, UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useState, } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('Bjjhh@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const { setUserDetail } = useContext(UserDetailContext);


  const onLoginClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then(async resp => {
        const user = resp.user;
        await getUserDetail();
        setLoading(false);
        router.replace('/(tabs)/home');
      }).catch(error => {
        console.error('\n onLoginClick: ', error);
        setLoading(false);
        ToastAndroid.show('Incorrect email or password', ToastAndroid.BOTTOM);
      });
  };


  const getUserDetail = async () => {
    const result = await getDoc(doc(db, 'users', email.toLowerCase()));
    setUserDetail(result.data() as UserDetail);
  };

  return (
    <View>
      <Image source={images.landing} style={styles.heroImage} />
      <View style={styles.btmContainer}>
        <Text style={styles.pageCaption}>Login to Continue</Text>
        <TextInput
          placeholder='Email'
          style={styles.textInput}
          placeholderTextColor={colors.MID_GRAY}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholder='Password'
          style={styles.textInput}
          placeholderTextColor={colors.MID_GRAY}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={styles.btn} onPress={onLoginClick} disabled={loading}>
          {!loading ?
            <Text style={styles.btnText}>Login</Text> :
            <ActivityIndicator size='small' color={colors.WHITE} />
          }
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