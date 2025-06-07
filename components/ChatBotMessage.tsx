import chatApiRequest from "@/apiRequest/chat";
import { connectSocketChat, getSocketChat } from "@/lib/socketChat";
import { messageSchemaType, messagesSchemaType } from "@/schemaValidations/chat.schema";
import { sendBodyType } from "@/schemaValidations/chatbot.schema";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import { ChevronLeft, ChevronsLeft, Send } from "react-native-feather";

interface data {
    id: string
    role: string,
    message: string
}

// Type definitions
interface Friend {
    id: string | number;
    name: string;
    username: string;
    thumbnail: string;
}

interface Message {
    id: string | number;
    text: string;
    is_me: boolean;
    created_at?: string;
}

interface MessageHeaderProps {
    friend: Friend;
}

interface MessageBubbleMeProps {
    text: string;
}

interface MessageTypingAnimationProps {
    offset: number;
}

interface MessageBubbleFriendProps {
    text?: string;
}

interface MessageBubbleProps {
    index: number;
    message: data;
}

interface MessageInputProps {
    message?: string;
    setMessage?: (value: string) => void;
    onSend?: () => void;
}

interface MessagesScreenProps {
    navigation?: any;
    route?: {
        params: {
            id: string | number;
            friend: Friend;
        };
    };
}

function Thumbnail({ url, size }: { url: string, size: number }) {
    return (
        <Image
            source={{ uri: url }}
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: '#e0e0e0'
            }}
        />
    )
}

export function MessageHeader({ name, avatar }: { name: string, avatar: string }): JSX.Element {
    const router = useRouter()
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10
            }}
        >
            <ChevronLeft color={"#666"} onPress={() => router.push("/(root)/(tabs)/Conversation")} />
            <Image
                source={{ uri: avatar }}
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#e0e0e0'
                }}
                className="ml-2"
            />
            <Text
                style={{
                    color: '#202020',
                    marginLeft: 10,
                    fontSize: 18,
                    fontWeight: 'bold'
                }}
            >
                {name}
            </Text>
        </View>
    )
}

function MessageBubbleMe({ text }: MessageBubbleMeProps): JSX.Element {
    return (
        <View
            style={{
                flexDirection: 'row',
                padding: 4,
                paddingRight: 12
            }}
        >
            <View style={{ flex: 1 }} />
            <View
                style={{
                    backgroundColor: '#303040',
                    borderRadius: 21,
                    maxWidth: '75%',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'center',
                    marginRight: 8,
                    minHeight: 42
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 16,
                        lineHeight: 18
                    }}
                >
                    {text}
                </Text>
            </View>
        </View>
    )
}

function MessageBubbleFriend({ text = '' }: MessageBubbleFriendProps): JSX.Element {
    return (
        <View
            style={{
                flexDirection: 'row',
                padding: 4,
                paddingLeft: 16
            }}
        >
            <Thumbnail
                url={"https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"}
                size={42}
            />
            <View
                style={{
                    backgroundColor: '#d0d2db',
                    borderRadius: 21,
                    maxWidth: '75%',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    justifyContent: 'center',
                    marginLeft: 8,
                    minHeight: 42
                }}
            >
                <Text
                    style={{
                        color: '#202020',
                        fontSize: 16,
                        lineHeight: 18
                    }}
                >
                    {text}
                </Text>
            </View>
            <View style={{ flex: 1 }} />
        </View>
    )
}

function MessageBubble({ message, index }: MessageBubbleProps): JSX.Element | null {
    // Skip the placeholder item at index 0
    if (index === 0) {
        return null;
    }

    return message.role == "user" ? (
        <MessageBubbleMe text={message.message} />
    ) : (
        <MessageBubbleFriend text={message.message} />
    )
}

export function MessageInput({ message = '', setMessage, onSend }: MessageInputProps): JSX.Element {
    return (
        <View
            style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
                paddingTop: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: 1,
                borderTopColor: '#e0e0e0'
            }}
        >
            <TextInput
                placeholder="Message..."
                placeholderTextColor='#909090'
                value={message}
                onChangeText={setMessage}
                style={{
                    flex: 1,
                    paddingHorizontal: 18,
                    borderWidth: 1,
                    borderRadius: 25,
                    borderColor: '#d0d0d0',
                    backgroundColor: 'white',
                    height: 50
                }}
            />
            <TouchableOpacity
                onPress={onSend}
                style={{
                    marginLeft: 10,
                    padding: 10
                }}
            >
                <Send stroke="#666" width={22} height={22} />
            </TouchableOpacity>
        </View>
    )
}

function MessagesScreen({ messagesList }: { messagesList: data[] }): JSX.Element {
    const [messages, setMessages] = useState<data[]>(messagesList)
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState(false)


    async function onSend() {
        const cleaned = message.replace(/\s+/g, ' ').trim()
        if (cleaned.length === 0) return

        const userMessage: data = {
            id: `user-${Date.now()}`,
            role: 'user',
            message: cleaned
        };
        setMessages(prev => [userMessage, ...prev]);
        setLoading(true);
        setMessage('')

        try {
            const response = await axios.post<sendBodyType>('http://10.0.2.2:8000/question', {
                query: message
            });
            const botMessage: data = {
                id: `bot-${Date.now()}`,
                role: 'bot',
                message: response.data.response
            };
            setMessages(prev => [botMessage, ...prev]);
        } catch (error) {

        }
        finally {
            setLoading(false);
        }
    }

    function onType(value: string) {
        setMessage(value)
    }

    const renderItem = ({ item, index }: { item: data | { id: number }; index: number }): JSX.Element | null => {
        return (
            <MessageBubble
                index={index}
                message={item as data}
            />
        )
    }

    const keyExtractor = (item: data | { id: number }): string => {
        return item.id.toString()
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{
                        paddingTop: 10,
                        paddingBottom: 10
                    }}
                    data={[{ id: -1 }, ...messages]}
                    inverted={true}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                />
            </View>

            <MessageInput
                message={message}
                setMessage={onType}
                onSend={onSend}
            />
        </View>
    )
}

export default MessagesScreen