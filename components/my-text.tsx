import { Text, TextProps } from 'react-native';

interface MyTextProps extends TextProps {
  children: React.ReactNode;
  weight?: '400' | '500' | '600' | '700' | '900'; // Matching Inter weights
}

export default function MyText({ children, weight = '400', style, ...props }: MyTextProps) {
  const fontFamily = {
    '400': 'Inter_400Regular',
    '500': 'Inter_500Medium',
    '600': 'Inter_600SemiBold',
    '700': 'Inter_700Bold',
    '900': 'Inter_900Black',
  }[weight];

  return (
    <Text style={[{ fontFamily, fontSize: 18 }, style]} {...props}>
      {children}
    </Text>
  );
}
