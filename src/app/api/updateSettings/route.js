import { connectToDatabase } from '../../../utils/mongoconnect';

// PUT method to insert a document with 'prompt' from request body
export async function PUT(req, res) {
    try {
        const { db, client } = await connectToDatabase();

        const collection = db.collection('cbdmex'); // Replace with your collection name

        // Extract prompt from request body
        const { prompt } = await req.json();

        const document = { prompt };

        const result = await collection.insertOne(document);

        client.close();

        return new Response(JSON.stringify({ acknowledged: result.acknowledged, insertedId: result.insertedId }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

// GET method to retrieve the latest inserted document
export async function GET(req, res) {
    try {
        const { db, client } = await connectToDatabase();

        const collection = db.collection('cbdmex'); // Replace with your collection name

        // Retrieve the latest inserted document
        const latestDocument = await collection.find().sort({ _id: -1 }).limit(1).toArray();

        client.close();

        if (latestDocument.length === 0) {
            return new Response(JSON.stringify({ message: "No documents found" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify(latestDocument[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
