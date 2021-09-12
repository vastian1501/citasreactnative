import React from 'react'
import { Text, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Button } from "react-native-elements";

export const Clientes = () => {
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => guardarManos(texto)}
                        placeholder="Nombre del cliente"
                        color="black"
                    />
                </View>

                <View>
                    <Text style={styles.label}>Apellidos</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => guardarManos(texto)}
                        placeholder="Apellidos"
                        color="black"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefono</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(texto) => guardarPies(texto)}
                        placeholder=" Introduce su telefono"
                        keyboardType="numeric"
                        color="black"
                    />
                </View>
                
                <Button
                    style={{ margin: 10 }}
                    icon={{
                        name: "edit",
                        size: 30,
                        color: "white",
                    }}
                    title="Guardar cliente"
                    onPress={() => guardarCita()}
                    buttonStyle={{
                        backgroundColor: "#5D534A",
                        marginBottom: 20,
                        margin: 10,
                    }}
                />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    label: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 18,
        color: "#5D534A",
        marginTop: 5,
        marginLeft: 10,
    },
    labelFH: {
        textAlign: "center",
        fontWeight: "400",
        fontSize: 18,
        color: "#5D534A",
        marginTop: 5,
        marginLeft: 10,
    },
    input: {
        backgroundColor: "#FFF",
        margin: 10,
        height: 50,
        padding: 5,
        borderColor: "#E1E1E1",
        borderWidth: 1,
    },
    formulario: {
        zIndex: -1,
        flex: 1,
        backgroundColor: "#FFF5DA",
        margin: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
        borderRadius: 5,
    },
});
