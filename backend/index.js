// app.js
const express = require('express');
const mongoose = require('mongoose');

// const { MongoClient } = require('mongodb');

const { MongoClient, ServerApiVersion } = require('mongodb');


const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

const userEmail = 'nodegasydev@outlook.fr';
const mdpEmail = '$_&narija12*34#5';

app.use(express.json());

// const urBaseFront = 'http://localhost:4200';
 const urBaseFront = 'https://mean-22e66.web.app';

app.use(cors({
    origin: urBaseFront, 
    optionsSuccessStatus: 200, 
}));


const connectDB = async () => {
    try {
        // const uri = 'mongodb://127.0.0.1:27017/mean';
         const uri = "mongodb+srv://narija1234:narija1234@cluster0.atwh85b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

        const connex = await mongoose.connect(uri);
        if (connex) {
            console.error('CONNECT TO DATABASE SUCCESS');
        } else {
            console.error('COULD NOT CONNECT TO DATABASE');
        }
        
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

// Define resetTokenSchema schema and model
const resetTokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: true
    },
    resetExpire: {
        type: Date,
        required: true
    }
});

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);

app.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const resetToken = new ResetToken({
            userId: user._id,
            resetPasswordToken: token,
            resetExpire: Date.now() + 3600000
        });

        await resetToken.save();

        // Configurer le transport pour le serveur SMTP de Yahoo
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: userEmail,
                pass: mdpEmail
            },
        });

        const mailOptions = {
            from: userEmail,
            to: user.email,
            subject: 'Réinitialisation du mot de passe',
            html: `Bonjour, <br><br>
            Cliquez sur le lien pour procéder à la réinitialisation de votre mot de passe 
            <br> 
            <a style="" href="${urBaseFront}/#/reset-password/${token}">cliquez ici</a>. 
            <br>
            Le lien arrivera à expiration dans un délai d'une heure maximum.
            <br><br>Merci.`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: "Échec lors de l'envoi de l'email de réinitialisation." });
            } else {
                return res.status(200).json({ message: 'L\'email pour réinitialiser votre mot de passe a été envoyé avec succès.' });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Ajoutez la route pour envoyer l'email de réinitialisation
app.post('/reset-password', async (req, res) => {
    try {
        const { password, tokenReset } = req.body;
        const resetToken = await ResetToken.findOne({ resetPasswordToken:tokenReset});

        if (!resetToken) {
            return res.status(404).json({ message: 'Token non trouvé.' });
        } 

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(resetToken.userId, {password: hashedPassword});
        if (!user) {
            return res.status(404).json({ message: 'User non trouvé.' });
        }

        await ResetToken.findByIdAndDelete(resetToken._id);
        return res.status(200).json({ message: 'User update success.' });

    } catch (err) {
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        if (filterRole) {
            const total = await User
                .find({role: filterRole});

            const users = await User
                .find({role: filterRole})
                .skip((page - 1) * limit)
                .limit(limit);
            res.json({
                rows:users,
                total: total.length,
                page
            });

        } else if (filterNom && filterNom == 'nom') {
            const searchValue = req.query.searchValue;
            const total = await User
                .find({
                    $or: [
                    { nom: { $regex: new RegExp(searchValue, 'i') } },
                    { prenom: { $regex: new RegExp(searchValue, 'i') } }
                    ]
                });

            const users = await User
                .find({
                    $or: [
                    { nom: { $regex: new RegExp(searchValue, 'i') } },
                    { prenom: { $regex: new RegExp(searchValue, 'i') } }
                    ]
                })
                .skip((page - 1) * limit)
                .limit(limit);
            res.json({
                rows:users,
                total: total.length,
                page
            });

        } else {
            const total = await User.find();
            const users = await User
                .find()
                .skip((page - 1) * limit)
                .limit(limit);
            res.json({
                rows:users,
                total: total.length,
                page
            });
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
        // required: true,
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        // const searchFields = req.query.searchFields;

        if (filterNom) {
            const total = await Service
                .find({nom: { $regex: new RegExp(filterNom, 'i') } });

            const services = await Service
                .find({nom: { $regex: new RegExp(filterNom, 'i') } })
                .skip((page - 1) * limit)
                .limit(limit);

            res.json({
                rows: services,
                total: total.length,
                page
            });
        } else {
            const total = await Service.find();
            const services = await Service
                .find()
                .skip((page - 1) * limit)
                .limit(limit);

            res.json({
                rows: services,
                total: total.length,
                page
            });

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
        // required: true,
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
        // required: false,
    },
    email:{
        type: String,
        // required: false,
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
        // Ajouter depuis front client
        if (req.body && req.body.nom && req.body.email) {
            const { nom, email } = req.body;
            // const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ nom, email, role: 'client' });
            let client = await newUser.save();

            const employer = await User.findById(req.body.employer);
            const service = await Service.findById(req.body.service);

            let { date, heure, status, tarifs, payement, note, notifictionId } = req.body;

            let newRendezvous = new Rendezvous({ client, employer, service, date, heure, note, status, tarifs, payement, notifictionId});
            await newRendezvous.save();
            res.status(201).json(newRendezvous);

        } else { // Ajouter depuis BO
            let {client, employer, service, date, heure, status, tarifs, payement, note, notifictionId } = req.body;

            let newRendezvous = new Rendezvous({ client, employer, service, date, heure, note, status, tarifs, payement, notifictionId});
            await newRendezvous.save();
            res.status(201).json(newRendezvous);
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Rendez vous
app.get('/rendezvous', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const user = await User.findById(req.query.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' + req.query.limit });
        }
        let rendezvous;
        let total = 0;
        if (user.role == 'employer') {
            total = await Rendezvous.find({employer: user._id});
            rendezvous = await Rendezvous.find({employer: user._id})
                .populate(['client','service','employer'])
                .skip((page - 1) * limit)
                .limit(limit);

        } else if (user.role == 'client') {
            total = await Rendezvous.find({client: user._id});
            rendezvous = await Rendezvous.find({client: user._id})
                .populate(['client','service','employer'])
                .skip((page - 1) * limit)
                .limit(limit);

        } else {
            total = await Rendezvous.find();
            rendezvous = await Rendezvous.find()
                .populate(['client','service','employer'])
                .skip((page - 1) * limit)
                .limit(limit);
        }

        res.json({
            rows: rendezvous,
            total: total.length,
            page
        });
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