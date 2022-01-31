/*eslint-disable*/


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import { NativeRouter, Route, Switch, BackButton } from 'react-router-native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScree';
import AddItem from './screens/AddItem';
import Item from './screens/Item';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './config/dataBase';
import { Provider } from 'react-redux';
import { store } from './redux';


const App = () => {

  const createTable = async () => {
    db.transaction(txn => {
      txn.executeSql(`CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(200),description VARCHAR(250),priority VARCHAR(100),createdAt varchar(100),modifiedAt VARCHAR(100),imageUrl VARCHAR(250),completed VARCHAR(100))`,
        [], () => {
          console.log("Table created suscefully!");
        },
        error => {
          console.log("Error creating table", error);
        });
    });
  };

  useEffect(() => {
    (async () => {
      await createTable();
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store} >
        <NativeRouter>
          <BackButton>
            <Switch>
              <Route path="/" exact component={SplashScreen} />
              <Route path="/Home" component={HomeScreen} exact />
              <Route path="/AddItem" component={AddItem} exact />
              <Route path="/Item/:id" component={Item} exact />
            </Switch>
          </BackButton>
        </NativeRouter>
      </Provider>
    </SafeAreaProvider>
  );
};


export default App;
