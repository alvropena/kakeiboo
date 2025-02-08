import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { currencies, Currency } from '../constants/currencies';
import ContinueButton from '../components/continue-button';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '../constants/theme';
import { router } from 'expo-router';

const styles = (scheme: "light" | "dark") => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: useThemeColor(scheme, 'background'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: useThemeColor(scheme, 'text'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: useThemeColor(scheme, 'buttonBackground'),
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: useThemeColor(scheme, 'text'),
    fontSize: 18,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: useThemeColor(scheme, 'borderColor'),
  },
  symbolContainer: {
    width: 48,
    height: 48,
    backgroundColor: useThemeColor(scheme, 'buttonBackground'),
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  symbol: {
    color: useThemeColor(scheme, 'text'),
    fontSize: 20,
  },
  currencyDetails: {
    flex: 1,
  },
  currencyCode: {
    color: useThemeColor(scheme, 'text'),
    fontSize: 20,
    fontWeight: '600',
  },
  currencyName: {
    color: useThemeColor(scheme, 'secondaryText'),
    fontSize: 16,
    marginTop: 4,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default function CurrencyScreen() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const activeStyles = styles(scheme);

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCurrencyItem = ({ item }: { item: Currency }) => (
    <TouchableOpacity
      style={activeStyles.currencyItem}
      onPress={() => setSelectedCurrency(item.code)}
    >
      <View style={activeStyles.symbolContainer}>
        <Text style={activeStyles.symbol}>{item.symbol}</Text>
      </View>
      <View style={activeStyles.currencyDetails}>
        <Text style={activeStyles.currencyCode}>{item.code}</Text>
        <Text style={activeStyles.currencyName}>{item.name}</Text>
      </View>
      {selectedCurrency === item.code && (
        <Ionicons name="checkmark" size={24} color="#0066FF" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={activeStyles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={activeStyles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={activeStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={useThemeColor(scheme, 'text')} />
        </TouchableOpacity>
        <Text style={activeStyles.headerTitle}>Select Currency</Text>
      </View>

      <View style={activeStyles.searchContainer}>
        <Ionicons name="search" size={20} color={useThemeColor(scheme, 'secondaryText')} style={activeStyles.searchIcon} />
        <TextInput
          style={activeStyles.searchInput}
          placeholder="Search currency"
          placeholderTextColor={useThemeColor(scheme, 'secondaryText')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredCurrencies}
        renderItem={renderCurrencyItem}
        keyExtractor={item => item.code}
        style={activeStyles.list}
      />

      <View style={activeStyles.bottomContainer}>
        <ContinueButton
          onPress={() => router.push({
            pathname: '/transactions',
            params: { currency: selectedCurrency }
          })}
          text="Continue"
        />
      </View>
    </SafeAreaView>
  );
}
