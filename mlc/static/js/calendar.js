document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentWeekTasks').style.display = "none";
    document.getElementById('completedTasks').style.display = "none";
    document.getElementById('goToCompleted').addEventListener('click', (e) => {
        let completedTasks = document.getElementById('completedTasks');
        let lifeCalendar = document.getElementById('lifeCalendar');
        if (e.target.dataset.pressed == 'false'){
            lifeCalendar.style.display = "none";
            completedTasks.style.display = "block";
            e.target.dataset.pressed = true;
        }else{
            completedTasks.style.display = "none";
            lifeCalendar.style.display = "block";
            e.target.dataset.pressed = false;
        }
    });

    document.getElementById('goToCurrent').addEventListener('click', (e) => {
        let goToCompletedBtn = document.getElementById('goToCompleted');
        let completedTasks = document.getElementById('completedTasks');
        let lifeCalendar = document.getElementById('lifeCalendar');
        let currentTasks = document.getElementById('currentWeekTasks');
        if (goToCompletedBtn.dataset.pressed == 'true'){
            completedTasks.style.display = 'none';
            lifeCalendar.style.display = 'block';
            goToCompletedBtn.dataset.pressed = false;
        } else{
            lifeCalendar.style.display = 'none';
            currentTasks.style.display = 'block';
        }
    });
});


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
