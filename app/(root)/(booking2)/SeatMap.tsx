
import React from 'react';
import { View, Pressable } from 'react-native';
import Chair from '../(booking)/Chair';
import icons from '@/constants/icons';
import { seatType } from '@/schemaValidations/seat.schema';

export type SeatType = 'regular' | 'vip' | 'couple';

interface SeatMapProps {
    seats: seatType[];
    selectedSeats: seatType[];
    onSelect: (seats: seatType[]) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, selectedSeats, onSelect }) => {
    const groupedChairs = seats.reduce<Record<string, seatType[]>>((acc, seat) => {
        const row = seat.name[0];
        if (!acc[row]) acc[row] = [];
        acc[row].push(seat);
        return acc;
    }, {});

    return (
        <View>
            {Object.entries(groupedChairs).map(([rowName, chairs]) => (
                <View
                    className='justify-center'
                    key={rowName}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                    }}
                >
                    {chairs.map((seat) => {
                        if (seat.type === 'couple') {
                            const number = parseInt(seat.name.slice(1));
                            if (number % 2 === 0) return null;

                            const nextSeat = chairs.find(
                                s => s.name === `${rowName}${number + 1}` && s.type === 'couple'
                            );
                            if (!nextSeat) return null;

                            const seatPair = [seat, nextSeat];
                            const isSelected = seatPair.every(s => selectedSeats.some(sel => sel.name === s.name));

                            return (
                                <Pressable
                                    key={seat.name}
                                    onPress={() => onSelect(seatPair)}
                                    style={{ marginRight: 4 }}
                                >
                                    <Chair
                                        name={`${seat.name}-${nextSeat.name}`}
                                        type={icons.chair2}
                                        tintColor={isSelected ? 'violet' : '#ccc'}
                                        double={true}
                                    />
                                </Pressable>
                            );
                        }

                        const icon = seat.type === 'vip' ? icons.chair : icons.chair3;
                        const isSelected = selectedSeats.some(sel => sel.name === seat.name);

                        return (
                            <Pressable
                                key={seat.name}
                                onPress={() => onSelect([seat])}
                                style={{ marginRight: 4 }}
                            >
                                <Chair
                                    name={seat.name}
                                    type={icon}
                                    tintColor={isSelected ? 'violet' : '#ccc'}
                                />
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

export default SeatMap;
