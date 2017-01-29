$(document).ready(function () {
    console.log('Window loaded!');
    window['robot'] = '';
    let nameInput = $('input#roboName');
    nameInput.focus().select();
    $('input').focus(function () {
        $(this).select();
    }).addClass('grayed');
    nameInput.keypress(function () {
        if (event.keyCode === 13) roboCreate();
    });
    $('input#roboCharge').keypress(function () {
        if (event.keyCode === 13) {
            $('div#info').prepend(`<p class="info">${roboCharge()}</p>`);
        }
    });
    $('input#roboMoveX').keypress(function () {
        if (event.keyCode === 13) $('input#roboMoveY').focus().select();
    });
    $('input#roboMoveY').keypress(function () {
        if (event.keyCode === 13) {
            $('div#info').prepend(`<p class="info">${roboMove()}</p>`);
        }
    });
    $('button#createBtn').click(roboCreate);
    $('button#roboStatus').click(function (){
        $('div#info').prepend(`<p class="info">${roboStatus()}</p>`);
        }
    );
    $('button#chargeButton').click(function (){
        $('div#info').prepend(`<p class="info">${roboCharge()}</p>`);
    });
    $('button#moveButton').click(function (){
        $('div#info').prepend(`<p class="info">${roboMove()}</p>`);
    });
    $('select#roboSelect').change(function () {
        robot = $('select#roboSelect').val();
        console.log(robot);
    });
});

function roboCreate() {
    let input = $('input#roboName');
    let name = input.val();
    if (name == '') {
        return 'Robot name can not be empty';
    } else {
        window[name] = new Robot(name);
        console.log('Robot created');
        $('select#roboSelect').append(`<option value="${name}" selected="selected">${name}</option>`);
        robot = name;
        input.val('');
    }
}

function roboStatus() {
    if (window[robot] === '') {
        return 'Create robot first';
    } else {
        return window[robot].status();
    }
}

function roboCharge() {
    if (robot === '') {
        return 'Create robot first';
    } else {
        let test = $('input#roboCharge');
        test.removeClass('grayed');
        test = parseInt(test.val());
        return window[robot].charge(test);
    }
}

function roboMove() {
    let x = $('input#roboMoveX').val();
    let y = $('input#roboMoveY').val();
    $('input[id^="roboMove"]').removeClass('grayed');
    return window[robot].move(x, y);
}