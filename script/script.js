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
        filSection.classList.remove('hidden'); // আপনার এখানে 'hidden' add করা ছিল, তাই দেখা যাচ্ছিল না
        createReject();
    }
}

// button click event listener
mainContainer.addEventListener('click', function (event) {
    const interviewBtn = event.target.closest('.interview-button');
    const rejectBtn = event.target.closest('.reject-btn');

    // INTERVIEW BUTTON
    if (interviewBtn) {
        const parentNode = interviewBtn.closest('.space-y-5');
        const jobHeader = parentNode.querySelector('.job-header').innerText.trim();
        const jobRequirment = parentNode.querySelector('.requirment').innerText.trim();
        const jobDiscibtion = parentNode.querySelector('.job-discription').innerText.trim();
        const jobRecomend = parentNode.querySelector('.recomend').innerText.trim();

        parentNode.querySelector('.applied-button').innerText = 'Applied';

        rejectedList = rejectedList.filter(item => item.jobHeader !== jobHeader);
        const exists = interviewList.find(item => item.jobHeader === jobHeader);

        if (!exists) {
            interviewList.push({
                jobHeader, jobDiscibtion, jobRequirment, jobRecomend,
                appliedButton: 'Applied'
            });
        }
        calculateJobCount();
    }

    // REJECT BUTTON
    else if (rejectBtn) {
        const parentNode = rejectBtn.closest('.space-y-5');
        const jobHeader = parentNode.querySelector('.job-header').innerText.trim();
        const jobDiscibtion = parentNode.querySelector('.job-discription').innerText.trim();
        const jobRequirment = parentNode.querySelector('.requirment').innerText.trim();
        const jobRecomend = parentNode.querySelector('.recomend').innerText.trim();

        parentNode.querySelector('.applied-button').innerText = 'Rejected';

        interviewList = interviewList.filter(item => item.jobHeader !== jobHeader);
        const exists = rejectedList.find(item => item.jobHeader === jobHeader);

        if (!exists) {
            rejectedList.push({
                jobHeader, jobDiscibtion, jobRequirment, jobRecomend,
                appliedButton: 'Rejected'
            });
        }
        calculateJobCount();
    }
});

function createInterview() {
    filSection.innerHTML = '';
    interviewList.forEach(interview => {
        const div = document.createElement('div');
        div.className = "space-y-5 p-6 shadow-sm rounded-lg border";
        div.innerHTML = `
            <div class="flex justify-between">
                <div>
                    <h1 class="text-[#002C5C] text-lg font-semibold job-header">${interview.jobHeader}</h1>
                    <p class="text-[#64748B] job-discription">${interview.jobDiscibtion}</p>
                </div>
            </div>
            <p class="text-[#64748B] requirment">${interview.jobRequirment}</p>
            <button class="btn btn-soft btn-primary applied-button">${interview.appliedButton}</button>
            <p class="text-[#323B49] mb-5 recomend">${interview.jobRecomend}</p>
            <div class="flex gap-5">
                <button class="btn btn-success btn-outline interview-button">INTERVIEW</button>
                <button class="btn btn-outline btn-error reject-btn">REJECTED</button>
            </div>
        `;
        filSection.appendChild(div);
    });
}

function createReject() {
    filSection.innerHTML = '';
    rejectedList.forEach(reject => {
        const div = document.createElement('div');
        div.className = "space-y-5 p-6 shadow-sm rounded-lg border";
        div.innerHTML = `
            <div class="flex justify-between">
                <div>
                    <h1 class="text-[#002C5C] text-lg font-semibold job-header">${reject.jobHeader}</h1>
                    <p class="text-[#64748B] job-discription">${reject.jobDiscibtion}</p>
                </div>
            </div>
            <p class="text-[#64748B] requirment">${reject.jobRequirment}</p>
            <button class="btn btn-soft btn-primary applied-button">${reject.appliedButton}</button>
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