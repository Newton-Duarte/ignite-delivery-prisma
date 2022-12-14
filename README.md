# Ignite Delivery - API

This project was created to learn Prisma ORM with Node.js and TypeScript

## Frontend project for this API

https://github.com/Newton-Duarte/ignite-delivery-web

## How to run this project

#### Install dependencies

`$ npm install`

or

`$ yarn`

#### Provide an .env file

You can copy the env.sample and add the env variables

#### Run the migrations

`$ npx prisma migrate dev`

or

`$ yarn prisma migrate dev`

#### Start the server

`$ npm run dev`

or

`$ yarn dev`

## Routes

#### Client Auth routes

Sign Up  
`POST` `http://localhost:3333/clients`

Body
```json
{
	"name": "My Name",
	"address": "My Address",
	"username": "myusername",
	"password": "mypassword"
}
```

Login  
`POST` `http://localhost:3333/clients/authenticate`

Body  
```json
{
	"username": "myusername",
	"password": "mypassword"
}
```

Me  
`GET` `http://localhost:3333/clients/me`

`Authorization Header:` Bearer token

#### Deliveryman Auth routes

Sign Up  
`POST` `http://localhost:3333/deliverymen`

Body  
```json
{
	"name": "My Name",
	"username": "myusername",
	"password": "mypassword"
}
```

Login  
`POST` `http://localhost:3333/deliverymen/authenticate`

Body  
```json
{
	"username": "myusername",
	"password": "mypassword"
}
```

Me  
`GET` `http://localhost:3333/clients/me`

`Authorization Header:` Bearer token

#### Client Deliveries routes

List  
`GET` `http://localhost:3333/clients/deliveries`

`Authorization Header:` Bearer token  

Params  
```json
{
  "page": 1,
  "per_page": 5,
  "search": "",
  "sort_by": "created_at",
  "sort": "desc"
}
```

#### Deliveryman Deliveries routes

List  
`GET` `http://localhost:3333/deliverymen/deliveries`

`Authorization Header:` Bearer token  

Params  
```json
{
	"page": 1,
  "per_page": 5,
  "search": "",
  "sort_by": "created_at",
  "sort": "desc"
}
```

#### Deliveries routes

List 
`GET` `http://localhost:3333/deliveries`

Params  
```json
{
	"page": 1,
  "per_page": 10,
  "search": "",
  "sort_by": "created_at",
  "sort": "desc"
}
```

Create  
`POST` `http://localhost:3333/deliveries`

`Authorization Header:` Bearer token  

Body  
```json
{
	"item_name": "Item to be delivered",
	"address": "Address to deliver"
}
```

Update delivery deliveryman (When the deliveryman accepts the delivery)  
`PUT` `http://localhost:3333/deliveries/:delivery_id`

`Authorization Header:` Bearer token  

Body  
No body, just send the delivery_id on request params and the Authorization header of an Deliveryman user

Update delivery end date (When the deliveryman delivery the item)  
`PUT` `http://localhost:3333/deliveries/:delivery_id`

`Authorization Header:` Bearer token  

Body  
No body, just send the delivery_id on request params and the Authorization header of an Deliveryman user