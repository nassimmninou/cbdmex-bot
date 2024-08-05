import { connectToDatabase } from '../../../utils/mongoconnect';

export async function GET(req, res) {

    return new Response(JSON.stringify({"prompt": "habiw" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

