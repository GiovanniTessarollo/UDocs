import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setErrorSenha] = useState("");
  const [errorCpf, setErrorCpf] = useState("");
  const [errorConfirmarSenha, setErrorConfirmarSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const validateCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = (sum * 10) % 11;
    if (rest === 10) {
      rest = 0;
    }
    if (rest !== parseInt(cpf.charAt(9))) {
      return false;
    }
    return true;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>U</Text>
        <Text style={styles.logoText}>Udoc</Text>
      </View>

      <View style={styles.formContainer}>
      <Text style={styles.title}>Cadastrar</Text>

      <Text style={styles.subtitle}>
        Insira seu CPF para cadastrar no seu Udoc
      </Text>

        <TextInput
          style={styles.input}
          placeholder="Insira seu CPF..."
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
          onBlur={() => {
            if (!validateCpf(cpf)) {
              setErrorCpf("CPF inválido");
            } else {            
              setErrorCpf("");
            }          
          }}
        />

        <Text style={styles.setErrorCpf}>
          {errorCpf}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Insira uma Senha..."
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          onBlur={() => {
            if (senha.length < 6) {
              setErrorSenha("A senha deve conter pelo menos 6 caracteres.");
            } else {
              setErrorSenha("");
            }
          }}
        />

        <Text style={styles.setErrorSenha}>
            {error}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha..."
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          onBlur={() => {
            if (confirmarSenha !== senha) {
              setErrorConfirmarSenha("As senhas não coincidem.");
            } else {
              setErrorConfirmarSenha("");
            }
          }}
        />

        <Text style={styles.setErrorSenha}>
            {errorConfirmarSenha}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!validateCpf(cpf)) {
              setErrorCpf("CPF inválido");
              return;
            } else {
              setErrorCpf("");

              if (senha.length < 6) {
                setErrorSenha("A senha deve conter pelo menos 6 caracteres.");
                return;
              } else {
                setErrorSenha("");
                navigation.navigate("Login");

                

                // Falta colocar um popup de sucesso.



              }
            }
          }}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Ao clicar em continuar, você concorda com os nossos{" "}
          <Text style={styles.link}>Termos de Serviço</Text> e com a{" "}
          <Text style={styles.link}>Política de Privacidade</Text>
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Já possui uma conta?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginLink}>
            Entrar na Conta
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

  loginLink: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  setError: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },

  setErrorCpf: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },

  setErrorSenha: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginBottom: 10,  
  },

  setErrorConfirmarSenha: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },

});