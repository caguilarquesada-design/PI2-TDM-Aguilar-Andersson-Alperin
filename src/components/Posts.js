import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { FlatList } from 'react-native';

function Posts(props) {

    const [posts, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setPosteos(posts);
                setLoading(false);
            })
    }, [])


    console.log(usuarios);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.data.email}</Text>
                        <Text>{item.data.posts}</Text>
                        <Text>{item.data.desccripcion}</Text>
                        <Text>{item.data.likes.length} Likes</Text>
                    </View>
                )}

            />
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
    boton: {
        backgroundColor: '#4db6e8',
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
    boton1: {
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



export default Posts; 