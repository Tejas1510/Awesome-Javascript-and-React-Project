
function getDateTimeStamp(){
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1;
    let dd = currentDate.getDate();
    const hh =  currentDate.getHours();
    const min = currentDate.getMinutes();
    const ss = currentDate.getSeconds();
    let today;
    try {
        //
        if(dd<10){ dd=`0${dd}`;} 
        //
        if(mm<10) { mm=`0${mm}`;} 
        //
        today = yyyy + '' + mm + '' + dd + '' + hh + '' + min + '' +ss;
        
    } catch (error) {
        log('methods.js/getDateTimeStamp : ' + error);
        today = '';
    }
    return today;
}


function getDateMySQL(){
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1;
    let dd = currentDate.getDate();
    let today;
    try {
        //
        if(dd<10){ dd=`0${dd}`;} 
        //
        if(mm<10) { mm=`0${mm}`;} 
        //
        today = yyyy + '-' + mm + '-' + dd;
        
    } catch (error) {
        log('methods.js/getDateMySQL : ' + error);
        today = '';
    }
    return today;
}

function getDate(){
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1;
    let dd = currentDate.getDate();
    let today;
    try {
        //
        if(dd<10){ dd=`0${dd}`;} 
        //
        if(mm<10) { mm=`0${mm}`;} 
        //
        today = yyyy + '' + mm + '' + dd
        
    } catch (error) {
        log('methods.js/getDate : ' + error);
        today = '';
    }
    return today;
}

function getDTS(){
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1;
    let dd = currentDate.getDate();
    let hh =  currentDate.getHours();
    let min = currentDate.getMinutes();
    let ss = currentDate.getSeconds();
    let ms =  currentDate.getMilliseconds();
    let now = 0;
    try {
        //
        if(dd<10){ dd=`0${dd}`;} 
        //
        if(mm<10) { mm=`0${mm}`;} 
        //
        if(hh<10) {hh= `0${hh}`;}
        //
        if(min<10) {min= `0${min}`;}
        //
        if(ss<10) {ss= `0${ss}`;}
        //
        if(ms<10) {ms= `00${ms}`;}
        if(ms<100) {ms= `0${ms}`;}
        
        //
        now = (yyyy + '' + mm + '' + dd + '' + hh + '' + min + '' + ss + '.' + ms);
        now = new Date().getTime();
        return now;
    } catch (error) {
        console.log(new Date() + ': methods.js/getDTS: Catch: ' + error + ' : ' + message);
    }
}


module.exports = {getDateTimeStamp, getDate, getDTS, getDateMySQL};