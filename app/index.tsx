import { auth, db } from '@/config/firebaseConfig';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { UserDetail, UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user);
      const result = await getDoc(doc(db, 'users', user.email!));
      setUserDetail(result.data() as UserDetail);
      router.replace('/(tabs)/home');
    }
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image source={images.landing} style={styles.heroImage} />
      <View style={styles.btmContainer}>
        <Text style={styles.btmContainerCaption}>Welcome to KC Coaching School</Text>
        <Text style={styles.btmContainerDesc}>Transform your ideas into engaging educational content with AI effortlessly!</Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')} style={styles.btmContainerBtn}>
          <Text style={[styles.btmContainerBtnTxt, { color: colors.DARK_BLUE }]}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/auth/login')} style={[styles.btmContainerBtn, {
          backgroundColor: colors.PRIMARY_BLUE,
          borderWidth: 1,
          borderColor: colors.WHITE,
        }]}>
          <Text style={[styles.btmContainerBtnTxt, { color: colors.WHITE, }]}>Already have an Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 300,
    marginTop: 70,
  },
  btmContainer: {
    padding: 25,
    marginTop: 35,
    backgroundColor: colors.PRIMARY_BLUE,
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  btmContainerCaption: {
    fontSize: 30,
    fontFamily: 'roboto-bold',
    textAlign: 'center',
    letterSpacing: 1,
    color: colors.WHITE,
  },
  btmContainerDesc: {
    fontSize: 20,
    fontFamily: 'roboto',
    color: colors.WHITE,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  btmContainerBtn: {
    padding: 17,
    backgroundColor: colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  btmContainerBtnTxt: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'roboto',
  }
});
