//select element
let countspan=document.querySelector('.quiz-info .count span');
let bulletsspan=document.querySelector(".bullets .spans");
let quizeare=document.querySelector(".quiz-erea")
let answerseare=document.querySelector('.answers-area')
let submit=document.querySelector('.submit-button')
let bullet =document.querySelector(".bullets")
let resultcontinet=document.querySelector(".result")
let countdownelement=document.querySelector('.countdown')
//set obtion

let currentindex=0;
let rightanswer=0
let countdowinterval;
function getquistions(){
    let myrequest=new XMLHttpRequest()
    myrequest.onreadystatechange=function(){
        if(this.readyState===4 && this.status === 200){
            let questionobject=JSON.parse(this.responseText);
            // how many quistion are there?
            let quistionqount=questionobject.length;
            //create bulltes +set quistion count
            createbullets(quistionqount)
            //add cuistion data from json
            addquistiondata(questionobject[currentindex],quistionqount);
            //start countdown
            countdown(5,quistionqount)
            //click on submit
            submit.onclick=()=>{
                //get right answer
                let therightanswer = questionobject[currentindex].right_answer;
                //increase index
                currentindex++;
                //check the answer
            checkanswer(therightanswer,quistionqount);
            //removed previous quistion
            quizeare.innerHTML=''
            answerseare.innerHTML=''
            addquistiondata(questionobject[currentindex],quistionqount);
            /// handle bullets class
            handelbulltes();
            clearInterval(countdowinterval)
            countdown(4,quistionqount)
            //show resultes
            showresults(quistionqount);

            
            }
        }
    } 
    myrequest.open("GET","html-qistion.json",true)
    myrequest.send()
}
getquistions()

function createbullets(num){
    countspan.innerHTML=num;
    //create spans
    for(let i = 0 ; i < num ;i++){
        //create span
        let span=document.createElement("span")
         //if the mumber of quistion 1 but class one
        if(i===0){
            
            span.className="on"
        }
        //append span to main bullet container
        bulletsspan.appendChild(span)
        

    }

}
function addquistiondata(obj ,count){
    //create h2 quistion title
    let quistiontitle=document.createElement("h2")
    //create quistion text
    let quistiontext=document.createTextNode(obj['title'])
    // append text to h2
    quistiontitle.appendChild(quistiontext);
    //append the h2 to the quiz erea 
    // quizeare.appendChild(quistitle);
    // quizeare.innerHTML=quistiontitle
    quizeare.appendChild(quistiontitle);
    //create the answer
    for(let i =1;i <=4;i++){
        //create main answer di 
        let maindiv=document.createElement("div");
        //add class to main div answer
        maindiv.className="answer";
        //create input radio
        let radioinput=document.createElement("input");
        //add type + id + data-attriubite
        radioinput.name="quistions";
        radioinput.id=`answer-${i}`;
        radioinput.type="radio";
        radioinput.dataset.answer=obj[`answer-${i}`]
        //crate lablel
        let thelable=document.createElement("label")
        //add for attribut
        thelable.htmlFor=`answer-${i}`;
        //create label texr
        let labletext=document.createTextNode(obj[`answer-${i}`]);
        //add the the text to lable
        thelable.appendChild(labletext);
        // add the lable to the main div
        maindiv.appendChild(radioinput);
        maindiv.appendChild(thelable);
        answerseare.appendChild(maindiv)
        //
    }

    

}
function addquistiondata(obj ,count){
    if(currentindex < count){
    
            //create h2 quistion title
            let quistiontitle=document.createElement("h2")
            //create quistion text
            let quistiontext=document.createTextNode(obj['title'])
            // append text to h2
            quistiontitle.appendChild(quistiontext);
            //append the h2 to the quiz erea 
            // quizeare.appendChild(quistitle);
            // quizeare.innerHTML=quistiontitle
            quizeare.appendChild(quistiontitle);
            //create the answer
            for(let i =1;i <=4;i++){
                //create main answer di 
                let maindiv=document.createElement("div");
                //add class to main div answer
                maindiv.className="answer";
                //create input radio
                let radioinput=document.createElement("input");
                //add type + id + data-attriubite
                radioinput.name="quistions";
                radioinput.id=`answer-${i}`;
                radioinput.type="radio";
                radioinput.dataset.answer=obj[`answer-${i}`]
                //crate lablel
                let thelable=document.createElement("label")
                //add for attribut
                thelable.htmlFor=`answer-${i}`;
                //create label texr
                let labletext=document.createTextNode(obj[`answer-${i}`]);
                //add the the text to lable
                thelable.appendChild(labletext);
                // add the lable to the main div
                maindiv.appendChild(radioinput);
                maindiv.appendChild(thelable);
                answerseare.appendChild(maindiv)
                //
            }
        
            
        
        }
    }

function checkanswer(aanswer,count){
    let answers=document.getElementsByName("quistions")
    let thechoseanswer;
    for(let i = 0 ; i<answers.length;i++){
        if(answers[i].checked){
        thechoseanswer=answers[i].dataset.answer;
    }
}
if(aanswer===thechoseanswer){
    rightanswer++;
}
}
function handelbulltes(){
    let bulletsspan=document.querySelectorAll(".bullets .spans span")
    let arrayofspan=Array.from(bulletsspan);
    arrayofspan.forEach((span , index ) => {
    if(currentindex==index){
        span.className="on";
    }
    })

        
    
}
function showresults(count){
    let theresults;

if(currentindex === count){
    quizeare.remove();
    answerseare.remove();
    submit.remove();
    bulletsspan.remove();
    if(rightanswer>(count / 2) && rightanswer<count){
        theresults=`<span class="good">  good</span>: ${rightanswer} :from ${count} is right answer`
    }else if(rightanswer===count){
        theresults=`<span class="perfect">  perfect:</span> ${rightanswer} :from ${count} ALL answers is good`
    }else{
        theresults=`<span class="bad">  bad:</span> ${rightanswer} :from ${count} is very bad`
    }
    resultcontinet.innerHTML=theresults;
    resultcontinet.style.padding="10px"
    resultcontinet.style.background="green"; 
    
    resultcontinet.style.fontSize='20px'
    resultcontinet.style.width="62%"
    bullet.style.display="flex"
    bullet.style.justifyContent="space-between"
}

}
function countdown(duration,count){
    if(currentindex<count){
        let minutes,secounds;
        countdowinterval=setInterval(function(){
            minutes=parseInt(duration/60);
            secounds=parseInt(duration %60);
            minutes=minutes<10?`0 ${minutes}`:minutes;
            secounds=secounds<10?`0 ${secounds}`:secounds;
            countdownelement.innerHTML=`${minutes} : ${secounds}`;
            if(--duration <0){
            clearInterval(countdowinterval)
            submit.click()
            
            }

        },1000)
    }
}