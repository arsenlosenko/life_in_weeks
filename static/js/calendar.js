document.querySelectorAll('[class^="week"] > span').forEach((item) => {
    console.log(item);
    item.addEventListener('click', addTasks);
});

function addTasks(e){
    alert(e.target.parentElement.classList);

}


function sendData(data){
    let dataHandler = '/sendTaskData';
    fetch(dataHandler, {method: "POST", body: data}).then(console.log(response));
}
