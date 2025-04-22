require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();
const PORT = parseInt(process.env.PORT) || 8080;

const mealplanRoutes = require('./routes/mealplans');
const mealIdeasRoute = require('./routes/mealIdeas');



app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.use('/api/mealplans', mealplanRoutes);
app.use('/api/meal-ideas', mealIdeasRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
  });

//app.listen(3001, () => console.log('Server running on port 3001'));
