import pool from '$lib/server/database.js';
import { API_USER, API_PASSWORD } from '$env/static/private';

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

// CREATE a new lake
export async function POST({ request }) {

  // check authentication
  if (!checkAuth(request)) {
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  // get data from request body
  const { name, location, type, area_km2, max_depth_m } = await request.json();

  // validate required fields
  if (!name || !location || !type) {
    return Response.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  // insert into database
  const [result] = await pool.query(
    'INSERT INTO lakes (name, location, type, area_km2, max_depth_m) VALUES (?, ?, ?, ?, ?)',
    [name, location, type, area_km2, max_depth_m]
  );

  // return success + new ID
  return Response.json(
    { message: 'Lake created', id: result.insertId },
    { status: 201 }
  );
}