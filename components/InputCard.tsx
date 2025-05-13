import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import { Eye, EyeOff } from 'react-native-feather'
interface Props {
    icons?: ImageSourcePropType | undefined,
    value: string,
    placeholder: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    inputClass?: string
    password?: boolean
}

const InputCard = ({ icons, value, placeholder, setValue, inputClass, password }: Props) => {
    const [show, setShow] = useState(password)

    return (
        <>
            {icons ?
                <View className='flex-row border py-2 border-[#ccc] rounded-md px-2 items-center mb-6'>

                    <>
                        <Image source={icons} className='size-8 ' tintColor="#999" />

                        <Text className='text-[36px] relative top-[-2px] block ml-1 mr-1 text-[#ccc] font-extralight'>|</Text>
                    </>


                    <View className={`flex-1 justify-center  ${inputClass ? inputClass : ""}`}>
                        <TextInput secureTextEntry={show} value={value} onChangeText={e => setValue(e)} placeholder={placeholder} className={`flex-1 text-xl  font-rubik text-black ${inputClass ? inputClass : ""}`} placeholderTextColor="#ccc" />
                    </View>

                    {/* {
                        password &&
                        <View>
                            <Text>123</Text>
                        </View>
                    } */}
                    {
                        password &&
                        <Pressable onPress={() => setShow(prev => !prev)}>
                            {
                                show ?
                                    <EyeOff stroke="#666" width={20} height={20}></EyeOff>
                                    :
                                    <Eye stroke="#666" width={20} height={20}></Eye>
                            }
                        </Pressable>
                    }


                </View> :

                <View className={'flex-row border py-4 pb-5 mt-2 border-[#ccc] rounded-md px-2 items-center mb-6'}>
                    {/* <View className='py-2 flex-1'> */}
                    <TextInput secureTextEntry={show} value={value} onChangeText={e => setValue(e)} placeholder={placeholder} className={`flex-1 text-xl  font-rubik text-black `} placeholderTextColor="#ccc" />
                    {/* </View> */}
                </View>

            }
        </>

    )
}

export default InputCard