import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebase/config';

function Login(props) {

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState('');

    function onSubmit(email, password) {
        if (!email.includes('@')) {
            return setErrores("Email mal formateado")
        }
        if (password.length < 6) {
            return setErrores("La password debe tener una longitud mínima de 6 caracteres")
        } 

        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                props.navigation.navigate('HomeMenu');
            })
            .catch(error => {
                setErrores('Fallo en el registro.')
            });
    }

// esto para ver que en la consola las cosas se guarden bien.

return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Ingresar</Text>
        <Text style={styles.texto}>Esta es la pantalla que debe ir el formulario de Login.</Text>

        <View style={styles.containerFrom}>
            <TextInput style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={email} />
            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='userName'
                onChangeText={text => setUserName(text)}
                value={userName} />
            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password} />

            {
                errores !== '' ?
                    <Text style={styles.textoError}>{errores}</Text>
                    :
                    null
            }

            <Pressable onPress={() => onSubmit(email, password)} style={styles.boton3}>
                <Text style={styles.textoBoton} >Ingresar</Text>
            </Pressable>
        </View>



        <Pressable onPress={() => props.navigation.navigate('Register')} style={styles.boton1}>
            <Text style={styles.textoBoton}>No tengo cuenta</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate('HomeMenu')} style={styles.boton2}>
            <Text style={styles.textoBoton}>Entrar en la app</Text>
        </Pressable>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    texto: {
        fontSize: 15,
        padding: 10,
    },
    boton1: {
        backgroundColor: '#4db6e8',
        padding: 13,
        borderRadius: 5,
        marginBottom: 12,
        alignItems: 'center',
    },
    boton2: {
        backgroundColor: 'orange',
        padding: 13,
        borderRadius: 5,
        marginBottom: 12,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#fff',
        fontWeight: '600',
    },
    containerFrom: {
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        height: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    boton3: {
        backgroundColor: '#28a745',
        paddingVertical: 6,
        paddingHorizontal: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#28a745',
        borderRadius: 4,
    }, 
    textoError: {
        color: 'red',
        fontWeight: '600',
    }
});

export default Login;
