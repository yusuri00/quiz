'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const images =   document.getElementById('images');


  const quizSet = shuffle([
    {q: 'これは何の生き物でしょう?', c: ['キツネ', 'ヘビ', 'ライオン'],i: "img1.png"},
    {q: 'これは何の生き物でしょう?', c: ['ふくろう', 'ネコ', 'カラス'],i: "img2.png"},
    {q: 'これは何の生き物でしょう?', c: ['ヘビ', 'モグラ', 'いぬ'],i: "img3.png"},
    {q: 'これは何の生き物でしょう?', c: ['うさぎ', 'トリ', 'キツネ'],i: "img4.png"},
    {q: 'これは何の生き物でしょう?', c: ['ゾウ', 'うさぎ', 'トラ'],i: "img5.png"},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    let imgPath = "img/" + quizSet[currentNum].i;
    document.querySelector('#images img').src = imgPath;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = '結果を見る';
    }


  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = ` ${quizSet.length}門中${score}門正解`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
