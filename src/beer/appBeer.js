import express from "express";
import admin from 'firebase-admin';
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import serviceAccount from './serviceAccount.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aquidev-5f229-default-rtdb.firebaseio.com"
});

const app = express();
app.use(express.json());

const db = admin.firestore();  

//função de pegar apenas um item do banco de dados. 
//Funciona mas só se não tiver a autentiação por jwt
app.get('/beers/:id', async (request, response) => {
    const beerId = request.params.id;

    try {
        const snapshot = await db.collection('beers').doc(beerId).get();

        const beer = {
            ...snapshot.data(),
            uid: snapshot.id
        };

        response.json(beer);
    } catch (error) {
        console.error('Erro ao obter cerveja por ID:', error);
        response.status(500).send('Erro interno ao obter cerveja por ID');
    }
});

//Função de pegar todos os itens do banco de dados, retorna 200 mas não retorna os itens
app.get('/beers',(request, response) => {
    const jwt = request.headers.authorization;
    if (!jwt) {
        response.status(401).json({ message: "Usuário não autorizado" });
        return;
    }

    try {
        admin.auth().verifyIdToken(jwt, true);
        console.log('GET beers');
         db.collection('beers')
            .orderBy('date', 'desc')
            .get()
            .then(snapshot => {
                const beers = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
                response.json(beers);
            });
    } catch (error) {
        response.status(401).json({ message: "Usuário não autorizado" });
    }
});

function validateBeer(req, res, next) {
    const { data, abv, nome, id, ibu, tipo} = req.body;

    if (!data || !abv || !nome || !id || !ibu || !tipo ) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    next();
}

app.post('/beers', validateBeer, async (req, res) => {
    try {
        const { data, abv, nome, id, ibu, tipo } = req.body;
        const docRef = await addDoc(collection(db, 'beers'), {
            data,
            abv,
            nome,
            id,
            ibu,
            tipo,
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
        const { data, abv, nome, id, ibu, tipo } = req.body;

        await updateDoc(doc(db, 'beers', beerId), {
            data,
            abv,
            nome,
            id,
            ibu,
            tipo,
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
        await deleteDoc(doc(db, 'beers', beerId));

        res.status(200).send('Cerveja excluída com sucesso');
    } catch (error) {
        console.error('Erro ao excluir cerveja:', error);
        res.status(500).send('Erro interno ao excluir cerveja');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API iniciada em http://localhost:${port}`));

