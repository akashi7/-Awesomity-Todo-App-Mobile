/*eslint-disable*/
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DashBar = ({ countTasks, taskDone, highTaskDone }) => {

  return (
    <View style={styles.dashBar} >
      <View style={styles.dash}>
        <Text style={styles.text} > {countTasks} </Text>
        <Text style={styles.textTwo} >Total task</Text>
      </View>
      <View style={styles.dash}>
        <Text style={styles.text}> {taskDone} </Text>
        <Text style={styles.textTwo} >Task done</Text>
      </View>
      <View style={styles.dash}>
        <Text style={styles.text}>{highTaskDone}</Text>
        <Text style={styles.textTwo} >Active task</Text>
      </View>
    </View>
  );
};

export default DashBar;

const styles = StyleSheet.create({
  dashBar: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center"
  },
  dash: {
    flexDirection: "column",
    backgroundColor: "white",
    margin: 10,
    flex: 1,
    padding: 10,
    flexWrap: "wrap",
    elevation: 7,
    shadowColor: '#52006A',
  },
  text: {
    color: "#C1CF16",
    fontFamily: "Montserrat-Bold",
    fontSize: 19
  },
  textTwo: {
    fontSize: 13,
    fontFamily: "Montserrat-Bold",
    color: "#0C0D0D",
  }
});
