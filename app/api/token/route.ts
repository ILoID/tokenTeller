import axios from "axios";
import { NextResponse } from "next/server";

const DEXTOOLS_API_BASE_URL = process.env.DEXTOOLS_API_BASE_URL!;
const DEXTOOLS_API_KEY = process.env.DEXTOOLS_API_KEY!;

const HEADERS = {
    "X-API-KEY": DEXTOOLS_API_KEY,
};

export async function POST (req: Request) {
    const { chain, address } = await req.json();

    const url = `${DEXTOOLS_API_BASE_URL}/token?chain=${chain}&address=${address}`;

    try {
        const response = await axios.get(url, { headers: HEADERS });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error.response.data, { status: error.response.data.errorCode });
    }
}