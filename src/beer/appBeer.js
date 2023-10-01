import express from "express";
import admin from 'firebase-admin';
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import serviceAccount from "./firebaseKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aquidev-5f229-default-rtdb.firebaseio.com"
});

const app = express();
app.use(express.json());

const db = admin.firestore();  

app.get('/beers', async (request, response) => {
    const jwt = request.headers.authorization;
    if (!jwt) {
        response.status(401).json({ message: "Usuário não autorizado" });
        return;
    }

    let decodedId = "";
    try {
        decodedId = await admin.auth().verifyIdToken(jwt, true);
    } catch (e) {
        response.status(401).json({ message: "Usuário não autorizado" });
        return;
    }

    console.log('GET beers');
    db.collection('beers')
        .where('user.uid', '==', decodedId.uid)  
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            const beers = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
            response.json(beers);  
        })
});

function validateBeer(req, res, next) {
    const { data, abv, nome, id, ibu, tipo, uid } = req.body;

    if (!data || !abv || !nome || !id || !ibu || !tipo || !uid) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    next();
}

app.post('/beers', validateBeer, async (req, res) => {
    try {
        const { data, abv, nome, id, ibu, tipo, uid } = req.body;
        const docRef = await addDoc(collection(db, 'beers'), {
            data,
            abv,
            nome,
            id,
            ibu,
            tipo,
            uid,
        });

        console.log('Cerveja adicionada com ID:', docRef.id);

        res.status(201).json({ id: docRef.id });
    } catch (error) {
        console.error('Erro ao adicionar cerveja:', error);
        res.status(500).send('Erro interno ao adicionar cerveja');
    }
});

app.put('/beers/:id', validateBeer, async (req, res) => {
    try {
        const beerId = req.params.id;
        const { data, abv, nome, id, ibu, tipo, uid } = req.body;

        // Atualizar os dados da cerveja no Firestore usando o id
        await updateDoc(doc(db, 'beers', beerId), {
            data,
            abv,
            nome,
            id,
            ibu,
            tipo,
            uid,
        });

        res.status(200).send('Cerveja atualizada com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar cerveja:', error);
        res.status(500).send('Erro interno ao atualizar cerveja');
    }
});

app.delete('/beers/:id', validateBeer, async (req, res) => {
    try {
        const beerId = req.params.id;

        // Exclua a cerveja do Firestore usando o ID
        await deleteDoc(doc(db, 'beers', beerId));

        res.status(200).send('Cerveja excluída com sucesso');
    } catch (error) {
        console.error('Erro ao excluir cerveja:', error);
        res.status(500).send('Erro interno ao excluir cerveja');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API iniciada em http://${port}`));
