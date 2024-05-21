const els = {
    welcomeScreen: null,
    questionScreen: null,
    endScreen: null,
    welcomeBtn: null,
    answers: null,
    endBtn: null,
    answersContainer: null
};

let questionIndex = 0;

const questions = [{
        question: 'Quel est votre animal préféré parmi ceux-ci ?',
        answers: [{
            title: 'Lion',
            house: 'gryffondor'
        }, {
            title: 'Serpent',
            house: 'slytherin'
        }, {
            title: 'Aigle',
            house: 'ravenclaw'
        }, {
            title: 'Blaireau',
            house: 'hufflepuff'
        }]
    },
    {
        question: 'Quelle qualité valorisez-vous le plus ?',
        answers: [{
            title: 'Courage',
            house: 'gryffondor'
        }, {
            title: 'Ambition ',
            house: 'slytherin'
        }, {
            title: 'Intelligence',
            house: 'ravenclaw'
        }, {
            title: 'Loyauté',
            house: 'hufflepuff'
        }]
    },
    {
        question: 'Quelle est votre matière préférée ?',
        answers: [{
            title: 'Soins aux créatures magiques ',
            house: 'hufflepuff'
        }, {
            title: 'Défense contre les forces du Mal',
            house: 'gryffondor'
        }, {
            title: ' Sortilèges',
            house: 'ravenclaw'
        }, {
            title: 'Potions ',
            house: 'slytherin'
        }]
    },
    {
        question: ' Quel est votre plus grand défaut ?',
        answers: [{
            title: 'Timidité',
            house: 'hufflepuff'
        }, {
            title: 'Témérité',
            house: 'gryffondor'
        }, {
            title: 'Arrogance',
            house: 'ravenclaw'
        }, {
            title: 'Manipulation',
            house: 'slytherin'
        }]
    },
    {
        question: 'Quel est ton animal magique favori ?',
        answers: [{
            title: 'Hippogriffe',
            house: 'hufflepuff'
        }, {
            title: 'Phénix',
            house: 'gryffondor'
        }, {
            title: 'Sombral',
            house: 'ravenclaw'
        }, {
            title: 'Dragon',
            house: 'slytherin'
        }]
    },
    {
        question: 'Quel genre de livre préférez-vous ?',
        answers: [{
            title: 'Livres sur la nature et les animaux',
            house: 'hufflepuff'
        }, {
            title: 'Aventures palpitantes',
            house: 'gryffondor'
        }, {
            title: 'Livres de sciences et de découverte',
            house: 'ravenclaw'
        }, {
            title: 'Livres de stratégie et de manipulation',
            house: 'slytherin'
        }]
    },
    {
        question: ' Quelle est votre réaction face à l injustice ?',
        answers: [{
            title: ' Je protège ceux qui sont lésés sans attirer l attention sur moi',
            house: 'hufflepuff'
        }, {
            title: 'Je me bats contre elle, peu importe les risques',
            house: 'gryffondor'
        }, {
            title: 'Je cherche à comprendre et à résoudre le problème',
            house: 'ravenclaw'
        }, {
            title: 'Je cherche à en tirer profit',
            house: 'slytherin'
        }]
    },
    {
        question: 'Quelle est votre couleur préférée parmi celles-ci',
        answers: [{
            title: 'Jaune',
            house: 'hufflepuff'
        }, {
            title: 'Rouge',
            house: 'gryffondor'
        }, {
            title: 'Bleu',
            house: 'ravenclaw'
        }, {
            title: 'Vert',
            house: 'slytherin'
        }]
    },
    {
        question: 'Que faites-vous en premier dans une situation dangereuse ?',
        answers: [{
            title: 'Je cherche à protéger ceux qui sont autour de moi',
            house: 'hufflepuff'
        }, {
            title: 'Je fonce tête baissée pour aider',
            house: 'gryffondor'
        }, {
            title: ' J analyse la situation et je cherche la meilleure solution',
            house: 'ravenclaw'
        }, {
            title: 'Je cherche le moyen de tirer avantage de la situation',
            house: 'slytherin'
        }]
    },
];

const recordedAnswers = [];



const init = () => {
    console.log('Page has loaded');

    els.welcomeScreen = document.querySelector('.welcome-screen');
    els.questionScreen = document.querySelector('.question-screen');
    els.endScreen = document.querySelector('.end-screen');
    els.welcomeBtn = els.welcomeScreen.querySelector('button');
    els.endBtn = els.endScreen.querySelector('button');
    els.answersContainer = els.questionScreen.querySelector('ul');

    els.welcomeBtn.addEventListener('click', () => {
        displayScreen('question');
        displayQuestion(questionIndex);
    });
    els.endBtn.addEventListener('click', () => {
        displayScreen('welcome');
        questionIndex = 0;
    });

    els.answersContainer.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
            return;
        }
        const house = target.getAttribute('data-house');
        recordedAnswers.push(house);

        questionIndex++;

        if (questionIndex >= questions.length) {
            calculateScore();
            displayScreen('end');
        } else {
            displayQuestion(questionIndex);
        }
    });

};

const calculateScore = () => {
    const house = recordedAnswers.sort((a, b) => {
        return recordedAnswers.filter(answer => answer === a).length - 
        recordedAnswers.filter(answer => answer === b).length 
    }).pop();
    // console.log('house', house);

    const houseInFrench = {
        slytherin: 'Serpentard',
        hufflepuff: 'Poufsouffle',
        ravenclaw: 'Serdaigle',
        gryffondor: 'Gryffondor'
    };

    els.endScreen.querySelector('span').textContent = houseInFrench[house];
};

const displayQuestion = (index) => {

    const currentQuestion = questions[index];

    const questionEl = els.questionScreen.querySelector('h2');

    const answerEls = currentQuestion.answers.map((answer) => {
        const liEl = document.createElement('li');
        liEl.textContent = answer.title;
        liEl.setAttribute('data-house', answer.house);
        return liEl;
    });

    questionEl.textContent = currentQuestion.question;
    els.answersContainer.textContent = '';
    els.answersContainer.append(...answerEls);
};

const displayScreen = (screenName) => {
    // console.log('screenName', screenName);
    els.welcomeScreen.style.display = 'none';
    els.questionScreen.style.display = 'none';
    els.endScreen.style.display = 'none';

    const screen = els[screenName + 'Screen'];
    // console.log('screen', screen);
    screen.style.display = 'flex';
};


window.addEventListener('load', init);