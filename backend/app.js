// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// app.use(cors());

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', 
    optionsSuccessStatus: 200, 
  }));

const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb://127.0.0.1:27017/mean'
    // const uri = 'mongodb+srv://narija:narija1234@cluster0.mongodb.net/mean';
    //const uri = 'mongodb+srv://narija:narija1234@cluster0.epn5jqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
   // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }
    //   , { useNewUrlParser: true, useUnifiedTopology: true }
      );
      console.error('CONNECT TO DATABASE:', conn);
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}

connectDB();

// Define user schema and model
const userSchema = new mongoose.Schema({
    nom :{
        type: String,
        required: true,
    },
    prenom :{
        type: String,
        // required: true,
    },
    telephone :{
        type: String,
        required: false,
    },
    email :{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
      },
    role: {
        type: String,
        enum: ['client', 'employer', 'manager'], 
        // default: 'client', 
      },
  
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).send({message :"Login ou mot de passe incorrect"});
        } 
        
        const passwordMacth = await bcrypt.compare(password, user.password);
        if (!passwordMacth) {
            res.status(404).send({message : "Login ou mot de passe incorrect"});
        } else {
            const token = jwt.sign({ userId: user.id, nom: user.nom, prenom:user.prenom, telephone:user.telephone, email:user.email, role:user.role  }, 'your_secret_key', { expiresIn: '1h' });
            const tokenExpiration = new Date().getTime() + 3600 * 1000; 
            res.json({ token, tokenExpiration, user });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});
  
  // Protected route
app.get('/protected', (req, res) => {
    // Middleware to check the token before accessing the protected route
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
  
      // Token is valid, you can proceed with the protected logic
      res.json({ message: 'Protected route accessed successfully', user: decoded });
    });
  });

const User = mongoose.model('User', userSchema);

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { nom, prenom, telephone, email, role, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ nom, nom, prenom, telephone, email, role, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        // erreur email dupliqué
        if (err.code === 11000 && err.keyPattern.email) {
            return res.status(400).json({ message: 'L\'email existe déjà.', code: err.code });
        }
        res.status(500).json({ message: err.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const filterRole = req.query.role;
        const filterNom = req.query.searchFields;

        if (filterRole) {
            const users = await User.find({role: filterRole});
            res.json(users);
        } else if (filterNom && filterNom == 'nom') {
            const searchValue = req.query.searchValue;
            const users = await User.find({
                $or: [
                { nom: { $regex: new RegExp(searchValue, 'i') } },
                { prenom: { $regex: new RegExp(searchValue, 'i') } }
                ]
            });
            res.json(users);
        } else {
            const users = await User.find();
            res.json(users);
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user by id
app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: 'User not found'  });
    }
});

// Delete user endpoint
app.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting user' });
    }
});
  

// Endpoint pour envoyer un e-mail
app.post('/send-email', (req, res) => {
    // Récupérer les informations du formulaire
    const { to, subject, text } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'narijadev@gmail.com',
        pass: 'narija12*34',
    },
    });

    // Email options
    const mailOptions = {
        from: 'narijadev@gmail.com',
        to: 'narijamiarintsoa@gmail.com',
        subject: 'Test Email send',
        text: 'Hello, this is a test email from Node.js!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send('Erreur lors de l\'envoi de l\'e-mail.');
        } else {
          console.log('E-mail envoyé : ' + info.response);
          res.send('E-mail envoyé avec succès.');
        }
    });
});




// Define service schema and model
const serviceSchema = new mongoose.Schema({
    nom :{
        type: String,
        required: true,
    },
    description :{
        type: String,
        required: true,
    },
    delai :{
        type: String,
        required: true,
    },
    prix :{
        type: String,
        required: true,
    },
    image :{
        type: String,
        required: true,
    },
});

const Service = mongoose.model('Service', serviceSchema);
// Create a new service
app.post('/service', async (req, res) => {
    try {
        const { nom, prenom, description, delai, prix, image } = req.body;

        const newService = new Service({ nom, prenom, description, delai, prix, image });
        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all services
app.get('/services', async (req, res) => {
    try {

        const filterNom = req.query.searchValue;
        // const searchFields = req.query.searchFields;
        if (filterNom) {
            const services = await Service.find({nom: { $regex: new RegExp(filterNom, 'i') } });
            res.json(services);
        } else {
            const services = await Service.find();
            res.json(services);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get service by id
app.get('/service/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (err) {
        res.status(404).json({ message: 'Service not found'  });
    }
});
// Delete user endpoint
app.delete('/service/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedService = await Service.findByIdAndDelete(id);
  
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      return res.status(200).json({ message: 'Service deleted successfully', deletedService });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting Service' });
    }
});
  
// Define service schema and model
const rendezvousSchema = new mongoose.Schema({
    client :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    employer :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    service :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    },
    status :{
        type: String,
    },
    tarifs :{
        type: String,
        required: true,
    },
    payement :{
        type: String,
        required: false,
    },
    note :{
        type: String,
        required: true,
    },
    date :{
        type: String,
        required: true,
    },
    heure :{
        type: String,
        required: true,
    },
    notifictionId:{
        type: String,
        required: false,
    },
    nom:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: false,
    },
    // client: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
});
const Rendezvous = mongoose.model('Rendezvous', rendezvousSchema);
// Create a new Rendez vous
app.post('/rendezvous', async (req, res) => {
    try {

        const { nom, email } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ nom, email, role: 'client' });
        let client = await newUser.save();

        const { employer, service, date, heure, status, tarifs, payement, note, notifictionId } = req.body;

        const newRendezvous = new Rendezvous({ client, employer, service, date, heure, note, status, tarifs, payement, notifictionId ,nom , email});
        await newRendezvous.save();
        res.status(201).json(newRendezvous);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Rendez vous
app.get('/rendezvous', async (req, res) => {
    try {
        const rendezvous = await Rendezvous.find().populate(['client','service','employer']);

        res.json(rendezvous);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get rendez vous by id
app.get('/rendezvous/:id', async (req, res) => {
    try {
        const rendezvous = await Rendezvous.findById(req.params.id);
        if (!rendezvous) {
            return res.status(404).json({ message: 'Rendez vous not found' });
        }
        res.json(rendezvous);
    } catch (err) {
        res.status(404).json({ message: 'Rendez vous not found'  });
    }
});

// home route
app.get('/', (req, res) => {
  res.send('Home ...');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});