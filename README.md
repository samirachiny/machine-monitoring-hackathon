# Machine Monitoring Dashboard

**Défi Full-Stack - Intelligence Industrielle**

Dashboard de surveillance en temps réel pour le monitoring des machines industrielles dans un environnement de production multi-sites.

## Lien de Déploiement

Je n'ai malheuresement pas pu le finaliser

## Description du Projet

Cette application web permet de visualiser et monitorer :
- **Sites industriels** (usines) avec leur localisation
- **Départements** de production par site  
- **Machines** avec leur statut en temps réel
- **Métriques de performance** (efficacité, température, maintenance)

### Fonctionnalités Principales

 **Vue Hiérarchique** : Site → Département → Machine  
 **Vue Grille** : Toutes les machines en un coup d'œil  
 **Filtres Avancés** : Par statut, type de machine, recherche textuelle  
 **Détails Interactifs** : Modal avec informations complètes de chaque machine  
 **Statistiques Temps Réel** : KPIs globaux et indicateurs de performance  
 **Design Responsive** : Optimisé mobile et desktop  
 **Interface Intuitive** : Codes couleurs pour les statuts, badges visuels

## Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **Déploiement** : Vercel, mais n'a pas pu être terminé correctement

### Vue Hiérarchique
- Organisation claire par sites et départements
- Cartes machines avec statuts visuels
- Filtres intégrés en temps réel

### Vue Grille
- Affichage compact de toutes les machines
- Tri et filtrage avancé
- Métriques de performance instantanées

## Types de Données

```typescript
interface Machine {
  id: string;
  name: string;
  type: 'CNC' | 'Robot' | 'Presse' | 'Convoyeur' | 'Four';
  status: 'running' | 'idle' | 'maintenance' | 'error';
  efficiency: number; // 0-100%
  temperature?: number; // °C
  lastMaintenance: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  machines: Machine[];
}

interface Site {
  id: string;
  name: string;
  location: string;
  departments: Department[];
}
```

## Installation et Test Local

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash

git clone https://github.com/samirachiny/machine-monitoring.git
cd machine-monitoring

npm install

npm run dev
```

### Accès Local
Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## Utilisation

### Navigation
1. **Tableau de Bord** : Statistiques globales en haut
2. **Filtres** : Recherche, statut, type de machine
3. **Vues** : Basculer entre hiérarchie et grille
4. **Détails** : Cliquer sur une machine pour plus d'infos

### Filtres Disponibles
- **Statut** : En marche, En attente, Maintenance, Erreur
- **Type** : CNC, Robot, Presse, Convoyeur, Four  
- **Recherche** : Nom de machine (temps réel)

### Codes Couleurs
- **Vert** : Machine en marche
- **Jaune** : En attente  
- **Bleu** : Maintenance programmée
- **Rouge** : Erreur/Panne

## Fonctionnalités Bonus Implémentées

- **Statistiques Dynamiques** : Calculs en temps réel
- **Recherche Instantanée** : Filtre au fur et à mesure de la saisie
- **Animations Fluides** : Transitions et hover effects
- **Modal Responsive** : Détails complets avec fermeture intuitive
- **Indicateurs Visuels** : Barres de progression d'efficacité
- **Design System** : Cohérence visuelle et UX

## Choix Techniques Justifiés

### Next.js + TypeScript
- Performance et SEO optimisés
- Type safety pour éviter les erreurs
- Architecture scalable

### Tailwind CSS  
- Développement rapide
- Design system intégré
- Responsive natif

### Structure Componentisée
- Réutilisabilité maximale
- Maintenance facilitée
- Tests unitaires possibles


### Variables d'Environnement
Aucune variable requise - données mock intégrées pour la démo.

## Développement

### Scripts Disponibles
```bash
npm run dev      # Développement local
npm run build    # Build de production  
npm run start    # Serveur de production
npm run lint     # Vérification du code
```

### Structure du Projet
```
src/
├── app/           # Next.js App Router
├── components/    # Composants React réutilisables
├── types/         # Définitions TypeScript
└── data/          # Données mock
```

## Prochaines Améliorations

- [ ] Graphiques de performance historique
- [ ] Notifications push pour les pannes
- [ ] Export des données en CSV/PDF
- [ ] API REST pour données temps réel
- [ ] Mode sombre
- [ ] Internationalisation (i18n)

## Contact
samira-chiny.folefack-temfack@.etud.polymtl.ca

**Développé pour Intelligence Industrielle**  
Hackathon Full-Stack Challenge

---

*Créé TypeScript + Next.js par Samira Folefack*
