import { View, Text } from "react-native";
import Logo from "../Logo";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  logoWidth?: number;
  logoHeight?: number;
}

export default function AuthHeader({
  title,
  subtitle,
  logoWidth,
  logoHeight,
}: AuthHeaderProps) {
  return (
    <View className="max-h-[137px] mt-5 justify-center items-center gap-8">
      <Logo width={logoWidth} height={logoHeight} />
        <View className="items-center justify-center gap-2">
        <Text className="text-2xl text-gray-500 font-semibold">{title}</Text>
        <Text className="text-sm text-gray-300 font-semibold">{subtitle}</Text>
        </View>
    </View>
  );
}