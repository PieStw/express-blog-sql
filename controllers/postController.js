const connection = require("./../data/postDB");

function index(req, res) {
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

function show(req, res) {
  const id = req.params.id;
  const sql1 = "SELECT * FROM posts WHERE id = ?";
  const sql2 =
    "SELECT tags.* FROM posts JOIN post_tag ON post_tag.post_id = posts.id JOIN tags ON tags.id = post_tag.tag_id WHERE posts.id = ?";

  connection.query(sql1, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Posts not found" });

    const post = results[0];
    connection.query(sql2, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      if (results.length === 0)
        return res.status(404).json({ error: "Tags not found" });
      post.tags = results;
      res.json(post);
    });
  });
}

function store(req, res) {
  console.log(req.body);
  const { name, author, state, img, content, tags } = req.body;
  const newPost = {
    id: posts.at(-1).id + 1,
    name: name,
    author: author,
    state: state,
    img: img,
    content: content,
    tags: tags,
  };
  posts.push(newPost);
  res.json(posts);
}

function update(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    const err = Error("Inserisci un numero");
    err.code = 400;
    throw err;
  }

  const postSelected = posts.find((post) => post.id === parseInt(id));

  if (postSelected) {
    const { name, author, state, img, content, tags } = req.body;
    postSelected.name = name;
    postSelected.author = author;
    postSelected.state = state;
    postSelected.img = img;
    postSelected.content = content;
    postSelected.tags = tags;
    res.json(postSelected);
  } else {
    const err = Error("Post non trovato");
    err.code = 404;
    throw err;
  }
}

function modify(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    const err = Error("Inserisci un numero");
    err.code = 400;
    throw err;
  }

  const postSelected = posts.find((post) => post.id === parseInt(id));

  if (postSelected) {
    const { name, author, state, img, content, tags } = req.body;
    postSelected.name = name;
    postSelected.author = author;
    postSelected.state = state;
    postSelected.img = img;
    postSelected.content = content;
    postSelected.tags = tags;
    res.json(postSelected);
  } else {
    const err = Error("Post non trovato");
    err.code = 404;
    throw err;
  }
}

function destroy(req, res) {
  const { id } = req.params;

  connection.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete post" });
    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, modify, destroy };
