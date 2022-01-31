/*eslint-disable*/
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Alert, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { addItem, reset } from '../redux/Actions/Tasks';



const { height, width } = Dimensions.get("screen");



export default function AddItem() {

  const navigate = useHistory();

  const goBack = () => {
    navigate.goBack();
  };

  const initialState = {
    title: "",
    description: "",
    priority: "",
    loading: false,
    filePath: "",
  };

  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const { success, error } = useSelector(store => store.tasks);

  const dateTime = new Date();


  useEffect(() => {
    if (success) {
      Alert.alert("Yay!", "Item added successfully!", [{
        text: "OK",
        onPress: () => navigate.push('/Home')
      }]);
    }
    else if (error) {
      console.log(error);
      Alert.alert("Oops!", `${error}`);
    }
    return () => dispatch(reset());
  }, [success, error]);

  const createItem = async () => {
    if (!state.filePath) {
      Alert.alert("Sorry!", "Upload Image please!!!");
    }
    else if (!(state.title) || (state.title.length > 140)) {
      Alert.alert("Sorry!", "Title is required and not greater than 140 char");
    }
    else if (!(state.description) || (state.description.length > 240)) {
      Alert.alert("Sorry!", "Description is required and not greater than 240 char");
    }
    else if (!(state.priority) || (state.priority.length > 240)) {
      Alert.alert("Sorry!", "Priority is required");
    }
    else {
      dispatch(addItem({ ...state, createdAt: dateTime.toLocaleDateString() }));
    }
  };

  const launchGallery = async () => {
    let options = {
      mediaType: "photo",
      quality: 1
    };
    const res = await launchImageLibrary(options);
    if (res.didCancel) {
      Alert.alert("Canceled picking Image in library");
    }
    else {
      const URL = res.assets[0].uri;
      setState({ ...state, filePath: URL });
    }
  };


  return (
    <ScrollView style={styles.whole} >
      <TouchableOpacity onPress={() => goBack()} style={styles.Back} >
        <Text style={styles.BackText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.newTask} >New Task</Text>
        <Text style={styles.iText} >Add image</Text>
        <TouchableOpacity style={styles.uplaodImage} onPress={() => launchGallery()} >
          {state.filePath ? <Image source={{ uri: state.filePath }} style={styles.imageUri} /> : <Text style={styles.uploadText} >Tap to add image</Text>}
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.createButton} onPress={() => createItem()} >
          <Text style={styles.createText}>CREATE TASK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

}
const styles = StyleSheet.create({
  whole: {
    height: height,
    width: width
  },
  newTask: {
    fontFamily: "Montserrat-Bold",
    fontSize: 17,
    color: "#0C0D0D",
  },
  imageUri: {
    height: 100,
    width: 370,
    margin: 5
  },
  Picker: {
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#F4F5F6",
    marginTop: 10,
    color: "#0C0D0D"
  },
  PickerItem: {
    fontFamily: "Montserrat-Regular",
  },
  Back: {
    padding: 12,
    backgroundColor: "white",
    shadowColor: '#52006A',
    elevation: 5
  },
  BackText: {
    textAlign: "left"
  },
  container: {
    marginTop: 20,
    padding: 15
  },
  iText: {
    marginTop: 20,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D",
  },
  uplaodImage: {
    backgroundColor: "#F4F5F6",
    padding: 10,
    height: 100,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  uploadText: {
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
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
  titleText: {
    marginTop: 10,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D",
  },
  createButton: {
    padding: 10,
    backgroundColor: "#0C0D0D",
    marginTop: 50,
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
