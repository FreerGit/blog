import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js/lib/core';
import hljsZig from "highlightjs-zig";
require("./public/zig.css")

hljs.registerLanguage("zig", hljsZig);
hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'));

// hljs.initHighlightingOnLoad();

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
fs.readdir('./posts',  { recursive: true }, (err, files) => {
  files.forEach(file => {
    const split = file.split('.');
    if (split.length == 1) return;
    const name = split[0];
    const filePath = path.join(import.meta.dir, 'posts', file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const marked = new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
          console.log("lang",lang)
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          console.log("language", language)
          return hljs.highlight(code, { language }).value;
        }
      })
    );
    const html = marked.parse(fileContents);
    app.get(`/${name}`, (req, res) => {
      res.render('post', { title: name, content: html });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});