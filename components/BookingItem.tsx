import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface BookingItemProps {
    item: {
        userId: string;
        showtimeId: string;
        seats: {
            type: string;
            name: string;
            price: number;
            _id: string;
            id: string;
        }[];
        status: string;
        id: string;
        bonusItems: any[];
        totalPay: number;
        method: string;
    };
}

function BookingItem({ item }: BookingItemProps): JSX.Element {
    const handlePress = () => {
        router.push(`/(root)/(bookingList)/(bookingInfo)/${item.id}`);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getSeatNames = () => {
        return item.seats.map(seat => seat.name).join(', ');
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            className='w-full bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 active:bg-gray-50'
        >
            {/* Header với ID và Status */}
            <View className='flex-row items-center justify-between mb-3'>
                <Text className='text-gray-900 font-bold text-lg'>
                    #{item.id.toUpperCase()}
                </Text>
                <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    <Text className={`text-xs font-semibold capitalize ${getStatusColor(item.status).split(' ')[1]}`}>
                        {item.status}
                    </Text>
                </View>
            </View>

            {/* Thông tin ghế */}
            <View className='mb-3'>
                <Text className='text-gray-600 text-sm mb-1'>Ghế đã đặt</Text>
                <Text className='text-gray-900 font-medium'>
                    {getSeatNames()}
                </Text>
                <Text className='text-gray-500 text-xs mt-1'>
                    {item.seats.length} ghế • {item.seats[0]?.type || 'Standard'}
                </Text>
            </View>

            {/* Thông tin thanh toán */}
            <View className='flex-row items-center justify-between mb-2'>
                <View>
                    <Text className='text-gray-600 text-sm'>Tổng thanh toán</Text>
                    <Text className='text-blue-600 font-bold text-lg'>
                        {formatCurrency(item.totalPay)}
                    </Text>
                </View>
                <View className='items-end'>
                    <Text className='text-gray-600 text-sm'>Phương thức</Text>
                    <Text className='text-gray-900 font-medium capitalize'>
                        {item.method}
                    </Text>
                </View>
            </View>

            {/* Bonus items nếu có */}
            {item.bonusItems && item.bonusItems.length > 0 && (
                <View className='mt-2 pt-2 border-t border-gray-100'>
                    <Text className='text-green-600 text-xs font-medium'>
                        🎁 Có {item.bonusItems.length} ưu đãi kèm theo
                    </Text>
                </View>
            )}

            {/* Indicator arrow */}
            <View className='absolute right-4 top-1/2 -translate-y-1/2'>
                <Text className='text-gray-400 text-lg'>›</Text>
            </View>
        </TouchableOpacity>
    );
}

export default BookingItem;