import { Text, TextProps } from 'react-native';

interface MyTextProps extends TextProps {
  children: React.ReactNode;
  weight?: '400' | '500' | '600' | '700' | '900';
}

export default function MyText({ children, weight = '400', style, ...props }: MyTextProps) {
  return (
    <Text style={[{ fontSize: 18 }, style]} {...props}>
      {children}
    </Text>
  );
}
