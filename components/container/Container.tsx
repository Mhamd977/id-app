import React from 'react'
import { View } from 'react-native'

export const Container = ({
    children,
    className,
}: React.PropsWithChildren<{ className?: string }>) => {
    return (
        <View className={`container mx-auto px-3 ${className}`}>
            {children}
        </View>
    );
};