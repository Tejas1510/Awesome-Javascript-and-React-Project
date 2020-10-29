
  months = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
  }

    order = ["none", "first-", "second-", "third-", "fourth-", "fifth-", "sixth-"];
    days = [ "sun","mon", "tue", "wed", "thu", "fri", "sat"]


    let time = new Date();
    let month = time.getMonth()+1;
    let year = time.getFullYear();
    let hr = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();


    document.title = months[month] + " " + year;;
    let lastDay = new Date(year, month, 0).getDate()
    let daysOfTheMonth = [...Array(lastDay+1).keys()];
    daysOfTheMonth.shift();
    let firstDay = new Date(year,month-1,1).getDay();
    let headingEl = document.getElementById("month-year");
    headingEl.firstChild.nodeValue = months[month] + " " + year;

  let i=1

  for (day of daysOfTheMonth) {
      
      let dayOfTheWeek = new Date(year,month-1, day).getDay(); // 6
      if (dayOfTheWeek===0) {
        
          i++;
      }

      let realDayEl = document.getElementById(order[i]+days[dayOfTheWeek]);

      realDayEl.firstChild.nodeValue = day;
      
          if (String(day) === String(lastDay)){
              if (month === 12) {
                  nextMonth = 0
              }
            if (String(dayOfTheWeek) !== "6") {
                play = true
                j = 1;
                while (play === true) {
                
                    let dayOfTheWeek = new Date(year,month, j).getDay();
                    if (String(dayOfTheWeek) === "0") {
                        play = false
                    }
                    else {
                        let realDayEl = document.getElementById(order[i]+days[dayOfTheWeek]);
                        realDayEl.firstChild.nodeValue = daysOfTheMonth[j-1];
                        
                        j++
                    }
                }
            }
            else {
                i++;
                j=0;

                play1 = true;


                while (play1 === true) {
                    
                    if (String(j) === "7") {
                        play1 = false
                    } 
                    
                    else {
                        let El = document.getElementById(order[i]+days[j]);
                        El.firstChild.nodeValue = j+1;
                        j++
                    }
                }    
            }
          }   
  }


