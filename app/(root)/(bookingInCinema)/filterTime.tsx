import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';

// Define interface for TimeItem props
interface TimeItemProps {
    date: string;
    day: string;
    isSelected: boolean;
    onPress: () => void;
}

const TimeItem: React.FC<TimeItemProps> = ({ date, day, isSelected, onPress }) => {
    // Apply color styling based on selection state
    const textColor = isSelected ? 'text-blue-500' : 'text-gray-400';

    return (
        <Pressable className='mr-8 items-center' onPress={onPress}>
            <View>
                <Text className={`text-[24px] font-rubik-medium ${textColor}`}>{date}</Text>
            </View>
            <View>
                <Text className={`text-[15px] font-rubik-medium ${textColor}`}>{day}</Text>
            </View>
        </Pressable>
    );
};

const FilterTime = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<number>> }) => {
    // Get current date
    const today = new Date();

    // Create array to store 3 days (today and next 2 days)
    const days: Date[] = [];

    // Generate dates for today and next two days
    for (let i = 0; i < 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }

    // Set the selected day to today by default
    const [selectedDay, setSelectedDay] = useState<string>(days[0].getDate().toString().padStart(2, '0'));

    // Function to format the day label
    const formatDayLabel = (date: Date): string => {
        // Format for today
        if (date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
            return 'Hôm nay';
        }

        // Format for other days: DD-ThX (where X is the day of week)
        const dayOfWeek = date.getDay() + 1; // 1 = Sunday, 2 = Monday, etc.
        const dayStr = date.getDate().toString().padStart(2, '0');

        return `${dayStr}- ${dayOfWeek == 1 ? "CN" : `Th${dayOfWeek}`} `;
    };

    const handlePress = (dateStr: string, idx: number) => {
        setSelectedDay(dateStr)
        console.log(idx)
        setPage(idx)
    }
    return (
        <View className='flex-row mx-8 my-4'>
            {days.map((day, index) => {
                const dateStr = day.getDate().toString().padStart(2, '0');
                const dayLabel = formatDayLabel(day);

                return (
                    <TimeItem
                        key={index}
                        date={dateStr}
                        day={dayLabel}
                        isSelected={selectedDay === dateStr}
                        onPress={() => handlePress(dateStr, index)}
                    />
                );
            })}
        </View>
    );
};

export default FilterTime;