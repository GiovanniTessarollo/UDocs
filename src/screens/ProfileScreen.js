import React, { useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getUserData, clearSession } from "../storage/SessionStorage"; // Certifique-se de que a rota está correta para sua pasta storage

import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Usuário");
  const [userInitials, setUserInitials] = useState("U");

  // Carrega os dados salvos sempre que o usuário focar na tela de Perfil
  useFocusEffect(
    React.useCallback(() => {
      async function loadUserData() {
        try {
          const userData = await getUserData(); 
          // Se o objeto salvo no login tiver a propriedade 'nome' ou 'name'
          const nomeDoUsuario = userData?.nome || userData?.name || "Usuário";
          
          setUserName(nomeDoUsuario);
          
          // Pega as iniciais do nome para o Avatar
          const names = nomeDoUsuario.trim().split(" ");
          const initials = names.length > 1 
            ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
            : `${names[0][0]}`.toUpperCase();
          setUserInitials(initials);
          
        } catch (error) {
          console.log("Erro ao carregar dados do usuário:", error);
        }
      }
      loadUserData();
    }, [])
  );

  // Função para fazer logout limpo e seguro
  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair do aplicativo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await clearSession();
          // Reseta a navegação e manda o usuário direto para a tela de Login
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }], 
          });
        },
      },
    ]);
  };

  // Função auxiliar para criar as linhas do menu
  const renderMenuOption = (iconName, iconColor, bgIconColor, title, subtitle, onPress) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: bgIconColor }]}>
        <Ionicons name={iconName} size={22} color={iconColor} />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.optionSubtitle}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        {/* Ícone de engrenagem levando para a tela de configurações cadastrada na sua estrutura */}
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Card do Usuário (Sem a tag de plano) */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userInitials}</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={14} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={2}>
              {userName}
            </Text>
          </View>
        </View>

        {/* SEÇÃO: CONTA */}
        <Text style={styles.sectionHeader}>Conta</Text>
        <View style={styles.sectionCard}>
          {renderMenuOption(
            "person-circle-outline", 
            "#2B6CB0", 
            "#EBF8FF", 
            "Editar Perfil", 
            "Nome e foto", 
            () => Alert.alert("Editar Perfil", "Ação para alterar nome e foto.")
          )}
          <View style={styles.divider} />
          {renderMenuOption(
            "lock-closed-outline", 
            "#234E52", 
            "#E6FFFA", 
            "Alterar Senha", 
            "Segurança da conta", 
            () => Alert.alert("Alterar Senha", "Ação para redefinir senha.")
          )}
        </View>

        {/* SEÇÃO: PREFERÊNCIAS */}
        <Text style={styles.sectionHeader}>Preferências</Text>
        <View style={styles.sectionCard}>
          {renderMenuOption("notifications-outline", "#553C9A", "#FAF5FF", "Notificações", "Configurar alertas e lembretes", () => {})}
          <View style={styles.divider} />
          {renderMenuOption("color-palette-outline", "#DD6B20", "#FFFAF0", "Aparência", "Tema claro ou escuro", () => {})}
        </View>

        {/* SEÇÃO: DADOS E BACKUP */}
        <Text style={styles.sectionHeader}>Dados e Backup</Text>
        <View style={styles.sectionCard}>
          {renderMenuOption("cloud-upload-outline", "#3182CE", "#EBF8FF", "Backup e Restauração", "Salve e restaure seus dados", () => {})}
          <View style={styles.divider} />
          {renderMenuOption("download-outline", "#319795", "#E6FFFA", "Exportar Dados", "Exportar documentos e informações", () => {})}
        </View>

        {/* SEÇÃO: OUTROS */}
        <Text style={styles.sectionHeader}>Outros</Text>
        <View style={styles.sectionCard}>
          {renderMenuOption("help-circle-outline", "#805AD5", "#FAF5FF", "Ajuda e Suporte", null, () => {})}
          <View style={styles.divider} />
          {renderMenuOption("star-outline", "#D69E2E", "#FEFCBF", "Avaliar o UDoc", null, () => {})}
          <View style={styles.divider} />
          {renderMenuOption("log-out-outline", "#E53E3E", "#FFF5F5", "Sair da Conta", "Fazer logout do aplicativo", handleLogout)}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#F7F7F7",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  userCard: {
    backgroundColor: "#111",
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 18,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#BFDBFE",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFF",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  optionSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 52,
  },
});