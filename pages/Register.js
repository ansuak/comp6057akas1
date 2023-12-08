import {StyleSheet, TextInput, View, Button, Text} from 'react-native';
import { useState } from 'react';

export default function Register ({navigation}) {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
            <Text style={styles.error}> {error} </Text>
            <Text style={styles.msg}>{msg}</Text>
            <TextInput style={styles.input}
                       placeholder="Email:"
                       onChangeText= {(text) => setEmail(text)}
                       value={email}>
            </TextInput>
            <TextInput style={styles.input}
                       placeholder="First Name:"
                       onChangeText= {(text) => setFirstname(text)}
                       value={firstname}>
            </TextInput>
            <TextInput style={styles.input}
                       placeholder="Last Name:"
                       onChangeText= {(text) => setLastname(text)}
                       value={lastname}>
            </TextInput>
            <TextInput style={styles.input}
                       placeholder="Username:"
                       value={username}
                       onChangeText={(text) => setUsername(text)}>
            </TextInput>
            <TextInput style={styles.input}
                       placeholder="Password:"
                       secureTextEntry={true}
                       minLength={8}
                       onChangeText={ (text) => setPassword(text)}
                       value={password}>
            </TextInput>
            <TextInput style={styles.input}
                       placeholder="Confirm Password:"
                       secureTextEntry={true}
                       onChangeText={(text) => setPwdConfirm(text)}
                       value={pwdConfirm}>
            </TextInput>
            <TextInput style={styles.input}
                       placeholder="Short Bio:"
                       value={bio}
                       onChangeText={(text) => setBio(text)}>
            </TextInput>
            <Button title="Signup" style={styles.button} onPress={() => handleSignUp()}></Button>
        </View>
    );
    function handleSignUp() {
        if(username == '' || password == '') {
            setError("Username and password are mandatory");
        } else if(password != pwdConfirm) {
            setError("Password and Confirm Password does not match");
        }
        else {
            fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            }).then(resp => resp.json())
                .then(data => {
                    let users = data;
                    if(users?.map(dbuser => dbuser.userName).includes(username)) {
                        setError(`Username already exist`);
                    }
                    else {
                        signUp();
                    }
                })
        }
    }
    function signUp() {
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "firstName":firstname,
                    "lastName":lastname,
                    "userName":username,
                    "password":password
                }
            )
        }).then(resp => {
            if(!resp.ok) {
                setError("User not added!");
            } else {
                setMsg("Password updated succesfully");
                navigation.navigate("Login");
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
        margin: 10,
        borderWidth: 1,
        padding: 5
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
    },
    msg: {
        color: 'green',
        whiteSpace:'nowrap',
        display:'inline',
    }
});