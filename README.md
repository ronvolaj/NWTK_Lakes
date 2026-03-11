# Albania Lakes REST API

## Project Description

This project is a REST API for lakes in Albania built with SvelteKit.
The API allows users to retrieve information about different lakes such as their name, location, type, surface area and maximum depth.

The main goal of this project is to demonstrate:
	•	REST API design
	•	correct HTTP methods and status codes
	•	Basic Authentication for protected endpoints
	•	clean Git history with meaningful commits
	•	API testing and documentation using Postman

⸻

## Data Model

Each lake contains the following attributes:

Field	Description
id	unique identifier
name	name of the lake
location	region where the lake is located
type	type of lake (natural, reservoir, etc.)
area_km2	surface area in square kilometers
max_depth_m	maximum depth of the lake in meters

Example:

{
  "id": 1,
  "name": "Lake Shkodra",
  "location": "Shkoder",
  "type": "natural",
  "area_km2": 370,
  "max_depth_m": 44
}


⸻

## API Endpoints

## Public Endpoints

## Get all lakes

GET /api/lakes

Response:

200 OK

Returns a list of all lakes.

⸻

## Get one lake

GET /api/lakes/:id

Example:

GET /api/lakes/1

Responses:

200 OK – lake found
404 Not Found – lake does not exist

⸻

## Protected Endpoints (Basic Auth required)

## Create a new lake

POST /api/lakes

Response:

201 Created

⸻

## Update a lake

PUT /api/lakes/:id

Response:

200 OK – lake updated
404 Not Found – lake not found

⸻

## Delete a lake

DELETE /api/lakes/:id

Response:

204 No Content – lake deleted
404 Not Found – lake not found

⸻

## Authentication

POST, PUT and DELETE endpoints require Basic Authentication.

Example credentials:

Username: admin
Password: secret

If authentication fails the API returns:

401 Unauthorized

⸻

## HTTP Status Codes

## The API uses standard HTTP status codes:
	•	200 OK
	•	201 Created
	•	204 No Content
	•	401 Unauthorized
	•	404 Not Found
	•	400 Bad Request

⸻

## Technologies Used
	•	SvelteKit
	•	Node.js
	•	SQLite
	•	REST API
	•	Postman for testing
	•	DataGrip for database management

⸻

## Testing

All endpoints were tested using Postman.
The complete Postman collection is included in this repository.

⸻

## Deployment

The API is deployed using Vercel.

Example endpoint:

GET /api/lakes

⸻

## Author

Project created by Ron Volaj.
