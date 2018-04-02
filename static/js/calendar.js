document.querySelectorAll('[class^="week"] > span').forEach((item) => {
    item.addEventListener('click', addTasks);
});

function addTasks(e){
    let yearNumClass = e.target.parentNode.parentNode.classList[0]; 
    let weekNumClass = e.target.parentNode.classList[0];
    let weekNum = weekNumClass.replace('week', '');
    let yearNum = yearNumClass.replace('year', '');
    let taskName = prompt('Enter task name');
    let taskDescription = prompt('Enter task description');
    let taskData = {
        name: taskName,
        text: taskDescription,
        weekNum: parseInt(weekNum),
        yearNum: parseInt(yearNum)
        }
    sendData(taskData);
}


function sendData(data){
    let url = '/sendTaskData';
    sendPost(url, data).done((resp) => {
        console.log(resp);
    });
}

function sendPost(url, data){
    return $.ajax({
        url: url,
        data: data,
        type: 'POST'
    });
}
