/*eslint-disable*/
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, reset, updateItem, resetUpdateItem } from '../redux/Actions/Tasks';
import { Overlay } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';


const { height, width } = Dimensions.get("screen");


export default function Item() {

  const initialState = {
    items: [],
    title: "",
    description: "",
    priority: "",
  };

  const dateTime = new Date();

  const navigate = useHistory();
  const dispatch = useDispatch();
  const { success, error, updated } = useSelector(store => store.tasks);
  const [state, setState] = useState(initialState);

  const [visible, setVisible] = useState(false);

  const getItemArray = async () => {
    const itemArray = await AsyncStorage.getItem('itemArray');
    const item = JSON.parse(itemArray);
    setState({ ...state, items: item });
  };

  const goBack = () => {
    navigate.goBack();
  };

  const ToogleOverLay = () => setVisible(!visible);

  useEffect(() => {
    (async () => {
      await getItemArray();
    })();
  }, []);

  useEffect(() => {
    if (updated) {
      Alert.alert("Yayy!!", "Upadate success", [{
        text: "ok",
        onPress: () => navigate.push('/Home')
      }]);
    }
    return () => dispatch(resetUpdateItem());
  }, [updated]);

  useEffect(() => {
    if (success) {
      Alert.alert("Yay!", "Task deleted!", [{
        text: "OK",
        onPress: () => navigate.push('/Home')
      }]);
    }
    else if (error) {
      Alert.alert("Oops!", `${error}`, [{
        text: "OK",
        onPress: () => navigate.push('/Home')
      }]);
    }
    return () => dispatch(reset());
  }, [success, error]);


  const AskToDelete = (id) => {
    Alert.alert("Warning", "Sure you want to delete this", [{
      text: "Yes",
      onPress: () => dispatch(deleteTask(id))
    }]);
  };

  const update = (id) => {
    if (!(state.title) || (state.title.length > 140)) {
      Alert.alert("Sorry!", "Title is required and not greater than 140 char");
    }
    else if (!(state.description) || (state.description.length > 240)) {
      Alert.alert("Sorry!", "Description is required and not greater than 240 char");
    }
    else if (!(state.priority) || (state.priority.length > 240)) {
      Alert.alert("Sorry!", "Priority is required");
    }
    else {
      dispatch(updateItem({ ...state, modifiedAt: dateTime.toLocaleDateString(), id }));
    }
  };

  return (
    <ScrollView style={styles.whole} >
      <TouchableOpacity style={styles.Back} onPress={() => goBack()} >
        <Text>Go back</Text>
      </TouchableOpacity>
      <View>
        {state.items.map(({ id, title, url, date, priority, description, modifiedAt }) => {
          return (
            <View key={id} >
              <Image source={{ uri: url }} style={styles.imageUri} />
              <View style={styles.oneTime} >
                <Text style={
                  priority === 'high' ? styles.highPrioText : styles.mediumPrioText
                } > {priority} </Text>
                <Icons name="edit-2" size={31} onPress={() => ToogleOverLay()} />
                <Overlay isVisible={visible} onBackdropPress={() => ToogleOverLay()} overlayStyle={styles.overlayStye} >
                  <Text style={styles.textOne} >EDIT TASK</Text>
                  <Text style={styles.titleText} >Title</Text>
                  <TextInput
                    placeholder="Task title 140 characters"
                    style={styles.input}
                    onChangeText={(inputText) => setState({ ...state, title: inputText })}
                  />
                  <Text style={styles.titleText} >Description</Text>
                  <TextInput
                    placeholder="240 characters"
                    style={styles.inputB}
                    onChangeText={(inputText) => setState({ ...state, description: inputText })}
                  />
                  <Text style={styles.titleText} >Priority</Text>
                  <Picker style={styles.Picker}
                    onValueChange={(item) => setState({ ...state, priority: item })}
                    selectedValue={state.priority}
                  >
                    <Picker.Item label="low" value="low" />
                    <Picker.Item label="medium" value="medium" />
                    <Picker.Item label="high" value="high" />
                  </Picker>
                  <TouchableOpacity style={styles.createButton} onPress={() => update(id)} >
                    <Text style={styles.createText}>UPDATE</Text>
                  </TouchableOpacity>
                </Overlay>
                <Icon name='cancel-presentation' size={35} onPress={() => AskToDelete(id)} />
                <TouchableOpacity style={styles.done} >
                  <Text >DONE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.des} >
                <Text style={styles.Title} > {title} </Text>
                <Text style={styles.DESC} >Description</Text>
                <Text style={styles.descri} > {description} </Text>
                <View style={styles.datesss} >
                  <Text style={styles.Dates} > Created  {date} </Text>
                  <Text style={styles.Datesk} >Modified  {modifiedAt}  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  whole: {
    height: height,
    width: width
  },
  imageUri: {
    height: 200,
    width: 398,
  },
  titleText: {
    marginTop: 10,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D",
  },
  datesss: {
    flexDirection: "row"
  },
  input: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#F4F5F6',
    color: '#424242',
    fontSize: 17,
    fontFamily: "Montserrat-Regular",
  },
  inputB: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#F4F5F6',
    color: '#495D69',
    fontSize: 17,
    height: 100,
    fontFamily: "Montserrat-Regular",
  },
  Picker: {
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#F4F5F6",
    marginTop: 10,
    color: "#0C0D0D"
  },
  overlayStye: {
    width: 350,
    top: 150,
    position: "absolute",
    padding: 11
  },
  Back: {
    padding: 12,
    backgroundColor: "white",
    shadowColor: '#52006A',
    elevation: 5
  },
  highPrioText: {
    backgroundColor: "#0C0D0D",
    borderRadius: 18,
    color: "#C1CF16",
    padding: 5,
    width: 90,
    textAlign: "center"
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
  oneTime: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  done: {
    padding: 5,
    backgroundColor: "white",
    borderColor: "#1C2834",
    borderWidth: 1,
    width: 100,
    alignItems: "center",
    borderRadius: 5
  },
  des: {
    padding: 10,
    marginTop: 20
  },
  Dates: {
    marginTop: 15,
    fontFamily: "Montserrat-Regular",
    color: "#495D69"
  },
  Datesk: {
    marginTop: 15,
    fontFamily: "Montserrat-Regular",
    color: "#495D69",
    marginLeft: 20
  },
  Title: {
    marginTop: 10,
    fontSize: 25,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D"
  },
  DESC: {
    marginTop: 17,
    fontSize: 17,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D"
  },
  descri: {
    fontSize: 19,
    marginTop: 9,
    fontFamily: "Montserrat-Regular",
    color: "#495D69"
  },
  textOne: {
    marginBottom: 7,
    fontSize: 15,
    color: "#0C0D0D",
    fontFamily: "Montserrat-Bold",
  },
  createButton: {
    padding: 10,
    backgroundColor: "#0C0D0D",
    marginTop: 20,
    borderRadius: 7,
    textAlign: "center",
    alignItems: "center",
    width: 120,

  },
  createText: {
    textAlign: "center",
    color: "white"
  }
});
