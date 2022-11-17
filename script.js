runApp();

function runApp() {
  alert(`Привет! Добро пожаловать в "Игромат (3 в 1)."`);
  while (true) {
    let numberOfGame = chooseGame(); // функция выбора функций, которая возвращает функцию
    if (numberOfGame === null) {
      //пустое значение
      break;
    }
    alert(`Игра запускается...`);
    startGame(numberOfGame); // выбор выбранного пункта
  }
  alert(`Пока, пока`);
}

function chooseGame() {
  while (true) {
    let userAnswer = prompt(`
    Выбери игру:
    1 - угадалка;
    2 - считалка;
    3 - кликалка;
    Для выхода введите "выход"
`);
    switch (userAnswer) {
      case `угадалка`:
      case `1`:
        return 1;
      case `считалка`:
      case `2`:
        return 2;
      case `кликалка`:
      case `3`:
        return 3;
      case `выход`:
        return null;
      default:
        alert(`Не правильный ввод, попробуй еще раз =(`);
    }
  }
}

function startGame(numberOfGame) {
  switch (numberOfGame) {
    case 1:
      runGessGame(); // название игры
      break;
    case 2:
      runCalcGame(); // название игры
      break;
    case 3:
      runClickGame(); // название игры
      break;
    default:
      thowGameError();
  }
}

function thowGameError() {
  alert(`Критическая ошибка`);
}

/* ======= Функции для угадалки =========*/

function runGessGame() {
  alert(`Игра "Угадалка"`);
  alert(`
  Я случайным образом загадаю число от 1 до 100.
  Твоя задача его угадать за минимальное количество попыток.
  После каждого твоего ввода я буду говорить больше твоё число или меньше загаданного.
  Начнём?
  `);
  let targetNumber = generateRandomNumber(1, 100);
  let attemptCount = 0;
  while (true) {
    attemptCount++;
    let isCorrectAnswer = askGuessGameQuest(targetNumber);
    if (isCorrectAnswer) {
      break;
    }
  }
  alert(`Teбе удалось угадать за ${attemptCount} попыток`);
}

function askGuessGameQuest(targetNumber) {
  while (true) {
    let userAnswer = +prompt("Попробуй угадать");
    if (userAnswer === targetNumber) {
      alert("Угадал");
      return true;
    }
    if (userAnswer < targetNumber) {
      alert("Слишком мало");
      return false;
    }
    if (userAnswer > targetNumber) {
      alert("Слишком много");
      return false;
    }
    alert("Неверный ввод =( ");
  }
}

function generateRandomNumber(min, max) {
  let constantForFloor = 1;
  let rangeSize = max + constantForFloor - min;
  let randomNumberInRange = Math.random() * rangeSize;
  let randomNumber = min + randomNumberInRange;
  let randomIntegerNumber = Math.floor(randomNumber);
  return randomIntegerNumber;
}

/*========== считалка ==========*/

function runCalcGame() {
  alert(`Игра "Считалка"`);
  alert(`
  Я случайным образом буду давать задание по арифметике.
  Твоя задача правильно решить 5 примеров.
  Начинаем?
  `);
  let correctAnswerCount = 0; //Количество правильных ответов
  for (let i = 1; i <= 5; i++) {
    let isCorrectAnswer = askCalcGameQuest(); // это правильный ответ - спроси игру считалку
    if (isCorrectAnswer) {
      correctAnswerCount++;
    }
  }
  alert(`Правильных ответов: ${correctAnswerCount} из 5`);
}

function askCalcGameQuest(minNumber = 0, maxNumber = 30) {
  let firstNumber = generateRandomNumber(minNumber, maxNumber);
  let secondNumber = generateRandomNumber(minNumber, maxNumber);
  let mathAction = generateRandomMathAction(); // матем. дествие
  let userAnswer = +prompt(`${firstNumber} ${mathAction} ${secondNumber}`); // ответ пользователя
  let correctAnswer = calcStringMathAction(
    firstNumber,
    mathAction,
    secondNumber
  );
  let isCorrectAnswer = userAnswer === correctAnswer; // это правильный ответ - ответ пользователя - правильный ответ
  return isCorrectAnswer; // это правильный ответ
}

function calcStringMathAction(firstNumber, mathAction, secondNumber) {
  switch (mathAction) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    /*case "/":
      return firstNumber / secondNumber;*/
    default:
      thowGameError;
  }
}

function generateRandomMathAction() {
  let randomNumber = generateRandomNumber(1, 3);
  switch (randomNumber) {
    case 1:
      return "+";
    case 2:
      return "-";
    case 3:
      return "*";
    /*case 4:
      return "/";*/
    default:
      thowGameError();
  }
}

/*========== кликалка =============*/

function runClickGame() {
  alert(`Игра "Кликалка"`);
  alert(`
  Я случайным образом буду показывать 10 системных окон.
  Твоя задача как можно скорее прокликать все.
  При этом в окне confirm нужно нажимать "Отмена".
  Начинаем?
  `);
  let errorCount = 0;
  for (let i = 1; i <= 10; i++) {
    let isCorrectAnswer = askClickGameQuest();
    if (!isCorrectAnswer) {
      errorCount++;
    }
  }
  alert(`Ошибок: ${errorCount}`);
}

function askClickGameQuest(persentConfirm = 0.5) {
  let isConfirm = Math.random() < persentConfirm;
  if (isConfirm) {
    let answerConfirm = confirm(`Нажми "Отмена"`);
    return !answerConfirm;
  } else {
    alert(`Просто нажми "Ок"`);
    return true;
  }
}
