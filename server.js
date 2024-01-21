import { marked } from 'marked';
const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const app = express();
const PORT = 3000;
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Serve static files from the public folder
app.use(express.static(path.join(import.meta.dir, 'public')));
// Create a route for each Markdown post
fs.readdir('./posts', (err, files) => {
  files.forEach(file => {
    const name = file.split('.')[0];
    const filePath = path.join(import.meta.dir, 'posts', file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const html = marked.parse(fileContents);
    app.get(`/${name}`, (req, res) => {
      res.render('post', { title: name, content: html });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});