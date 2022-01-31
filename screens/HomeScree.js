/*eslint-disable*/

import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import Logo from '../images/IW_logo.png';
import DashBar from '../components/DashBar';
import { useHistory } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { filterTasks, getAllTasks, updateTaskToDone, resetTwo, resetThree, updateTaskTounDone, countAllTasks, countTasksDone, countHighTasks } from '../redux/Actions/Tasks';
import { Overlay } from 'react-native-elements';


const { height, width } = Dimensions.get("screen");


export default function HomeScreen() {

  const navigate = useHistory();
  const { allTasks, completed, unDone, countTasks, taskDone, highTaskDone } = useSelector(store => store.tasks);

  const goToAdd = () => {
    navigate.push('/AddItem');
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
    dispatch(countAllTasks());
    dispatch(countTasksDone());
    dispatch(countHighTasks());
  }, []);

  const [visible, setVisible] = useState(false);
  const viewOne = async (id, title, url, date, priority, description, modifiedAt) => {
    let array = [];
    let itemObject = {
      id, title, url, date, priority, description, modifiedAt
    };
    array.push(itemObject);
    await AsyncStorage.setItem("itemArray", JSON.stringify(array));
    navigate.push(`/Item/${id}`);
  };

  function callStacks() {
    dispatch(getAllTasks());
    dispatch(countAllTasks());
    dispatch(countTasksDone());
    dispatch(countHighTasks());
  }

  useEffect(() => {
    if (completed) {
      Alert.alert("Yayy!", "Task done", [{
        text: "ok",
        onPress: () => callStacks()
      }]);
    }
    return () => dispatch(resetTwo());
  }, [completed]);

  useEffect(() => {
    if (unDone) {
      Alert.alert("ooh!", "Task undone again", [{
        text: "ok",
        onPress: () => callStacks()
      }]);
    }
    return () => dispatch(resetThree());
  }, [unDone]);

  const Toogle = (id, completed) => {
    if (completed === '1') {
      dispatch(updateTaskTounDone(id));
    }
    else {
      dispatch(updateTaskToDone(id));
    }
  };

  const ToogleOverLay = () => setVisible(!visible);
  const goToHome = () => [
    navigate.push("/Home")
  ];



  return (
    <View style={styles.constainer}  >
      <View style={styles.navBar} >
        <TouchableOpacity style={styles.imageCo} onPress={() => goToHome()}  >
          <Image source={Logo} style={styles.Images} />
        </TouchableOpacity>
        <Icon name='ios-filter-sharp' size={30} color="white" onPress={() => ToogleOverLay()} />
      </View>
      <Overlay isVisible={visible} onBackdropPress={() => ToogleOverLay()} overlayStyle={styles.overlayStye} >
        <Text style={styles.textOne} >Filter by priority</Text>
        <Text onPress={() => dispatch(filterTasks("high"))} style={styles.textTwo} >High priority</Text>
        <Text onPress={() => dispatch(filterTasks("medium"))} style={styles.textTwo} >Medium priority</Text>
        <Text onPress={() => dispatch(filterTasks("low"))} style={styles.textTwo} >Low priority</Text>
      </Overlay>
      <ScrollView style={styles.scrollViewDiv} >
        <Text style={styles.welcomeText} >Welcome</Text>
        <DashBar countTasks={countTasks} highTaskDone={highTaskDone} taskDone={taskDone} />
        <ScrollView>
          {allTasks.length > 0 ? allTasks.map(({ id, title, priority, createdAt, imageUrl, description, completed, modifiedAt }) => {
            return (
              <TouchableOpacity key={id} style={styles.ItemView} onPress={() => viewOne(id, title, imageUrl, createdAt, priority, description, modifiedAt)} onLongPress={() => Toogle()}  >
                {completed === '0' ? <Icon2 name='checkbox-passive' size={20} style={{ padding: 10 }} onPress={() => Toogle(id, completed)} /> :
                  <Icons name='checksquare' size={25} color="black" style={{ padding: 10 }} onPress={() => Toogle(id, completed)} />}
                <View style={styles.left}  >
                  <Text style={styles.titlez} > {id} {title} </Text>
                  <Text style={
                    priority === 'high' ? styles.highPrioText : styles.mediumPrioText
                  } > {priority} </Text>
                  <Text style={styles.createdText}> Created  {createdAt} </Text>
                </View>
                <Icon4 name='dots-three-vertical' size={18} />
              </TouchableOpacity>
            );
          }) : <View style={styles.nothing}>
            <Text style={styles.nothingto} >NOTHING HERE</Text>
            <Text style={styles.crush} >Like your crush replies</Text>
            <TouchableOpacity style={styles.CreateButton} onPress={() => goToAdd()} >
              <Text style={styles.buttonColor} >Start with a new task</Text>
            </TouchableOpacity>
          </View>}
        </ScrollView>
      </ScrollView>
      <Icon3 name='add-circle' size={85} color="black" style={styles.addButtonPosition} onPress={() => goToAdd()} />
    </View>
  );
}

const styles = StyleSheet.create({

  constainer: {
    width: width,
    height: height,
    backgroundColor: "whitesmoke"
  },
  overlayStye: {
    top: 70,
    right: 27,
    position: "absolute",
    padding: 10
  },
  textOne: {
    borderBottomWidth: 0.2,
    marginBottom: 7,
    fontSize: 15,
    color: "#0C0D0D",
  },

  textTwo: {
    fontFamily: "Montserrat-Regular",
    color: "#0C0D0D",
    fontSize: 15,
    marginTop: 10
  },

  nothingto: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D",
  },
  filterOPtion: {
    backgroundColor: "red",
    padding: 15,
    marginLeft: 40,
    marginTop: 80
  },
  crush: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    color: "#495D69"
  },
  createdText: {
    color: "#1C2834",
    marginTop: 10,
    fontFamily: "Montserrat-Regular",
  },
  highPrioText: {
    marginTop: 10,
    backgroundColor: "#0C0D0D",
    borderRadius: 18,
    color: "#C1CF16",
    padding: 1,
    width: 90,
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    height: 20
  },

  mediumPrioText: {
    marginTop: 10,
    backgroundColor: "#495D69",
    borderRadius: 18,
    color: "white",
    padding: 1,
    width: 90,
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    fontSize: 12
  },

  Options: {
    zIndex: 20
  },

  ItemView: {
    flex: 1,
    padding: 8,
    flexDirection: "row",
    borderBottomWidth: 0.2,
    margin: 7,
    textAlign: "center",
    justifyContent: "space-between"
  },

  Images: {
    width: 30,
    height: 30,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1C2834',
    padding: 20,
    height: 250
  },
  imageCo: {
    flex: 1,
  },
  scrollViewDiv: {
    width: 350,
    backgroundColor: "white",
    marginLeft: 20,
    marginTop: -170,
    padding: 8
  },
  welcomeText: {
    marginTop: 30,
    fontSize: 17,
    marginLeft: 12,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D"
  },
  nothing: {
    marginTop: 50,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"
  },
  nothingHere: {
    fontFamily: "Montserrat-Bold"
  },
  CreateButton: {
    padding: 10,
    backgroundColor: "#0C0D0D",
    marginTop: 20,
    borderRadius: 7
  },
  buttonColor: {
    color: "white",
    fontFamily: "Montserrat-Regular"
  },
  left: {
    flex: 1,
    marginLeft: 50
  },
  titlez: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D"
  },
  addButtonPosition: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 110
  }
});

