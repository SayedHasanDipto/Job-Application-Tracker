console.log('script.js');






// Button Toggle
let interviewList = [];
let rejectedList = [];



let totalJobCount = document.getElementById('total-count');
let interviewJobCount = document.getElementById('interview-count');
let rejectedJobCount = document.getElementById('reject-count');
const jobContainer = document.getElementById('job-container');
const mainContainer = document.querySelector('main');
console.log(mainContainer);

// count function

function calculateJobCount() {
    totalJobCount.innerText = jobContainer.children.length;
    interviewJobCount.innerText = interviewList.length;
    rejectedJobCount.innerText = rejectedList.length;
}
calculateJobCount();

// toggle function

const allFiltterButton = document.getElementById('all-filter-button');
const interviewFiltterButton = document.getElementById('interview-filter-button');
const rejectedFiltterButton = document.getElementById('rejecte-filter-button');

function toggleButton(id) {
    console.log(id);
    allFiltterButton.classList.remove('btn-info', 'text-white');
    interviewFiltterButton.classList.remove('btn-info', 'text-white');
    rejectedFiltterButton.classList.remove('btn-info', 'text-white');

    allFiltterButton.classList.add('btn-primary-content', 'text-black');
    interviewFiltterButton.classList.add('btn-primary-content', 'text-black');
    rejectedFiltterButton.classList.add('btn-primary-content', 'text-black');

    const selectedButton = document.getElementById(id);
    // console.log(selectedButton);
    selectedButton.classList.remove('btn-primary-content', 'text-black');
    selectedButton.classList.add('btn-info', 'text-white');
}


mainContainer.addEventListener('click', function (event) {
    const parentNode = event.target.parentNode.parentNode.parentNode;
    const jobHeader = parentNode.querySelector('.job-header').innerText;
    const jobDiscription = parentNode.querySelector('.job-discription').innerText;
    const requirment = parentNode.querySelector('.requirment').innerText;
    const appliedButton = parentNode.querySelector('.applied-button').innerText;
    const recomend = parentNode.querySelector('.recomend').innerText;



    console.log(jobHeader, jobDiscription, requirment, appliedButton, recomend);
})