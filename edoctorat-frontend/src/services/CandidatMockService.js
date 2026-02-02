const STORAGE_KEY_CANDIDAT = 'edoctorat_candidat_info';
const STORAGE_KEY_DIPLOMES = 'edoctorat_candidat_diplomes';



const MOCK_SUJETS = [
  { id: 1, titre: "Optimisation des réseaux de neurones pour l'embarqué", description: "Étude des techniques de quantification pour réduire la taille des modèles Deep Learning sur Raspberry Pi.", prof: "Pr. Alami Ahmed", lab: "L1", cedoc: "C1" },
  { id: 2, titre: "Blockchain et sécurité des données médicales", description: "Mise en place d'une architecture décentralisée pour le partage sécurisé des dossiers patients.", prof: "Pr. Benani Sara", lab: "L1", cedoc: "C1" },
  { id: 3, titre: "Analyse prédictive du trafic urbain par IA", description: "Utilisation des séries temporelles pour prédire les embouteillages à Casablanca.", prof: "Pr. Daoudi Karim", lab: "L2", cedoc: "C1" },
  { id: 4, titre: "Traitement automatique du langage naturel (Darija)", description: "Création d'un corpus et d'un modèle NLP pour l'analyse de sentiments en dialecte marocain.", prof: "Pr. El Fassi Youssef", lab: "L2", cedoc: "C1" },
  { id: 5, titre: "Smart Grids et énergies renouvelables", description: "Algorithmes de gestion intelligente pour l'intégration du solaire dans le réseau électrique.", prof: "Pr. Moussaoui Laila", lab: "L3", cedoc: "C2" },
  { id: 6, titre: "Chimie verte et matériaux durables", description: "Synthèse de nouveaux polymères biodégradables à partir de déchets agricoles.", prof: "Pr. Kadiri Omar", lab: "L4", cedoc: "C2" },
];

export const CandidatService = {
  // Simule la récupération des infos (GET)
  getInfoPerso: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(STORAGE_KEY_CANDIDAT);
        resolve(data ? JSON.parse(data) : null);
      }, 300);
    });
  },

  // Simule la sauvegarde (POST/PUT)
  saveInfoPerso: async (candidatData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const dataWithId = { ...candidatData, id: 12345 }; // Simule un ID
        localStorage.setItem(STORAGE_KEY_CANDIDAT, JSON.stringify(dataWithId));
        console.log("Mock API: Saved Info", dataWithId);
        resolve(dataWithId);
      }, 600);
    });
  },

  // Récupérer les diplômes
  getDiplomes: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = localStorage.getItem(STORAGE_KEY_DIPLOMES);
        resolve(list ? JSON.parse(list) : []);
      }, 300);
    });
  },

  // Ajouter un diplôme
  addDiplome: async (diplomeData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentList = JSON.parse(localStorage.getItem(STORAGE_KEY_DIPLOMES) || '[]');
        const newDiplome = { ...diplomeData, id: Date.now() }; // ID unique
        const updatedList = [...currentList, newDiplome];
        
        localStorage.setItem(STORAGE_KEY_DIPLOMES, JSON.stringify(updatedList));
        resolve(newDiplome);
      }, 500);
    });
  },
  getSujets: async (cedocId, labId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filtrage simple pour la démo
        // En vrai, c'est le backend qui filtre
        const results = MOCK_SUJETS.filter(s => 
           (cedocId ? s.cedoc === cedocId : true) && 
           (labId ? s.lab === labId : true)
        );
        resolve(results);
      }, 500);
    });
  },
  getMyCandidatures: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { 
            id: 101, 
            titre: "Optimisation des réseaux de neurones pour l'embarqué", 
            prof: "Pr. Alami Ahmed", 
            cedoc: "Sciences et Techniques",
            date: "2025-10-15", 
            etat: "EN_ATTENTE" 
          },
          { 
            id: 102, 
            titre: "Blockchain et sécurité des données médicales", 
            prof: "Pr. Benani Sara", 
            cedoc: "Sciences et Techniques",
            date: "2025-10-16", 
            etat: "REFUSE" 
          }
        ]);
      }, 600);
    });
  },

  // 2. Simule l'envoi d'un message de contact
  sendMessage: async (messageData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Message envoyé au support:", messageData);
        resolve({ success: true });
      }, 800);
    });
  }
};