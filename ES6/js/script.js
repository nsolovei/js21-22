{
  'use strict';
    var data = {
      //pageTitle: 'Тест',
        categories: [{
          questionName: "Как найти прошлогодний снег?",
            variant: [{
               answer: 'заглянуть в морозилку в общаге',
               rigth: true
            }, {
               answer: 'утром 1 января',
               rigth: true
            }, {
               answer: 'вернуться в прошлое',
               rigth: false
            }],
            inputName: ['11', '12', '13']
         }, {
            questionName: "Собака-3, Кошка-3, Ослик-2, Рыбка-0. Чему равняется Петушок? И почему? ",
            variant: [{
               answer: '5',
               rigth: false
            }, {
               answer: '10',
               rigth: false
            }, {
               answer: '8',
               rigth: true
            }],
            inputName: ['21', '22', '23']
         }, {
            questionName: "Бизнесмен купил лошадь за 10 долл., продал ее за 20 долл. Потом он купил ТУ ЖЕ САМУЮ ЛОШАДЬ за 30 долл., а продал за 40 долл. Вопрос: каков суммарный доход бизнесмена от этих двух сделок? ",

            variant: [{
               answer: '20$',
               rigth: true
            }, {
               answer: '40$',
               rigth: false
            }, {
               answer: '10$',
               rigth: false
            }],
            inputName: ['31', '32', '33']
         }],
      result: "Проверить мои результаты"
   };

    localStorage.setItem('data', JSON.stringify(data));
        var page = localStorage.getItem('data');
        var myData = JSON.parse(page);

        var tmpl = _.template(document.getElementById('list-template').innerHTML);

        var result = tmpl({
            data: data
        });
        document.write(result);



        var overlay;
        var modal = document.querySelector('.js-modal');
        var close = modal.querySelector('.js-close');
        var resultOutput = modal.querySelector('.js-result');
        var verifyBtn = document.querySelector('.js-verify');
        var block = document.querySelectorAll('.block');
        var allInput = [];
        var rightAnswers = [];
        var givenAnswers = [];
        var resultVerify;

        verifyBtn.addEventListener('click', showModal)

        function findAllInput(){
            for (let k = 0; k < block.length; k++) {
                for (let i = 0; i < block[k].querySelectorAll('input[type="checkbox"]').length; i++) {
                    allInput.push(block[k].querySelectorAll('input[type="checkbox"]')[i]);
                };
            };
        };

        function userAnswer(){
            for (let i = 0; i < myData.categories.length; i++) {
                for (let j = 0; j < myData.categories[i].variant.length; j++) {
                    var currentAnswer = myData.categories[i].variant[j].rigth;
                    rightAnswers.push(currentAnswer);
                };
            };
        };

        function AnswerPush(){
            for (let i = 0; i < allInput.length; i++) {
                if (allInput[i].checked) {
                    givenAnswers.push(true);
                } else {
                    givenAnswers.push(false);
                };
                allInput[i].checked = false
            };
        };

        function verifyFunc(){
            resultVerify = JSON.stringify(givenAnswers) === JSON.stringify(rightAnswers);
        };

        function Display(){
            if (resultVerify) {
                resultOutput.innerHTML = 'Отличный результат!'
            } else {
                resultOutput.innerHTML = 'Стоит попробовать еще раз';
            };
        };

        function hideModal() {
            overlay.remove();
            modal.classList.remove('show');
        };

        function cleanArrs(){
            allInput = [];
            rightAnswers = [];
            givenAnswers = [];
        };

        function showModal(event) {
            event.preventDefault();
            close.addEventListener('click', hideModal)
            overlay = document.createElement('div');
            overlay.className = "overlay";
            document.body.appendChild(overlay);
            modal.classList.add("show");
            
            cleanArrs();

            findAllInput();
            userAnswer();
            AnswerPush();
            verifyFunc();
            Display();
        };
}