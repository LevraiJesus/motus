    //liste de mots possibles parmi lesquels un mot sera choisi au hasard
    const mots = ["risque", "actuel", "cheval", "paquet", "examen", "buveur", "cabine"];
    
    //choisir un mot aleatoirement dans la liste
    const motChoisi = mots[Math.floor(Math.random() * mots.length)];
    
    //definir le nombre maximum d'essais
    const maxEssais = 6;
    let essai = 0; //compteur d'essais

    //on recupere les ID dans l'HTML
    const jeu = document.getElementById('jeu');
    const proposition = document.getElementById('proposition');
    const boutonValider = document.getElementById('valider');
    const message = document.getElementById('message');

    //fonction pour creer le plateau de jeu avec des cases vides pour chaque lettre
    function creerPlateau() {
        for (let i = 0; i < maxEssais; i++) {
            for (let j = 0; j < motChoisi.length; j++) {
                const lettreElement = document.createElement('div');
                lettreElement.classList.add('lettre'); //pour le css
                jeu.appendChild(lettreElement);
                
                //afficher la premiere lettre du mot sur la premiere ligne
                if (j === 0) {
                    lettreElement.textContent = motChoisi[0];
                    lettreElement.classList.add('correct');
                }
            }
        }
    }

    //fonction pour verifier la proposition de l'utilisateur
    function verifierProposition(guess) {
        const lettres = jeu.querySelectorAll('.lettre'); // selectionner toutes les cases de lettres
        const debut = essai * motChoisi.length;

        //compare chaque lettre de la proposition avec le mot choisi
        for (let i = 0; i < guess.length; i++) {
            const lettreElement = lettres[debut + i];
            const lettre = guess[i];

            //la lettre est a la bonne position
            if (lettre === motChoisi[i]) {
                lettreElement.textContent = lettre;
                lettreElement.classList.add('correct');
            } 
            //la lettre n'est pas au bon endroit
            else if (motChoisi.includes(lettre)) {
                lettreElement.textContent = lettre;
                lettreElement.classList.add('mauvaisEndroit');
            } 
            //la lettre n'est pas dans le mot
            else {
                lettreElement.textContent = lettre;
                lettreElement.classList.add('faux');
            }
        }

        //message si gagner
        if (guess === motChoisi) {
            message.textContent = "Félicitations ! Vous avez trouvé le mot !";
        } 
        //message quand perdu
        else if (essai >= maxEssais - 1) {
            message.textContent = `Vous avez perdu ! Le mot était : ${motChoisi}`;
        }

        essai++;
    }

    boutonValider.addEventListener('click', function() {
        const propositionValeur = proposition.value.toLowerCase(); //passe le mot en minuscule

        verifierProposition(propositionValeur);
        proposition.value = '';
    });

    //nitialiser le plateau de jeu
    creerPlateau();
