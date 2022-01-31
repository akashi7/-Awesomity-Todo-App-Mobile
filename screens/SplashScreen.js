/*eslint-disable*/
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import Logo from '../images/IW_logo.png';
import { useHistory } from 'react-router-native';


const { height, width } = Dimensions.get("screen");



const SplashScreen = () => {

  const navigate = useHistory();

  useEffect(() => {
    setTimeout(() => {
      navigate.push('/Home');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.imav} source={Logo} />
      <Text style={{ fontSize: 29 }}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2834',
    justifyContent: 'center',
    alignItems: "center",
    height: height,
    width: width
  },
  developer: {
    marginTop: 150,
  },
  imav: {
    width: 80,
    height: 80
  }

});

export default SplashScreen;
