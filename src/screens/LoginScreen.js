import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function LoginScreen() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>U</Text>
        <Text style={styles.logoText}>Udoc</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Entrar</Text>

        <Text style={styles.subtitle}>
          Insira seu CPF para entrar no seu Udoc
        </Text>

        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha..."
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Ao clicar em continuar, você concorda com nossos{" "}
          <Text style={styles.link}>Termos de Serviço</Text> e com a{" "}
          <Text style={styles.link}>Política de Privacidade</Text>
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Não tem uma conta ainda?
        </Text>

        <TouchableOpacity>
          <Text style={styles.register}>
            Criar sua Conta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  logo: {
    fontSize: 70,
    fontWeight: "900",
    color: "#000",
  },

  logoText: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: -10,
  },

  formContainer: {
    width: "100%",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#000",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  terms: {
    marginTop: 18,
    textAlign: "center",
    color: "#8A8A8A",
    fontSize: 12,
    lineHeight: 18,
  },

  link: {
    color: "#000",
    fontWeight: "600",
  },

  footer: {
    alignItems: "center",
    marginBottom: 35,
  },

  footerText: {
    color: "#888",
    marginBottom: 6,
  },

  register: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});