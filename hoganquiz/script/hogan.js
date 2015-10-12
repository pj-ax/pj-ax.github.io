$(document).ready(function () {
    // Start Globals \\
    var allQuestions = [{ question: "What Year Did Hogan's Heroes First Air?", choices: ["1960", "1955", "1965", "1962"], correctAnswer: 2 },
                    { question: "Who Was The Actor That Portrayed Col. Hogan?", choices: ["Reed Hadley", "Karl Langenscheidt", "James Arness", "Bob Crane"], correctAnswer: 3 },
                    { question: "Who Was Col. Klink's Commanding Officer?", choices: ["Major Hochstetter", "General Burkhalter", "Major Bonacelli", "Colonel Hogan"], correctAnswer: 1 },
                    { question: "What Was The Name Of The POW Camp That Colonel Klink And Sergeant Shultz Were Stationed?", choices: ["POW Camp 23", "Camp 12", "Stalag 3", "Stalag 13"], correctAnswer: 3 },
                    { question: "What Was Louis LeBeau's Rank?", choices: ["General", "Corporal", "Colonel", "Sergeant"], correctAnswer: 1 },
                    { question: "What Character Did John Banner Portray In The Series?", choices: ["Major Hochstetter", "Newkirk", "Sergeant Shultz", "Major Bonacelli"], correctAnswer: 2 },
                    { question: "Who Brought The Guard Dogs To Camp?", choices: ["Captain Fritz", "Oscar Schnitzer", "Major Kiegel", "Tiger"], correctAnswer: 1 },
                    { question: "The Name Of The Female Russian Spy Portrayed By Nita Talbot, That Colonel Hogan Worked With?", choices: ["Marya", "Maurice Dubay", "Fräulein Helga", "Tatiana Markova"], correctAnswer: 0 },
                    { question: "On What Network Did Hogan's Heroes Air?", choices: ["ABC", "CBS", "FOX", "USA"], correctAnswer: 1 },
                    { question: "What Was Colonel Klink's Nickname?", choices: ["Iron Eagle", "Led Zeppelin", "Uber Dummkopf", "Fritz"], correctAnswer: 0 },
                    { question: "In What Branch Of The Military Was Sergeant Shultz Enlisted?", choices: ["Waffen-SS", "Heer", "Luftwaffe", "Gestapo"], correctAnswer: 2 },
                    { question: "Where Were Sergeant Shultz And Colonel Klink Threatened To Be Sent By Their Superiors?", choices: ["Hollywood", "The Cooler", "Poland", "The Russian Front"], correctAnswer: 3 },
                    { question: "In What City Did Sergeant Kinchloe Live Before The War?", choices: ["Munsey, IN", "Cleveland, OH", "Detroit, MI", "Tuscumbia, AL"], correctAnswer: 2 },
                    { question: "Sergeant Shultz Saw What?", choices: ["Strudel", "Nothing", "POW's", "Red Cross Packages"], correctAnswer: 1 },
                    { question: "What Was Peter Newkirk's Rank?", choices: ["Sergeant", "Corporal", "Major", "Private"], correctAnswer: 1 }
    ],
        answers = [],
        questionNow = 0,
        correct = 0,
        generalOfEither = ['Generalfeldmarschall', 'General Of The Army'],
        insignia = [['./images/prv.svg.png', './images/gerpriv.png'], ['./images/sgt.svg.png', './images/gersgt.png'], ['./images/uscap.svg.png', './images/gercap.svg.png'], ['./images/col.svg.png', './images/gercol.png'], ['./images/gen.svg.png', './images/gergen.png'], ['./images/fieldmarsh.svg.png', './images/genofusaarmy.svg.png']],
        nation,
        $loadDiv = $('<div>', {
            class: 'jumbotron',
            html: '<p class="take-quiz">Take The Quiz?</p><div class="buttons start-button-wrap"><button type="button" class="btn btn-lg btn-primary start" id="start">Start</button></div>'
        });
    // End Globals \\

    // Start Functions \\
    function createDiv() {
        var $questionDiv;
        $questionDiv = $('<div>', {
            class: 'jumbotron questions',
            html: '<span class="question-number">'+"Question: " + (questionNow + 1) + '</span>' + '<div class="question-now">' + allQuestions[questionNow].question + '</div>'
        }).append('<div class="buttons quiz-button-wrap"><button type="button" class="btn btn-danger text-center prev" id="prev">Previous</button> <button type="button" class="btn btn-primary next" id="next">Next</button></div>');
        return $questionDiv.append(createForm);
    }
    function createForm() {
        var $form;
        $form = $('<form>', {
            name: 'quiz',
            id: 'quiz'
        }).append('<label for="a1"><input type="radio" name="quiza" class="quiza" value="' + allQuestions[questionNow].choices[0] + '" id="a1" />' + allQuestions[questionNow].choices[0] + '</label>').append('<label for="a2"><input type="radio" name="quiza" class="quiza" value="' + allQuestions[questionNow].choices[1] + '" id="a2" />' + allQuestions[questionNow].choices[1] + '</label>').append('<label for="a3"><input type="radio" name="quiza" class="quiza" value="' + allQuestions[questionNow].choices[2] + '" id="a3" />' + allQuestions[questionNow].choices[2] + '</label>').append('<label for="a4"><input type="radio" name="quiza" class="quiza" value="' + allQuestions[questionNow].choices[3] + '" id="a4" />' + allQuestions[questionNow].choices[3] + '</label>');
        return $form;
    }
    function getAnswers() {
        if (typeof answers[questionNow] === undefined) {
            answers.push(allQuestions[questionNow].choices.indexOf($('.quiza:checked').val()));
        }
        if (typeof answers[questionNow] !== undefined) {
            console.log('check valueAA = ' + $('.quiza:checked').val() + '  ' + allQuestions[questionNow].choices.indexOf([answers[questionNow]]));
            if ($('.quiza:checked').val() !== allQuestions[questionNow].choices.indexOf([answers[questionNow]])) {
                answers[questionNow] = allQuestions[questionNow].choices.indexOf($('.quiza:checked').val());
            }
        }
        console.log('check value = ' + $('.quiza:checked').val());
        console.log('check2 value = ' + allQuestions[questionNow].choices.indexOf($('.quiza:checked').val()));
        console.log('check3 value = ' + allQuestions[questionNow].choices[answers[questionNow]]);
        console.log(answers);
    }
    function printResult() {
        var $results,
        $rankImg = $('<img />').addClass('rank'),
        score = Math.round(correct / allQuestions.length * 100),
        rank,
        ranRank = Math.round(Math.random());
        if (score == 0) {
            rank = 'You Must Have Been Watching "I Dream of Jeannie"'
        }
        else if (score > 0 && score < 20) {
            rank = 'Private First Class';
            $rankImg.attr('src', insignia[0][ranRank]);
            if ($rankImg.attr('src') == insignia[0][0]) {
                nation = 'Allies';
            } else {
                nation = 'GER';
            }
        }
        else if (score >= 20 && score < 40) {
            rank = 'Sergeant';
            $rankImg.attr('src', insignia[1][ranRank]);
            if ($rankImg.attr('src') == insignia[1][0]) {
                nation = 'Allies';
            } else {
                nation = 'GER';
            }
        }
        else if (score >= 40 && score < 60) {
            rank = 'Captain';
            $rankImg.attr('src', insignia[2][ranRank]);
            if ($rankImg.attr('src') == insignia[2][0]) {
                nation = 'Allies';
            } else {
                nation = 'GER';
            }
        }
        else if (score >= 60 && score < 80) {
            rank = 'Colonel';
            $rankImg.attr('src', insignia[3][ranRank]);
            if ($rankImg.attr('src') == insignia[3][0]) {
                nation = 'Allies';
            } else {
                nation = 'GER';
            }
        }
        else if (score >= 80 && score < 100) {
            rank = 'General';
            $rankImg.attr('src', insignia[4][ranRank]);
            if ($rankImg.attr('src') == insignia[4][0]) {
                nation = 'Allies';
            } else {
                nation = 'GER';
            }
        }
        else if (score == 100) {
            rank = generalOfEither[ranRank];
            if (rank == generalOfEither[0]) {
                $rankImg.attr('src', insignia[5][0]);
                nation = 'GER';
            }
            if (rank == generalOfEither[1]) {
                $rankImg.attr('src', insignia[5][1]);
                nation = 'Allies';
            }
        }
        $results = $('<div>', {
            class: 'jumbotron results',
            html: '<div class="questions-correct">' + "You Answered " + correct + " Question Correctly, For A Score Of: " + score + "%" + '<br>' + "Your Rank Is: " + rank + '</div>'
        }).append('<div class="buttons again-button-wrap"><button type="button" class="btn btn-lg btn-info text-center again" id="again">Try Again?</button></div>');;
        $($results).append($rankImg);
        return $('.bflex').empty().append($results);
    }
    // End Functions \\

    $('.bflex').append($loadDiv);
    $(document).on('click', '.start', function () {
        $('.bflex').empty().append(createDiv);
    });
    $(document).on('click', '.next,.prev', function (event) {
        if (event.target.id == 'next') {
            if ($('.quiza:checked').val() == undefined) {
                return;
            }
            getAnswers();
            questionNow += 1;
            if (questionNow == allQuestions.length) {
                answers.forEach(function (value, index, self) {
                    if (value == allQuestions[index].correctAnswer) {
                        correct += 1;
                        console.log(correct);
                    }
                });
                printResult();
                return;
            }
            $('.bflex').empty().append(createDiv);
            if (answers[questionNow] >= 0) {
                $('.quiza')[answers[questionNow]].setAttribute('checked', 'true');
            }
            if (questionNow == allQuestions.length - 1) {
                $('#next').html('Get Results').removeClass('btn-primary').addClass('btn-success');
            }
        }
        else if (event.target.id == 'prev') {
            console.log(questionNow);
            if (questionNow === 0) {
                return;
            }
            questionNow -= 1;
            console.log(questionNow);
            console.log(answers[questionNow]);
            $('.bflex').empty().append(createDiv);
            if (answers[questionNow] >= 0) {
                console.log('prev ' + $('.quiza:checked').val());
                $('.quiza')[answers[questionNow]].setAttribute('checked', 'true');
            }
            getAnswers();
        }
    });
    $(document).on('click', '.again', function () {
        answers = [];
        correct = 0;
        score = 0;
        questionNow = 0;
        $('.bflex').empty().append(createDiv);
    });
});