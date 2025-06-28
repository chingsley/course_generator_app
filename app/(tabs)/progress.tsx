import ProgressCard from '@/components/Shared/ProgressCard';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import { useCoursesContext } from '@/context/CoursesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Progress = () => {
  const router = useRouter();
  const { userDetail } = useContext(UserDetailContext);
  const { courseList, getCourseList } = useCoursesContext();
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  const hanldeRefresh = async () => {
    setLoadingRefresh(true);
    userDetail && await getCourseList(userDetail?.email);
    setLoadingRefresh(false);
  };

  useEffect(() => {
    userDetail && getCourseList(userDetail?.email);
  }, [userDetail]);

  return (
    <SafeAreaView>
      <Image source={images.wave} />
      <View style={styles.topContainerAbsolute}>
        <Text style={styles.pageCaption}>Course Progress</Text>
        <FlatList
          data={[]}
          renderItem={() => null}
          style={{ marginBottom: 40, }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loadingRefresh}
              onRefresh={hanldeRefresh}
              tintColor={colors.PRIMARY_BLUE}
              progressViewOffset={Platform.OS === 'ios' ? 100 : 50}
              style={{ zIndex: 100 }}
            />
          }
          ListHeaderComponent={
            <FlatList
              data={courseList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  style={styles.progressCardTouchableContainer}
                  onPress={() => router.push(`/courseView/${item.id}`)}
                >
                  <ProgressCard course={item} style={{ width: '100%' }} />
                </TouchableOpacity>
              )}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Progress;

const styles = StyleSheet.create({
  topContainerAbsolute: {
    position: 'absolute',
    width: '100%',
    padding: 20,
    top: 60,
    height: Dimensions.get('screen').height * 0.9, // without this height property the FlatList scroll won't work
  },
  pageCaption: {
    fontFamily: 'roboto-bold',
    fontSize: 25,
    color: colors.WHITE,
    marginBlock: 10,
  },
  progressCardTouchableContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});