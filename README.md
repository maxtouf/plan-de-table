# Plan de Table

Une application web moderne pour gérer votre plan de table et suivre les confirmations de présence des invités.

## Fonctionnalités

- Gestion des invités (ajout, modification, suppression)
- Suivi des confirmations de présence
- Organisation des tables
- Création d'un plan de table
- Interface conviviale et responsive

## Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [MongoDB](https://www.mongodb.com/) - Base de données NoSQL
- [Mongoose](https://mongoosejs.com/) - ODM pour MongoDB
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [React Icons](https://react-icons.github.io/react-icons/) - Bibliothèque d'icônes

## Installation

1. Clonez le dépôt
```bash
git clone https://github.com/votre-username/plan-de-table.git
cd plan-de-table
```

2. Installez les dépendances
```bash
npm install
```

3. Créez un fichier `.env.local` à la racine du projet avec les variables suivantes:
```
MONGODB_URI=mongodb://localhost:27017/plan-de-table
```

4. Lancez le serveur de développement
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Déploiement

L'application peut être facilement déployée sur [Vercel](https://vercel.com) ou tout autre hébergeur supportant Next.js.

## Licence

MIT 