import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
import { useState } from 'react';

function DynamicForm(props) {

    const [comentario, setComentario] = useState('');

    function onSubmit() {
        console.log(comentario);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Comentarios</Text>

            <TextInput
            keyboardType='default'
            placeholder='Escribe tu comentario:'
            onChangeText={text => setComentario(text)}
            value={comentario}
            />

            <Pressable  onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>Enviar comentario</Text>
            </Pressable>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        width: '100%',
        backgroundColor: '#f1f1f1'
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 25
    }
});

export default DynamicForm;