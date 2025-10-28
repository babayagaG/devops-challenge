require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');
const { initDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({
  defaultLayout: 'main',
  helpers: {
    formatDate: function(date) {
      return new Date(date).toLocaleDateString();
    },
    substring: function(str, start, length) {
      return str.substring(start, start + length);
    },
    gt: function(a, b) {
      return a > b;
    },
    eq: function(a, b) {
      return a === b;
    },
    ne: function(a, b) {
      return a !== b;
    },
    and: function(a, b) {
      return a && b;
    },
    nl2br: function(text) {
      return text.replace(/\n/g, '<br>');
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

app.use('/auth', authRoutes);
app.use('/', blogRoutes);

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});