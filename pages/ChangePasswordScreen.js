import {useState} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePasswordScreen() {
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const onChangePassword = (text) => setPassword(text);

    const onChangeConfirmPassword = (text) => setConfirmPassword(text);
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                onChangeText={onChangePassword}
                value={password}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={onChangeConfirmPassword}
                value={confirmpassword}
            />
            <Button title="Change Password" onPress={() => changePassword()}/>
            <Text style={styles.error}> {error} </Text>
            <Text style={styles.msg}>{msg}</Text>
        </View>
    );

    async function changePassword() {
        if (password === confirmpassword) {
            const username = await AsyncStorage.getItem('username');
            fetch('http://localhost:8080/changepassword', {
                method: 'PUT',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "userName": username,
                    "password": password
                })
            }).then( resp => {
                if (!resp.ok) {
                    setError("Change Password Failed!");
                } else {
                    setMsg("Password updated succesfully")
                }
            });
        } else {
            setError("Password and Confirm Password does not match");
        }
    }
}

const styles = StyleSheet.create({
    container: {
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
        margin: 12,
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