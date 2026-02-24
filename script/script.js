console.log('script.js');

let interviewList = [];
let rejectedList = [];

let totalJobCount = document.getElementById('total-count');
let interviewJobCount = document.getElementById('interview-count');
let rejectedJobCount = document.getElementById('reject-count');

const jobContainer = document.getElementById('job-container');
const mainContainer = document.querySelector('main');
const filSection = document.getElementById('filtered-section');

const allFiltterButton = document.getElementById('all-filter-button');
const interviewFiltterButton = document.getElementById('interview-filter-button');
const rejectedFiltterButton = document.getElementById('rejecte-filter-button');

// count function
function calculateJobCount() {
    totalJobCount.innerText = jobContainer.children.length;
    interviewJobCount.innerText = interviewList.length;
    rejectedJobCount.innerText = rejectedList.length;
}

// List khali check

function checkEmptyState(list) {
    const noDataContainer = document.getElementById('no-data-container');

    if (list.length === 0) {
        noDataContainer.classList.remove('hidden');
        filSection.classList.add('hidden');
    } else {
        noDataContainer.classList.remove('hidden');
        noDataContainer.classList.add('hidden');
        filSection.classList.remove('hidden');
    }
}

// filterbutton
function toggleButton(id) {
    allFiltterButton.classList.remove('btn-info', 'text-white');
    interviewFiltterButton.classList.remove('btn-info', 'text-white');
    rejectedFiltterButton.classList.remove('btn-info', 'text-white');

    allFiltterButton.classList.add('btn-primary-content', 'text-black');
    interviewFiltterButton.classList.add('btn-primary-content', 'text-black');
    rejectedFiltterButton.classList.add('btn-primary-content', 'text-black');

    const selectedButton = document.getElementById(id);
    selectedButton.classList.remove('btn-primary-content', 'text-black');
    selectedButton.classList.add('btn-info', 'text-white');

    if (id === 'all-filter-button') {
        jobContainer.classList.remove('hidden');
        filSection.classList.add('hidden');
    }
    else if (id === 'interview-filter-button') {
        jobContainer.classList.add('hidden');
        filSection.classList.remove('hidden');
        createInterview();
    }
    else if (id === 'rejecte-filter-button') {
        jobContainer.classList.add('hidden');
        filSection.classList.remove('hidden');
        createReject();
    }
}
// button click event listener
mainContainer.addEventListener('click', function (event) {
    const interviewBtn = event.target.closest('.interview-button');
    const rejectBtn = event.target.closest('.reject-btn');
    const deleteBtn = event.target.closest('.delete-btn'); 

    // --- DELETE BUTTON LOGIC ---
    if (deleteBtn) {
        const parentNode = deleteBtn.closest('.space-y-5');
        const jobHeader = parentNode.querySelector('.job-header').innerText.trim();
        const jobDiscibtion = parentNode.querySelector('.job-discription').innerText.trim();
        const jobRequirment = parentNode.querySelector('.requirment').innerText.trim();
        const jobRecomend = parentNode.querySelector('.recomend').innerText.trim();

        const inInterview = interviewList.find(item => item.jobHeader === jobHeader);
        const inReject = rejectedList.find(item => item.jobHeader === jobHeader);

        if (inInterview || inReject) {
            interviewList = interviewList.filter(item => item.jobHeader !== jobHeader);
            rejectedList = rejectedList.filter(item => item.jobHeader !== jobHeader);

            restoreToAllSection(jobHeader, jobDiscibtion, jobRequirment, jobRecomend);
            parentNode.remove();
        }
        else {
            parentNode.remove();
        }

        calculateJobCount();
    }

    // --- INTERVIEW BUTTON LOGIC ---
    else if (interviewBtn) {
        const parentNode = interviewBtn.closest('.space-y-5');
        const jobHeader = parentNode.querySelector('.job-header').innerText.trim();
        const jobDiscibtion = parentNode.querySelector('.job-discription').innerText.trim();
        const jobRequirment = parentNode.querySelector('.requirment').innerText.trim();
        const jobRecomend = parentNode.querySelector('.recomend').innerText.trim();

        const existsInInterview = interviewList.find(item => item.jobHeader === jobHeader);

        if (existsInInterview) {
            interviewList = interviewList.filter(item => item.jobHeader !== jobHeader);
            restoreToAllSection(jobHeader, jobDiscibtion, jobRequirment, jobRecomend);
            parentNode.remove();
        }
        else {
            parentNode.remove();
            rejectedList = rejectedList.filter(item => item.jobHeader !== jobHeader);
            interviewList.push({
                jobHeader, jobDiscibtion, jobRequirment, jobRecomend,
                appliedButton: 'Applied'
            });
        }
        calculateJobCount();
    }

    // --- REJECT BUTTON LOGIC ---
    else if (rejectBtn) {
        const parentNode = rejectBtn.closest('.space-y-5');
        const jobHeader = parentNode.querySelector('.job-header').innerText.trim();
        const jobDiscibtion = parentNode.querySelector('.job-discription').innerText.trim();
        const jobRequirment = parentNode.querySelector('.requirment').innerText.trim();
        const jobRecomend = parentNode.querySelector('.recomend').innerText.trim();

        const existsInReject = rejectedList.find(item => item.jobHeader === jobHeader);

        if (existsInReject) {
            rejectedList = rejectedList.filter(item => item.jobHeader !== jobHeader);
            restoreToAllSection(jobHeader, jobDiscibtion, jobRequirment, jobRecomend);
            parentNode.remove();
        }
        else {
            parentNode.remove();
            interviewList = interviewList.filter(item => item.jobHeader !== jobHeader);
            rejectedList.push({
                jobHeader, jobDiscibtion, jobRequirment, jobRecomend,
                appliedButton: 'Rejected'
            });
        }
        calculateJobCount();
    }
});

function restoreToAllSection(header, desc, req, rec) {
    const div = document.createElement('div');
    div.className = "space-y-5 p-6 shadow-sm rounded-lg border border-gray-200";
    div.innerHTML = `
        <div class="flex justify-between">
            <div>
                <h1 class="text-[#002C5C] text-lg font-semibold job-header">${header}</h1>
                <p class="text-[#64748B] job-discription">${desc}</p>
            </div>
            <div class="delete-btn cursor-pointer">
                        <i class="fa-regular fa-trash-can"></i>
            </div>
        </div>
        <p class="text-[#64748B] requirment">${req}</p>
        <button class="btn btn-soft btn-primary applied-button">Not Applied</button>
        <p class="text-[#323B49] mb-5 recomend">${rec}</p>
        <div class="flex gap-5">
            <button class="btn btn-success btn-outline interview-button">INTERVIEW</button>
            <button class="btn btn-outline btn-error reject-btn">REJECTED</button>
        </div>
    `;
    jobContainer.appendChild(div);
}

// Interview Section

function createInterview() {
    checkEmptyState(interviewList);
    if (interviewList.length === 0) return;
    filSection.innerHTML = '';
    filSection.innerHTML = '';
    interviewList.forEach(interview => {
        const div = document.createElement('div');
        div.className = "space-y-5 p-6 shadow-sm rounded-lg border border-gray-200";
        div.innerHTML = `
            <div class="flex justify-between">
                <div>
                    <h1 class="text-[#002C5C] text-lg font-semibold job-header">${interview.jobHeader}</h1>
                    <p class="text-[#64748B] job-discription">${interview.jobDiscibtion}</p>
                </div>
                <div class="delete-btn cursor-pointer">
                        <i class="fa-regular fa-trash-can"></i>
            </div>
            </div>
            <p class="text-[#64748B] requirment">${interview.jobRequirment}</p>
            <button class="btn btn-active btn-success text-green-800 applied-button">${interview.appliedButton}</button>
            <p class="text-[#323B49] mb-5 recomend">${interview.jobRecomend}</p>
            <div class="flex gap-5">
                <button class="btn btn-success btn-outline interview-button">INTERVIEW</button>
                <button class="btn btn-outline btn-error reject-btn">REJECTED</button>
            </div>
        `;
        filSection.appendChild(div);
    });
}

// Reject Section

function createReject() {
    checkEmptyState(rejectedList);
    if (rejectedList.length === 0) return;
    filSection.innerHTML = '';
    filSection.innerHTML = '';
    rejectedList.forEach(reject => {
        const div = document.createElement('div');
        div.className = "space-y-5 p-6 shadow-sm rounded-lg border border-gray-200";
        div.innerHTML = `
            <div class="flex justify-between">
                <div>
                    <h1 class="text-[#002C5C] text-lg font-semibold job-header">${reject.jobHeader}</h1>
                    <p class="text-[#64748B] job-discription">${reject.jobDiscibtion}</p>
                </div>
                <div class="delete-btn cursor-pointer">
                        <i class="fa-regular fa-trash-can"></i>
            </div>
            </div>
            <p class="text-[#64748B] requirment">${reject.jobRequirment}</p>
            <button class="btn btn-error text-red-800 applied-button">${reject.appliedButton}</button>
            <p class="text-[#323B49] mb-5 recomend">${reject.jobRecomend}</p>
            <div class="flex gap-5">
                <button class="btn btn-success btn-outline interview-button">INTERVIEW</button>
                <button class="btn btn-outline btn-error reject-btn">REJECTED</button>
            </div>
        `;
        filSection.appendChild(div);
    });
}
calculateJobCount();