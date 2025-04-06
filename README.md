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
- [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage) - Stockage local côté client
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [React Icons](https://react-icons.github.io/react-icons/) - Bibliothèque d'icônes

## Installation

1. Clonez le dépôt
```bash
git clone https://github.com/maxtouf/plan-de-table.git
cd plan-de-table
```

2. Installez les dépendances
```bash
npm install
```

3. Lancez le serveur de développement
```bash
npm run dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## À propos du stockage des données

Cette application utilise le stockage local (localStorage) du navigateur pour stocker toutes les données. Cela signifie que :
- Les données sont persistantes entre les sessions de navigation
- Les données sont stockées uniquement sur le navigateur de l'utilisateur
- Les données ne sont pas synchronisées entre différents appareils
- Les données peuvent être perdues si l'utilisateur efface le cache de son navigateur

Cette approche est idéale pour tester l'application en local sans avoir besoin de configurer une base de données.

## Déploiement

L'application peut être facilement déployée sur [Vercel](https://vercel.com) ou tout autre hébergeur supportant Next.js.

## Licence

MIT 