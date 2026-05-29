import { View, Text, Image } from "react-native";
import { ProductComment, ProductCommentsResponse, ProductUserCommentResponse } from "../../../shared/interfaces/product";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";
import BuildImageUrl from "../../../shared/helpers/buildImageUrl";
import { baseURL } from "../../../shared/api/market-place";
import { useUserStore } from "../../../shared/store/user-store";

interface CommentProps {
    data: ProductComment;
    userComment: ProductUserCommentResponse | null;
    
}

export default function Comments ({data, userComment}: CommentProps) {
    const { user } = useUserStore();
    const isUserComment =   String(data.user.id) === String(user?.id)
    const avatarUrl = `${baseURL}${data.user.avatar.url}`
    
    return (
        <View className="w-full h-[80px] p-2 gap-1 bg-white mt-3 rounded-md">
            <View className="flex-row items-center justify-between">
                <View className="gap-2 flex-row items-center">
                    {data.user?.avatar?.url ? (
                        <Image source={{ uri: avatarUrl }} style={{ width: 24, height: 24}} className="rounded-md" resizeMode="cover"/>
                    ) : (
                         <Ionicons
                        name="person-outline"
                        size={24}
                        color={colors.gray[300]}
                        />
                    )}
                    
                    <Text className="text-gray-500 font-semibold text-xs">{data.user.name}</Text>
                    {isUserComment && (
                        
                    <View className="rounded-xl bg-blue-base w-[40px] h-[20px] items-center justify-center">
                    <Text className="text-white text-xs">VOCÊ</Text>
                    </View>
                
                    )}
                </View>
                    <View className="items-center flex-row">
                    <Ionicons name="star" size={12} color={colors["blue-base"]} />
                    <Text className="text-sm font-semibold text-gray-400">
                    {isUserComment ? ` ${userComment?.rating ?? ""} / 5` : ` ${data.user.rating?.value} / 5` } 
                    </Text>
                    </View>
                
            </View>
            <Text className="text-gray-400 mr-5">
                {isUserComment ? `${userComment?.comment?.content ?? ""}` : `${data.content}`}
            </Text>
        </View>
    )
}