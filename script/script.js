console.log('script.js');






// Button Toggle
let interviewList = [];
let rejectedList = [];



let totalJobCount = document.getElementById('total-count');
let interviewJobCount = document.getElementById('interview-count');
let rejectedJobCount = document.getElementById('reject-count');
const jobContainer = document.getElementById('job-container');
const mainContainer = document.querySelector('main');
const filSection = document.getElementById('filtered-section');
// console.log(mainContainer);

// count function

function calculateJobCount() {
    totalJobCount.innerText = jobContainer.children.length;
    interviewJobCount.innerText = interviewList.length;
    rejectedJobCount.innerText = rejectedList.length;
}
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
    selectedButton.classList.add('btn-info', 'text-white',);

    if (id == 'interview-filter-button') {
        jobContainer.classList.add('hidden');
        filSection.classList.remove('hidden');
    }

    else if (id == 'all-filter-button') {
        jobContainer.classList.remove('hidden');
        filSection.classList.add('hidden');
    }

    else if (id == 'rejecte-filter-button') {
        jobContainer.classList.add('hidden');
        filSection.classList.remove('hidden');
    }



}


mainContainer.addEventListener('click', function (event) {


    if (event.target.classList.contains('interview-button')) {

        const parentNode = event.target.parentNode.parentNode.parentNode;
        const jobHeader = parentNode.querySelector('.job-header').innerText;
        const jobDiscription = parentNode.querySelector('.job-discription').innerText;
        const requirment = parentNode.querySelector('.requirment').innerText;
        const appliedButton = parentNode.querySelector('.applied-button').innerText;
        const recomend = parentNode.querySelector('.recomend').innerText;
        parentNode.querySelector('.applied-button').innerText = 'Applied';



        const jobCardInfo = {
            jobHeader,
            jobDiscription,
            requirment,
            appliedButton: 'Applied',
            recomend
        }

        const repitation = interviewList.find(item => item.jobHeader == jobCardInfo.jobHeader);


        if (!repitation) {
            interviewList.push(jobCardInfo)
        }

        rejectedList = rejectedList.filter(item => item.jobHeader != jobCardInfo.jobHeader);

        calculateJobCount();
        createInterview()
    }
    else if (event.target.classList.contains('reject-btn')) {

        const parentNode = event.target.parentNode.parentNode.parentNode;
        const jobHeader = parentNode.querySelector('.job-header').innerText;
        const jobDiscription = parentNode.querySelector('.job-discription').innerText;
        const requirment = parentNode.querySelector('.requirment').innerText;
        const appliedButton = parentNode.querySelector('.applied-button').innerText;
        const recomend = parentNode.querySelector('.recomend').innerText;
        parentNode.querySelector('.applied-button').innerText = 'Rejected';



        const jobCardInfo = {
            jobHeader,
            jobDiscription,
            requirment,
            appliedButton: 'Rejected',
            recomend
        }

        const repitation = rejectedList.find(item => item.jobHeader == jobCardInfo.jobHeader);


        if (!repitation) {
            rejectedList.push(jobCardInfo)
        }

        interviewList = interviewList.filter(item => item.jobHeader != jobCardInfo.jobHeader);



        calculateJobCount();
        createInterview()
        createReject();
    }

})


function createInterview() {
    filSection.innerHTML = '';

    for (let interview of interviewList) {
        console.log(interview);
        let div = document.createElement('div');
        div.className = "space-y-5 p-6 shadow-sm rounded-lg";
        div.innerHTML = `
            <div class="flex justify-between">
                    <div>
                        <h1 class="text-[#002C5C] text-lg font-semibold leading-7 job-header">${interview.jobHeader}</h1>
                        <p class="text-[#64748B] job-discription">React Native Developer</p>
                    </div>
                    <div>
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                </div>
                <div>
                    <p class="text-[#64748B] leading-5 requirment">
                        Remote
                        •
                        Full-time
                        •
                        $130,000 - $175,000
                    </p>
                </div>
                <div>
                    <button class="text-[#002C5C] leading-5 btn btn-soft btn-primary applied-button">${interview.appliedButton}</button>
                </div>
                <div>
                    <p class="text-[#323B49] mb-5 leading-5 recomend">Build cross-platform mobile applications using React
                        Native. Work on products used by millions of users worldwide.</p>
                    <div class="flex gap-5">
                        <button class="btn btn-success btn-outline">INTERVIEW</button>
                        <button class="btn btn-outline btn-error">REJECTED</button>
                    </div>
                </div>
            `
        filSection.appendChild(div);
    }
}

function createReject() {
    filSection.innerHTML = '';

    for (let reject of rejectedList) {
        console.log(reject);
        let div = document.createElement('div');
        div.className = "space-y-5 p-6 shadow-sm rounded-lg";
        div.innerHTML = `
            <div class="flex justify-between">
                    <div>
                        <h1 class="text-[#002C5C] text-lg font-semibold leading-7 job-header">${reject.jobHeader}</h1>
                        <p class="text-[#64748B] job-discription">React Native Developer</p>
                    </div>
                    <div>
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                </div>
                <div>
                    <p class="text-[#64748B] leading-5 requirment">
                        Remote
                        •
                        Full-time
                        •
                        $130,000 - $175,000
                    </p>
                </div>
                <div>
                    <button class="text-[#002C5C] leading-5 btn btn-soft btn-primary applied-button">${reject.appliedButton}</button>
                </div>
                <div>
                    <p class="text-[#323B49] mb-5 leading-5 recomend">Build cross-platform mobile applications using React
                        Native. Work on products used by millions of users worldwide.</p>
                    <div class="flex gap-5">
                        <button class="btn btn-success btn-outline">INTERVIEW</button>
                        <button class="btn btn-outline btn-error">REJECTED</button>
                    </div>
                </div>
            `
        filSection.appendChild(div);
    }
}