const express = require('express')
const app = express()
const marked = require('marked')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:filename', async (req, res) => {
  const filename = req.params.filename
  const markdown = `./posts/${filename}.md`
  const file = Bun.file(markdown);
  try {
    const text = await file.text();
    res.send(text);
  } catch (err) {
    res.send('Page not found');
  }

  
  // fs.readFile(markdown, 'utf8', (err, data) => {
  //   if (err) {
  //     res.send('File not found')
  //   } else {
  //     const html = marked(data.toString())
  //     res.send(html)
  //   }
  // })
})
app.listen(3000, () => {
  console.log('Blog server listening on port 3000!')
})