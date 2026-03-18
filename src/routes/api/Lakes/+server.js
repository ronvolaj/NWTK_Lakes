import pool from '$lib/server/database';

import { API_USER, API_PASS } from '$env/static/private';

function checkAuth(request) {
    const auth = request.headers.get('Authorization');
    if (!auth?.startsWith('Basic ')) return false;
    const base64 = auth.slice(6);
    const decoded = atob(base64);
    const [user, pass] = decoded.split(':');
    return user === API_USER && pass === API_PASS;
}

export async function GET() {
    const [rows] = await pool.query('SELECT * FROM lakes');
    return Response.json(rows, { status: 200 });
}

export async function POST({ request }) {
    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { name, location, type, area_km2, max_depth_m } = await request.json();
    if (!name || !location || !type) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const [result] = await pool.query(
        'INSERT INTO lakes (name, location, type, area_km2, max_depth_m) VALUES (?, ?, ?, ?, ?)',
        [name, location, type, area_km2, max_depth_m]
    );
    return Response.json({ message: 'Lake created', id: result.insertId }, { status: 201 });
}

export async function PUT({ params, request }) {

    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const { name, location, type, area_km2, max_depth_m } =
        await request.json();

    if (!name || !location || !type) {
        return Response.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    const [result] = await pool.query(
        `UPDATE lakes
         SET name = ?, location = ?, type = ?, area_km2 = ?, max_depth_m = ?
         WHERE id = ?`,
        [name, location, type, area_km2, max_depth_m, id]
    );

    if (result.affectedRows === 0) {
        return Response.json({ message: 'Lake not found' }, { status: 404 });
    }

    return Response.json({ message: 'Lake updated' }, { status: 200 });
}

export async function DELETE({ params, request }) {

    if (!checkAuth(request)) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const [result] = await pool.query(
        'DELETE FROM lakes WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        return Response.json({ message: 'Lake not found' }, { status: 404 });
    }

    return new Response(null, { status: 204 });
}