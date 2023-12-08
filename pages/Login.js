import { useState } from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const onChangeUsername = (text) => setUsername(text);
    const onChangePassword = (text) => setPassword(text);
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <Text style={styles.error}> {error}</Text>
            <TextInput style={styles.input}
                       placeholder="Username"
                       onChangeText={onChangeUsername}
                       value={username}
                       />
            <TextInput style={styles.input}
                       placeholder="Password:"
                       secureTextEntry={true}
                       onChangeText={onChangePassword}
                       value={password}
                       />
            
            <View style={styles.buttonContainer}>
                <Button title="Login" style={styles.button}
                onPress={() => login()}>
                </Button>
                <Text>&nbsp;&nbsp;&nbsp; </Text>
                <Button title="SIGNUP" style={styles.button} onPress={() => navigation.navigate("Register")}></Button>
            </View>
        </View>
    );
    function login() {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "userName":username,
                    "password":password
                }
            )
        }).then(async resp => {
            if (!resp.ok) {
                setError("Wrong Username or Password");
            } else {
                await AsyncStorage.setItem('username', username);
                navigation.navigate("Profile", {username})
            }
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15
    },
    header: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#088F8F',
        fontSize: 20,
        margin: 5
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 5
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        color: '#FF5733',
        padding: 5,
        margin: 10,
    },
    error: {
        color: 'red',
        whiteSpace:'nowrap',
        display:'inline',
    }
});