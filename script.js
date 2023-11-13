page.title = 'тестер)'

engine.createHeader("привет, давай проверим твои знания :)");
engine.createText('cайтик для зубрёжки путём прохождения тестов');
engine.createButton('Создать свой тест').onClick(() => {
    document.location.search = new URLSearchParams();
});

engine.space(2);


params = new URLSearchParams(document.location.search);

if (params.has('length')) {
    const name = params.get('name');
    const author = params.get('author');
    const length = parseInt(params.get('length'), 10);

    engine.createHeader(`${name} (тест сделал: ${author})`);

    const start_test = engine.createButton('Начать');

    const question_text = engine.createText('a').hide();
    const answer_input = engine.createInput.text().hide();
    const answer_button = engine.createInput.button("ответить").hide();


    start_test.onClick(() => {
        start_test.hide();

        types = [...params.getAll('0')]
        data = [];
        for (let i = 1; i < length; i++) {
            data.push([...params.getAll(i.toString())])
        }

        let question = 1;

        question_text.show();
        answer_input.show();
        answer_button.show();
        
        function newQuestion() {
            const element = data[utils.random(0, data.length-1)];

            let ask = utils.random(0, types.length-1);
            let answer = utils.random(0, types.length-1);
            if (answer == ask) ask = (ask + 1) % types.length;

            question_text.text = `№${question}. Напиши ${types[answer]}, если ${types[ask]} - ${element[ask]}:`;
            
            answer_button.onClick(() => {
                if (element[answer].toLowerCase() == answer_input.value.toLowerCase()) {
                    question += 1;
                    answer_input.value = '';

                    newQuestion();
                }
                else {
                    question_text.text = `ответ введён неверно; правильный ответ при ${element[ask]} - ${element[answer]}. Отвечено верно: ${question-1}`;

                    answer_input.hide();
                    answer_button.hide();
                    start_test.show();
                }
            });
        }

        newQuestion();
    });
}
else {
    engine.createHeader('Новый тест')

    engine.createText('название теста:')
    const testName = engine.createInput.text();

    engine.createText('автор теста:')
    const testAuthor = engine.createInput.text();

    engine.createText('названия столбцов через ; (пример: "символ элемента;название элемента;произношение элемента")');
    const testTypes = engine.createInput.text();

    engine.createText('столбцы через ; и без пробелов (пример: H;водород;аш)')
    const testQuestions = document.createElement('textarea')
    document.getElementById("main").appendChild(testQuestions);

    engine.space();
    const testCreate = engine.createButton('создать тест');
    testCreate.onClick(() => {
        const newParams = new URLSearchParams();

        newParams.append('name', testName.value)
        newParams.append('author', testAuthor.value)

        const types = testTypes.value.split(';')
        types.forEach(type => newParams.append('0', type));

        let questionID = 1;
        let questions = testQuestions.value.split('\n');
        questions.forEach(question => {
            const options = question.split(';')
            console.log(options);
            options.forEach(option => newParams.append(questionID.toString(), option));
            questionID++;
        });

        newParams.append('length', questions.length)
        
        document.location.search = newParams;
    })
    
}
