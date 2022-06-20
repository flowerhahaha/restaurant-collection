# My Restaurant Collection
![demo](/public/images/S2-3_A7_01.gif)
![demo](/public/images/S2-3_A7_02.gif)

## Features
- Display all restaurants on homepage
- Click the restaurant to check its details
- Search restaurants by name and category
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

4. Set environment variable: MONGODB_URI 

```
MONGODB_URI=your connection string
```

5. Set environment variable: GOOGLE_MAP_API<br>
(make sure to enable Places API and Maps JavaScript API) 

```
GOOGLE_MAP_API=your google map API key
```

6. Replace the "GOOGLE_MAP_API" string with your own key in main.hbs

```
<script src="https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAP_API&libraries=places"></script>
```

7. Seed your database 

```
npm run seed
```

8. Start the server

```
npm run dev
```

9. Execute successfully if seeing following message

```
App is running on http://localhost:3000
```

## Built With
-  node.js @ 16.15.0
-  express @ 4.17.1
-  express-handlebars @ 4.0.2
-  mongoose @ 6.3.8
-  mongodb @ 4.5.0
-  axios @ 0.27.2
-  sweet-alert @ 2.1.2
-  bootstrap @ 4.3.1
-  font-awesome @ 5.8.1
