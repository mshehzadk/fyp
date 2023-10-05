import { NextRequest, NextResponse } from 'next/server';
import { getUserTokenData } from '@/helpers/getUserTokenData';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getUserTokenData(request);
        const user = await User.findOne({ _id: userId }).select('-password');
        console.log(user);
        return NextResponse.json({ message: 'User Found', data: user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}
