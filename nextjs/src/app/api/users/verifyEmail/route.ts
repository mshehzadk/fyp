import { connect } from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import User from '@//models/userModel';

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        // console.log(token);
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpire: { $gt: Date.now() },
        });
        if (!user) {
            return NextResponse.json({ status: 400, message: 'Invalid token' });
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
        await user.save();
        return NextResponse.json({
            status: 200,
            message: 'Email verified successfully',
        });
    } catch (error: any) {
        return NextResponse.json({ status: 500, message: error.message });
    }
}
