import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ViewComponent } from "react-native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, Avatar } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Principal, {xy}from './screens/Principal';
import Formulario from './screens/Formulario';
import { Clientes } from "./screens/Clientes";
import { ListaClientes } from "./screens/ListaClientes";
import { DetallesCliente } from "./screens/DetallesCliente";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
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
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="citas"
                    component={Principal}
                    options={{
                        tabBarBadge: 3,
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
                                color={color}
                                size={size}
                            />
                        ),
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
                                color={color}
                                size={size}
                            />
                        ),
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
                                color={color}
                                size={size}
                            />
                        ),
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
                options={{ title: "Informacion del cliente" }}
            />
        </Stack.Navigator>
    );
}


