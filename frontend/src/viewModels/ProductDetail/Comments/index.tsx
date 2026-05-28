import { View, Text, Image } from "react-native";
import { ProductComment, ProductCommentsResponse, ProductUserCommentResponse } from "../../../shared/interfaces/product";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";

interface CommentProps {
    data: ProductComment;
    userComment: ProductUserCommentResponse | null;
    
}

export default function Comments ({data, userComment}: CommentProps) {
    const isUserComment = data.content === userComment?.comment;
    console.log("comentário da lista:", data.content);
console.log("comentário do usuário:", userComment?.comment);
console.log("é do usuário?", data.content === userComment?.comment);
    return (
        <View className="w-full h-[80px] rounded-lg p-2 gap-1">
            <View className="flex-row items-center justify-between">
                <View className="gap-1 flex-row items-center">
                    <Image source={{ uri: data.user?.avatar?.url ?? <Ionicons name="person-add-outline" />}} style={{ width: 24, height: 24}} className="rounded-md" resizeMode="cover"/>
                    <Text className="text-gray-500 font-semibold text-xs">{data.user.name}</Text>
                    {isUserComment && (
                        
                    <View className="rounded-s-full bg-blue-base w-[40px] h-[20px] items-center justify-center">
                    <Text className="text-white text-sm">VOCÊ</Text>
                    </View>
                    )}
                    <View className="items-center justify-center">
                    <Ionicons name="star" size={12} color={colors["blue-base"]} />
                    <Text className="text-sm font-semibold text-gray-400">
                    {isUserComment ? `${userComment.rating} / 5` : `${data.user.rating.value} / 5` } 
                    </Text>
                    </View>
                </View>
                
            </View>
            <Text className="text-gray-400 font-medium mr-5">
                {isUserComment ? `${userComment.comment}` : `${data.content}`}
            </Text>
        </View>
    )
}