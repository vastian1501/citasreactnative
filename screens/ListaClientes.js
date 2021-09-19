import React, { useEffect, useState } from 'react'
import {ScrollView, Text} from 'react-native'

import { ListItem, Avatar, Icon, Button } from "react-native-elements";
import firebase from '../database/Firebase';

export const ListaClientes = (props) => {
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        firebase.db.collection("clientes").onSnapshot((querySnapshot) => {
            const clientes = [];

            querySnapshot.docs.forEach((doc) => {
                const { nombre, apellidos, telefono } = doc.data();
                clientes.push({
                    id: doc.id,
                    nombre,
                    apellidos,
                    telefono,
                });
            });

            setClientes(clientes);
        });
    }, []);
    return (
        <ScrollView>
            <Button
                title="Añadir nuevo cliente"
                onPress={() => props.navigation.navigate("nuevoCliente")}
            />
            {clientes.map((cliente) => {
                return (
                    <ListItem
                        key={cliente.id}
                        onPress={() =>
                            props.navigation.navigate("detallesCliente", {
                                userId: cliente.id,
                            })
                        }
                        bottomDivider
                    >
                        <Avatar
                            rounded
                            source={{
                                uri: "https://reactnativeelements.com/img/avatar/avatar--photo.jpg",
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {cliente.nombre + " " + cliente.apellidos}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {cliente.telefono}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                );
            })}
        </ScrollView>
    );
}
