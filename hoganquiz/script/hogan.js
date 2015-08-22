window.addEventListener('DOMContentLoaded', init);
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
];
var generalOfEither = ['Generalfeldmarschall', 'General Of The Army']
var insignia = [['./images/prv.svg.png', './images/gerpriv.png'], ['./images/sgt.svg.png', './images/gersgt.png'], ['./images/uscap.svg.png', './images/gercap.svg.png'], ['./images/col.svg.png', './images/gercol.png'], ['./images/gen.svg.png', './images/gergen.png'], ['./images/fieldmarsh.svg.png', './images/genofusaarmy.svg.png']];
var questionNow = 0;
var correct = 0;
var nation;

function init() {
    var q = document.getElementById('quiz');
    function populateQuiz() {
        if (questionNow == allQuestions.length) {
            $('body').empty();
            var $rankImg = $('<img />').addClass('rank');
            var score = Math.round(correct / allQuestions.length * 100);
            var rank;
            var ranRank = Math.round(Math.random());
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
            var $newDiv = $('<div id="results" />');
            $('body').append($newDiv).addClass('field-results').append('You Answered ' + score + '%' + ' Of The Questions Correctly.' + '<br />' + 'Your Rank Is: ' + rank+' ('+nation+')');
            $($newDiv).append($rankImg);
            return;
        }
        uncheckRadios();
        var question = document.getElementById('question');
        question.innerHTML = allQuestions[questionNow].question;
        for (var i = 0; i < quiz.length; i++) {
            quiz[i].parentNode.lastChild.textContent = allQuestions[questionNow].choices[i]
            quiz[i].value = quiz[i].parentNode.lastChild.textContent
        }
    }
    function nextClick() {
        for (var i = 0; i < quiz.length; i++) {
            if (quiz[i].checked == true) {
                if (quiz[i].value == allQuestions[questionNow].choices[allQuestions[questionNow].correctAnswer]) {
                    correct++;
                }
            }
        }
        questionNow++;
        populateQuiz();
    }
    function uncheckRadios() {
        for (var i = 0; i < quiz.length; i++) {
            quiz[i].checked = false;
        }
    }
    window.addEventListener('load', populateQuiz);
    document.getElementById('next').addEventListener('click', nextClick);
}