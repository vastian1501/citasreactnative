import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ViewComponent } from "react-native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Avatar } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Principal from './screens/Principal';
import Formulario from './screens/Formulario';
import { Clientes } from "./screens/Clientes";
import { ListaClientes } from "./screens/ListaClientes";
import { DetallesCliente } from "./screens/DetallesCliente";
import firebase from "./database/Firebase";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

const [citas, setCitas] = useState([]);

useEffect(() => {
    firebase.db.collection("citas").onSnapshot((querySnapshot) => {
        const citas = [];

        querySnapshot.docs.forEach((doc) => {
            const {
                nombre,
                apellidos,
                telefono,
                manos,
                pies,
                fechaDb,
                fecha,
                hora,
                comentarios,
            } = doc.data();

            citas.push({
                id: doc.id,
                nombre,
                apellidos,
                telefono,
                manos,
                pies,
                fechaDb,
                fecha,
                hora,
                comentarios,
            });
        });

        setCitas(citas);
    });
}, []);

    const fecha = Date.now();
    const hoy = new Date(fecha);
    const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    };
    const hoyFecha = hoy.toLocaleDateString("es-ES", options);
    const dias = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
    ];
    const fechaNueva =
        dias[hoy.getDay()] +
        " " +
        hoy.getDate() +
        "/" +
        (hoy.getMonth() + 1) +
        "/" +
        hoy.getFullYear();

         const fechaNuevaDos =
             hoy.getMonth() + 1 + "/" + hoy.getDate() + "/" + hoy.getFullYear();

    //TapBager con citas de hoy

    const [contador, setContador] = useState(0);
    var incremento = 0;
    useEffect(() => {
        citas.map((cita) => {
            //console.log("Fehca cita" + cita.fecha);
            if (Date.parse(cita.fechaDb) === Date.parse(fechaNuevaDos)) {
                incremento++;
            }
            //console.log('incemento' + incremento)
            setContador(incremento);
            return incremento;
        });
    });
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="citas"
                    component={Principal}
                    options={{
                        tabBarBadge: contador,
                        tabBarBadgeStyle: {
                            backgroundColor: "#E55777",
                            color:'white'
                        },
                        headerRight: () => (
                            <View style={{ marginRight: 20 }}>
                                <Text>{fechaNueva}</Text>
                            </View>
                        ),
                        headerTitle: "Lulys Nails",
                        tabBarLabel: "Citas",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="calendar"
                                color="#5D544A"
                                size={size}
                            />
                        ),
                        tabBarActiveTintColor: "#5D544A",
                    }}
                />
                <Tab.Screen
                    name="nuevaCita"
                    title="Nueva Cita"
                    component={Formulario}
                    options={{
                        tabBarLabel: "Nueva Cita",
                        headerTitle: "Lulys Nails",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="note-plus"
                                color="#5D544A"
                                size={size}
                            />
                        ),
                        tabBarActiveTintColor: "#5D544A",
                    }}
                />
                <Tab.Screen
                    name="clientesTabs"
                    component={ClientesTabs}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Clientes",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account-plus-outline"
                                color="#5D544A"
                                size={size}
                            />
                        ),
                        tabBarActiveTintColor: "#5D544A",
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function ClientesTabs() {
    return (
        <Stack.Navigator
            // screenOptions={{
            //     headerShown: false,
            // }}
        >
            <Stack.Screen
                name="listaClientes"
                component={ListaClientes}
                options={{ title: "Lulys Nails" }}
            />
            <Stack.Screen
                name="nuevoCliente"
                component={Clientes}
                options={{ title: "Crear nuevo cliente" }}
            />
            <Stack.Screen
                name="detallesCliente"
                component={DetallesCliente}
                options={{ title: "Información del cliente" }}
            />
        </Stack.Navigator>
    );
}


