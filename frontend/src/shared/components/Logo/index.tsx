import { Image } from "react-native";

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 64, height = 48 }: LogoProps) {
  return (
    <Image
      source={require("../../../../assets/icons/Logo (1).png")}
      style={{ width, height }}
      resizeMode="contain"
    />
  );
}