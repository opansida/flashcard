import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { SetsRecord, getXataClient } from './xata';
import { cardsCapitals, cardsProgramming, sets } from './seed_database';
import { Request, Response } from 'express';

dotenv.config();

const {PORT} = process.env || 3000;

const app = express();
app.use(express.json({limit: '50mb'}));

const client = getXataClient();

app.get('/init', async(req, res) => {
    const seedSets = sets;
    const seedCardsCapitals = cardsCapitals;
    const seedCardsProgramming = cardsProgramming;

    await client.db.sets.create(seedSets);
    await client.db.cards.create(seedCardsCapitals);
    await client.db.cards.create(seedCardsProgramming);

    return res.json({ok: true});
});

// get all public sets
app.get('/sets', async(req, res) => {
    const sets = await client.db.sets
        .select(['id', 'title','description', 'image', 'cards'])
        .filter({private: false})
        .getAll();

    return res.json(sets);
});

//get a single set
app.get('/sets/:id', async (req, res) => {
    const { id } = req.params;
    const set = await client.db.sets.read(id);
    return res.json(set);
  });

// create a new set
app.post('/sets', async (req, res) => {
    const { title, description, private: isPrivate, creator, image } = req.body;
  
    // result image emptiness or non-existence, arrangement of empty numbers
    const imageFiles = image ? [{ base64Content: image, mediaType: 'image/png' }] : [];
  
    try {
      const set = await client.db.sets.create({
        title,
        description,
        private: isPrivate,
        creator,
        image: imageFiles,
      });
  
      console.log('set: ', set);
      return res.json(set);
    } catch (error) {
      console.error('Error creating set:', error);
      return res.status(500).json({ error: 'Failed to create set' });
    }
  });
  
//add a favorite set
app.post('/usersets', async (req, res) => {
    const { user, set } = req.body;
    const userSet = await client.db.user_sets.create({
      user,
      set,
    });
    return res.json(userSet);
  });

// get all user sets
app.get('/usersets', async (req, res) => {
    const { user } = req.query;
  
    const sets = await client.db.user_sets
      .select(['id', 'set.*'])
      .filter({ user: `${user}` })
      .getAll();
    return res.json(sets);
  });

//remove a set
app.delete('/sets/:id', async (req, res) => {
    const { id } = req.params;
    const existingSets = await client.db.user_sets.filter({ set: id }).getAll();
  
    if (existingSets.length > 0) {
        const toDelete = existingSets.map((set: SetsRecord) => set.id);
        await client.db.user_sets.delete(toDelete);
    }
    await client.db.sets.delete(id);
  
    return res.json({ success: true });
  });
  
//make a new card
app.post('/cards', async (req, res) => {
    const { set, question, answer } = req.body;
  
    try {
      const card = await client.db.cards.create({
        set,
        question,
        answer,
      });
  
      if (card) {
        await client.db.sets.update(set, {
          cards: {
            $increment: 1,
          },
        });
      }
      return res.json(card);
    } catch (error: any) {
        console.error('Error creating card:', error);
        return res.status(500).json({ error: 'Failed to create card', details: error.message });
    }
  });

//get all cards of a set
app.get('/cards', async (req, res) => {
    const { setid } = req.query;
    const cards = await client.db.cards.select(['*', 'set.*']).filter({ set: setid }).getAll();
    return res.json(cards);
  });

// learn a specific number of cards from a set
app.get('/cards/learn', async (req, res) => {
    const { setid, limit } = req.query;
  
    try {
      const cards = await client.db.cards
        .select(['question', 'answer', 'image'])
        .filter({ set: setid })
        .getAll();
  
 // get a random set of cards using limit
      const randomCards = cards
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, +limit!);
  
      return res.json(randomCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
      return res.status(500).json({ error: 'Failed to fetch cards' });
    }
  });
// start learning progress
app.post('/learnings', async (req, res) => {
    const { user, set, cardsTotal, correct, wrong } = req.body;
    const obj = {
      user,
      set,
      cards_total: +cardsTotal,
      cards_correct: +correct,
      cards_wrong: +wrong,
      score: (+correct / +cardsTotal) * 100,
    };
    const learning = await client.db.learnings.create(obj);
    return res.json(learning);
  });
  
  // get user learning progress
  app.get('/learnings', async (req, res) => {
    const { user } = req.query;
    const learnings = await client.db.learnings
      .select(['*', 'set.*'])
      .filter({ user: `${user}` })
      .getAll();
    return res.json(learnings);
  });
   
// update learning progress
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // 确保路径正确
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 保持文件的原始扩展名
  }
});

const upload = multer({ storage: storage });

// ensure the path is correct
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
 // 确保路径正确

// upload the file
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // 记录上传的文件信息
  res.json({ file: req.file });
});

// read the file
app.get('/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename); // 确保路径的正确性
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});



// list all  PDF 
app.get('/pdfs', (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Failed to read directory' });
    }

    // filter PDF 
    const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
    res.json(pdfFiles);
  });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
