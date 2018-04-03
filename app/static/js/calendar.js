document.querySelectorAll('[class^="week"] > span').forEach((item) => {
    item.addEventListener('click', addTasks);
});

function addTasks(e){
    let yearNum = e.target.parentNode.parentNode.classList[0].replace('year', ''); 
    let weekNum = e.target.parentNode.classList[0].replace('week', '');
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
        console.log('test');
    });
}

function sendPost(url, data){
    return $.ajax({
        url: url,
        data: data,
        type: 'POST'
    });
}
