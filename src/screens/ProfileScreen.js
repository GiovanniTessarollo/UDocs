import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  useWindowDimensions,
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

// NOVOS IMPORTS PARA ARQUIVOS FUNCIONAIS
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation(); 
  
  const [name, setName] = useState('Usuario');
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState('https://via.placeholder.com/150');

  // Seleção de Imagem da Galeria
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 1. EXPORTAR DADOS (GERA UM ARQUIVO .JSON REAL)
  const handleExportData = async () => {
    try {
      const userData = { name, image };
      
      // Nova API do Expo: Cria uma referência limpa ao arquivo no armazenamento do app
      const file = new File(Paths.document, 'udocs_perfil.json');
      
      // Escreve os dados em formato de texto diretamente
      file.write(JSON.stringify(userData));

      // Abre o menu de compartilhamento nativo do celular
      await Sharing.shareAsync(file.uri);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível exportar os seus dados.");
    }
  };

  const handleImportData = async () => {
    try {
      // Mudamos para '*/*' para que os arquivos fiquem clicáveis e visíveis em qualquer celular
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true
      });

      // Se o usuário fechar o seletor ou cancelar, interrompe aqui sem erro
      if (result.canceled || !result.assets || !result.assets[0]) {
        return;
      }

      const pickedFileUri = result.assets[0].uri;
      
      // Nova API do Expo: Abre e lê o conteúdo de texto do arquivo selecionado de forma síncrona
      const file = new File(pickedFileUri);
      const fileContent = file.textSync();
      const parsedData = JSON.parse(fileContent);

      // Validação flexível: confere se o JSON tem a estrutura esperada do perfil
      if (parsedData && (parsedData.name || parsedData.image)) {
        if (parsedData.name) setName(parsedData.name);
        if (parsedData.image) setImage(parsedData.image);
        
        Alert.alert("Sucesso", "Dados importados e perfil atualizado!");
      } else {
        Alert.alert("Arquivo Inválido", "Este arquivo não contém dados de perfil válidos do UDocs.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao ler ou processar o arquivo selecionado.");
    }
  };

  // 3. SAIR DA CONTA (LOGOUT)
  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta", 
      "Tem certeza que deseja encerrar sua sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: () => navigation.replace('Login') 
        }
      ]
    );
  };

  const isTabletOrWeb = width > 600;
  const avatarSize = isTabletOrWeb ? 160 : 120;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* CARD DE PERFIL */}
        <View style={[styles.profileCard, { width: isTabletOrWeb ? '50%' : '90%' }]}>
          
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.imageContainer}>
            <Image 
              source={{ uri: image }} 
              style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]} 
            />
            <View style={styles.cameraIconBadge}>
              <Text style={styles.cameraIconText}>📷</Text>
            </View>
          </TouchableOpacity>

          {isEditing ? (
            <View style={styles.editNameContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome"
                placeholderTextColor="#999"
                autoFocus
              />
              <TouchableOpacity style={styles.saveButton} onPress={() => setIsEditing(false)}>
                <Text style={styles.saveButtonText}>Salvar Nome</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{name}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                <Text style={styles.editButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>

        {/* SEÇÃO DE GERENCIAMENTO */}
        <View style={[styles.actionsContainer, { width: isTabletOrWeb ? '50%' : '90%' }]}>
          <Text style={styles.sectionTitle}>Gerenciamento da Conta</Text>

          {/* Botão Exportar Dados */}
          <TouchableOpacity style={styles.actionButton} onPress={handleExportData}>
            <Text style={styles.actionButtonIcon}>📤</Text>
            <View style={styles.actionButtonTextContainer}>
              <Text style={styles.actionButtonTitle}>Exportar Dados</Text>
              <Text style={styles.actionButtonSub}>Salvar um arquivo de backup do seu perfil</Text>
            </View>
          </TouchableOpacity>

          {/* Botão Importar Dados */}
          <TouchableOpacity style={styles.actionButton} onPress={handleImportData}>
            <Text style={styles.actionButtonIcon}>📥</Text>
            <View style={styles.actionButtonTextContainer}>
              <Text style={styles.actionButtonTitle}>Importar Dados</Text>
              <Text style={styles.actionButtonSub}>Restaurar perfil a partir de um arquivo JSON</Text>
            </View>
          </TouchableOpacity>

          {/* Botão Sair da Conta */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { flexGrow: 1, alignItems: 'center', paddingVertical: 30 },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    maxWidth: 550,
    marginBottom: 20,
  },
  imageContainer: { marginBottom: 20, position: 'relative' },
  avatar: { borderWidth: 4, borderColor: '#007AFF' },
  cameraIconBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  cameraIconText: { fontSize: 14, color: '#fff' },
  nameContainer: { alignItems: 'center', width: '100%' },
  userName: { fontSize: 22, fontWeight: '700', color: '#212529', marginBottom: 8 },
  editButton: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#f1f3f5' },
  editButtonText: { color: '#007AFF', fontWeight: '600', fontSize: 13 },
  editNameContainer: { width: '100%', alignItems: 'center' },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#dee2e6',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
    color: '#212529',
  },
  saveButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
  actionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    maxWidth: 550,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionButtonIcon: { fontSize: 24, marginRight: 16 },
  actionButtonTextContainer: { flex: 1 },
  actionButtonTitle: { fontSize: 15, fontWeight: '600', color: '#212529' },
  actionButtonSub: { fontSize: 12, color: '#868e96', marginTop: 2 },
  logoutButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ffe3e3',
  },
  logoutButtonText: { color: '#ff6b6b', fontSize: 15, fontWeight: '700' },
});