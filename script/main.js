$(document).ready(function () {
    console.log('Window loaded!');
    $('button#createBtn').click(buttonHigh);
    $('button#roboStatus').click(callStatus);
});


function buttonHigh() {
    let name = $('input#roboName').val();
    window[name] = new Robot(name);
    console.log('Clicked');
}

function callStatus(robot) {
    robot = $('input#roboName').val();
    alert(window[robot].status());
}