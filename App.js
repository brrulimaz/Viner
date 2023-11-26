import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([
    { id: '1', name: 'Vinho Argentino', price: '$105.99', image: require('./imagem/vinho1.webp') },
    { id: '3', name: 'Vinho Brasileiro', price: '$140.99', image: require('./imagem/vinho5.jpeg') },
    { id: '4', name: 'Vinho Argentino', price: '$105.99', image: require('./imagem/vinho4.jpeg') },
    { id: '5', name: 'Vinho Chileno', price: '$140.99', image: require('./imagem/vinho1.webp') },
  ]);

  const Stack = createNativeStackNavigator();

  const Abertura = ({ navigation }) => {
    useEffect(() => {
      const timeout = setTimeout(() => {
        navigation.replace('Home');
      }, 5000);

      return () => clearTimeout(timeout);
    }, [navigation]);

    return (
      <View style={styles.aberturaContainer}>
        <Text style={styles.title}>VINER</Text>
      </View>
    );
  };

  const HomeScreen = () => {
    const navigation = useNavigation();

    const handleBuy = (productId) => {
      navigation.navigate('DetalhesProduto', { productId });
    };

    const handleMenuPress = () => {
      navigation.navigate('TelaCadastro');
    };

    const handleCartPress = () => {
      console.log('Botão de carrinho pressionado!');
    };

    const handleReviewsPress = () => {
      console.log('Botão de avaliações pressionado!');
    };

    const handleRegiaoPress = () => {
      navigation.navigate('Regiao');
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>VINER</Text>
        <Image source={require('./imagem/banner.jpeg')} style={styles.bannerImage} />
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <TouchableOpacity onPress={() => handleBuy(item.id)} style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {/* Barra inferior */}
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Cadastro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegiaoPress} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Região</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  };

  const TelaCadastro = () => {
    const handleCadastro = () => {
      console.log(`Cadastro com Email: ${email}, Senha: ${password}`);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Clube Viner</Text>
        <TextInput
          style={styles.input}
          placeholder="bruna@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="123@"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleCadastro} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DetalhesProduto = ({ route, navigation }) => {
    const { productId } = route.params;

    const handleBuy = () => {
      navigation.navigate('CompraConfirmacao', { productId });
    };

    const handleReviewsPress = () => {
      navigation.navigate('AvaliacoesProduto', { productId });
    };

    const wineImage = require('./imagem/vinho1.webp');

    return (
      <View style={styles.container}>
        <Image source={wineImage} style={styles.productImage} />
        <Text style={styles.title}>Vinho Argentino</Text>
        <Text>R$ 105.99 </Text>
        <TouchableOpacity onPress={handleReviewsPress} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Avaliação</Text>
        </TouchableOpacity>
        {/* Adicionando o container para os detalhes do produto */}
        <View style={styles.productDetails}>
          <Text>Detalhes do Produto:</Text>
          {/* Adicione outros campos ou informações do produto conforme necessário */}
        </View>
        <TouchableOpacity onPress={handleBuy} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const AvaliacoesProduto = ({ route }) => {
    const { productId } = route.params;

    const images = [
      require('./imagem/Avaliacao1.jpeg'),
      require('./imagem/avaliacao2.jpeg'),
    ];

    return (
      <View style={styles.container}>
        <Image source={require('./imagem/ca8fe0ce-8f3f-4718-9a91-4902cdb962be.jpeg')} style={styles.backgroundImage} />
        <Text>Avaliações do Produto {productId}</Text>
        {/* Exiba as imagens de avaliação */}
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.reviewImage} />
          )}
        />
        {/* Aqui você pode adicionar campos para fazer upload de novas imagens */}
      </View>
    );
  };

  const CompraConfirmacao = ({ route }) => {
    const { productId } = route.params;

    return (
 <View style={styles.container}>
      <Image source={require('./imagem/carrinho.jpeg')} style={styles.additionalImage} />
      <Image source={require('./imagem/vinho1.webp')} style={styles.additionalImageSmall} />
      <Text>Informações Adicionais</Text>
      <TextInput placeholder="Nome completo" style={styles.input} />
      <TextInput placeholder="CPF" style={styles.input} />
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

  const RegiaoScreen = () => {
    const navigation = useNavigation();

    const handleProductPress = (productId) => {
      navigation.navigate('DetalhesProduto', { productId });
    };

    const handleBuy = (productId) => {
      navigation.navigate('CompraConfirmacao', { productId });
    };

    return (  
      <View style={styles.container}>
        <Image source={require('./imagem/regiao.jpeg')} style={styles.bannerImage} />

      <Text style={styles.title}>Região</Text>
        <View style={styles.productContainer}>
          <TouchableOpacity onPress={() => handleProductPress('8')} style={styles.productItem}>
            <Image source={require('./imagem/BRASIL.jpeg')} style={styles.productImage} />
            <Text style={styles.productName}>Vinho da Região 1</Text>
            <Text style={styles.productPrice}>$120.99</Text>
            <TouchableOpacity onPress={() => handleBuy('8')} style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Ver vinho</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleProductPress('1')} style={styles.
          productItem}>
            <Image source={require('./imagem/argentina.jpeg')} style={styles.productImage} />
            <Text style={styles.productName}>Vinho da Região 1</Text>
            <Text style={styles.productPrice}>$120.99</Text>
            <TouchableOpacity onPress={() => handleBuy('8')} style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Ver vinho</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleProductPress('1')} style={styles.
          productItem}>
            <Image source={require('./imagem/italian.jpeg')} style={styles.productImage} />
            <Text style={styles.productName}>Vinho da Região 1</Text>
            <Text style={styles.productPrice}>$120.99</Text>
            <TouchableOpacity onPress={() => handleBuy('8')} style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Ver vinho</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleProductPress('1')} style={styles.
          productItem}>
            <Image source={require('./imagem/CHILE.jpeg')} style={styles.productImage} />
            <Text style={styles.productName}>Vinho da Região 2</Text>
            <Text style={styles.productPrice}>$99.99</Text>
            <TouchableOpacity onPress={() => handleBuy('1')} style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Ver vinho</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          {/* Adicione mais produtos conforme necessário */}
        </View>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Abertura">
        <Stack.Screen name="Abertura" component={Abertura} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
        <Stack.Screen name="DetalhesProduto" component={DetalhesProduto} />
        <Stack.Screen name="AvaliacoesProduto" component={AvaliacoesProduto} />
        <Stack.Screen name="CompraConfirmacao" component={CompraConfirmacao} />
        <Stack.Screen name="Regiao" component={RegiaoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: '#F2B478',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
  },
  productItem: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%', // Adjust the width based on your preference
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '',
  },
  buyButton: {
    backgroundColor: '#9D540D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '80%', // Make the button wider for better alignment
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#9D540D',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
  },
  menuButton: {
    backgroundColor: '#',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '60%',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#9D540D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#9D540D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  aberturaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2B478',
  },
  bannerContainer: {
    marginBottom: 10, // Ajuste a margem conforme necessário
  },
  bannerImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    marginBottom: 30,
  },
  additionalImage: {
    width: '100%',
    height: 150, // Ajuste a altura conforme necessário
    resizeMode: 'cover',
    marginVertical: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  reviewImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    margin: 10,
  },
  productDetails: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
    additionalImageSmall: {
    width: '25%',  // Ajuste conforme necessário
    height: 100,   // Ajuste conforme necessário
    resizeMode: 'cover',
    marginVertical: 10,

  },
    bannerImage: {
    width: '100%',
    height: 150, // Ajuste a altura conforme necessário
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

