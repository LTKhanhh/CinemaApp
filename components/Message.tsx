import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import { Send } from "react-native-feather";

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
    message: Message;
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
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10
            }}
        >
            <Image
                source={{ uri: avatar }}
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#e0e0e0'
                }}
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

    return message.is_me ? (
        <MessageBubbleMe text={message.text} />
    ) : (
        <MessageBubbleFriend text={message.text} />
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

function MessagesScreen(): JSX.Element {
    const [message, setMessage] = useState<string>('')

    function onSend() {
        const cleaned = message.replace(/\s+/g, ' ').trim()
        if (cleaned.length === 0) return

        // Add new message to the list
        const newMessage: Message = {
            id: Date.now(),
            is_me: true,
            text: cleaned
        }
        setMessagesList(prev => [newMessage, ...prev])
        setMessage('')
    }

    const [messagesList, setMessagesList] = useState<Message[]>([
        { id: 1, is_me: true, text: "Hello there!" },
        { id: 2, is_me: false, text: "Hi! How are you?" },
        { id: 3, is_me: true, text: "I'm doing great, thanks!" },
        { id: 4, is_me: false, text: "That's wonderful to hear!" },
        { id: 5, is_me: true, text: "How about you?" },
        { id: 6, is_me: true, text: "What have you been up to lately?" },
        { id: 7, is_me: false, text: "Just working on some projects" },
        { id: 8, is_me: true, text: "Sounds interesting!" },
        { id: 9, is_me: false, text: "Yes, it's quite exciting" },
        { id: 10, is_me: true, text: "Tell me more about it" },
        { id: 11, is_me: true, text: "I'm really curious" },
        { id: 12, is_me: false, text: "Well, it's a React Native app" },
        { id: 13, is_me: true, text: "That's awesome!" },
        { id: 14, is_me: false, text: "Thanks! It's been fun to build" },
        { id: 15, is_me: true, text: "I bet it has!" },
    ])

    function onType(value: string) {
        setMessage(value)
    }

    const renderItem = ({ item, index }: { item: Message | { id: number }; index: number }): JSX.Element | null => {
        return (
            <MessageBubble
                index={index}
                message={item as Message}
            />
        )
    }

    const keyExtractor = (item: Message | { id: number }): string => {
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
                    data={[{ id: -1 }, ...messagesList]}
                    inverted={true}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
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