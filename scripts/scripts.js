var word;
var guessedLetters;
var tries = 5;

function startGame() {
    var words = ['testing', 'word', 'random', 'container'];
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [word[0], word[word.length-1]];
    initWord(word);

    var message = document.getElementById('message');
    message.innerHTML = '';
};

function initWord(word) {
    var wordContainer = document.getElementById('wordContainer');
    var currentWord = document.createElement('ul');
    currentWord.setAttribute('id', 'currentWord');
    for (var i = 0; i < word.length; i++) {
        var letter = document.createElement('li');
        letter.setAttribute('id', 'letter' + i);
        letter.setAttribute('class', 'letter');
        if (guessedLetters.includes(word[i]))
            letter.innerHTML = word[i];
        else
            letter.innerHTML = "_";
        currentWord.appendChild(letter);
        wordContainer.appendChild(currentWord);
    }
}

function guessLetter() {
    var message = document.getElementById('message');
    var guessedLetter = document.getElementById('guessLetter').value;
    document.getElementById('guessLetter').value = '';
    if (word.indexOf(guessedLetter) == -1 || guessedLetters.includes(guessedLetter)) {
        tries--;
        message.innerHTML = 'You have ' + tries + ' tries left.';
    }
    else {
        guessedLetters.push(guessedLetter);
        updateDisplayedWord();
    }
    checkGameOver();
}

function guessWord() {
    var guessWorded = document.getElementById('guessWord').value;
    document.getElementById('guessWord').value = '';
    if (guessWorded != word) {
        tries--;
        message.innerHTML = 'You have ' + tries + ' tries left.';
    }
    else {
        guessedLetters = word.split('').filter(function (letter, index, self) {
            return self.indexOf(letter) === index;
        });
        updateDisplayedWord();
    }
    checkGameOver();
}

function updateDisplayedWord() {
    for (var i = 0; i < word.length; i++) {
        var letter = document.getElementById('letter' + i);
        if (guessedLetters.includes(word[i]))
            letter.innerHTML = word[i];
    }
}

function checkGameOver() {
    var message = document.getElementById('message');
    if (tries == 0)
        message.innerHTML = 'You lose. Try again?';

    if (word.split('').every(function (letter) {
        return guessedLetters.includes(letter);
    }))
        message.innerHTML = 'You win!';
}

window.onload = function () {

    document.getElementById('reset').onclick = function () {
        var currentWord = document.getElementById('currentWord');
        currentWord.parentNode.removeChild(currentWord);
        startGame();
    };

    document.getElementById('guessLetterButton').onclick = function () {
        guessLetter();
    };

    document.getElementById('guessWordButton').onclick = function () {
        guessWord();
    };

    startGame();
};