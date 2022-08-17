# My Restaurant Collection
![demo](/public/images/S2-3_A8.gif)
![demo](/public/images/S2-3_A7_02.gif)

## Features
- Register via email, Facebook, or Google account
- Login to see user's own restaurants
- Click the restaurant to check its details
- Search restaurants by name and location
- Select restaurants by category
- Sort restaurants by name and rating
- Create a restaurant with details autofilled by Google API
- Edit the details of a restaurant
- Delete a restaurant, come with a confirmation alert

## Getting Start

1. Clone the project

```
git clone https://github.com/flowerhahaha/restaurant-collection.git
```

2. Install the required dependencies

```
npm install
```

3. Install nodemon 

```
npm i nodemon
```

4. Set environment variables in .env file according to .env.example

```
mkdir .env
```

5. Replace the "GOOGLE_MAP_API" string with your own key in main.hbs

```
<script src="https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAP_API&libraries=places"></script>
```

6. Seed your database 

```
npm run seed
```

7. Start the server

```
npm run dev
```

8. Execute successfully if seeing following message

```
App is running on http://localhost:3000
```

## Built With
-  Runtime: node @ 16.14.2
-  Framework: express @ 4.17.1
-  Database: mongoose @ 6.3.8
-  View Engine: express-handlebars @ 4.0.2
-  Check package.json for other dependencies
