$(document).ready(function()
{
  makeMenu();
  function makeMenu()
  {
    $("body").append("<div id='menuContainer'/>");
    $("#menuContainer").append("<div id='text'>How big do you want your puzzle?</div>");
    let option1 = "<option id='3'>3x3</option>";
    let option2 = "<option id='4'>4x4</option>";
    let option3 = "<option id='5'>5x5</option>";
    $("#menuContainer").append("<select>"+option1+option2+option3+"</select>");
    $("#menuContainer").append("<button>Make Puzzle</button>");
    $("button").click(function()
    {
      // makePuzzle(parseInt($("select > option").attr("id")));
      makePuzzle(parseInt($("select").val().split("")[0]));
      // makePuzzle(size);
      $("#menuContainer").remove();
    });
  }
  function makePuzzle(size)
  {
    var empty;
    // console.log(size);
    // makes array depending on what size the user chooses
    var puzzleArray = [];
    for (let i = 0; i < size; i++)
    {
      tempArray = [];
      for (let j = 0; j < size; j++)
      {
        tempArray.push("");
      }
      puzzleArray.push(tempArray);
    }
    $("body").append("<div id='container'/>");
    var first = true;
    // console.log(Math.pow(size, 2));
    var possibleNums = [];
    // array of possible numbers based on the size of the array/puzzle
    for (var i = 1; i < (Math.pow(size, 2)); i++)
    {
      possibleNums.push(i);
    }
    // console.log(possibleNums);
    for (let i = 0; i < size; i++)
    {
      $("#container").append("<div id='row"+i+"'/>");
      for (let j = 0; j < size; j++)
      {
        $("#row"+i+"").append("<div id='col"+i+""+j+"'/>");
        if (first)
        {
          first = false;
          puzzleArray[i][j] = 0;
          $("#col"+i+""+j+"").html(".");
          // $("#col"+i+""+j+"").html("0");
          empty = $("#col"+i+""+j+"");
          empty.css("background-color", "#ffffff");
        }
        else
        {
          // random number from array of possibleNums
          let num = Math.floor(Math.random()*possibleNums.length);
          // console.log(num);
          // console.log(possibleNums);
          puzzleArray[i][j] = possibleNums[num];
          $("#col"+i+""+j+"").html(possibleNums[num]);
          possibleNums.splice(num, 1);
          // console.log(possibleNums);
        }
      }
    }
    // adjusts the width of the rows to fit size of the puzzle
    $("#container > div").css("width", (size*50)+"px");
    console.log(puzzleArray);
    $("#container > div > div").mousedown(function()
    {
      // console.log(puzzleArray);
      // current empty block coordinates
      var coor1 = empty.attr("id").split("");
      var x1 = parseInt(coor1[coor1.length-2]);
      var y1 = parseInt(coor1[coor1.length-1]);
      // clicked on coordinates
      var coor2 = $(this).attr("id").split("");
      var x2 = parseInt(coor2[coor2.length-2]);
      var y2 = parseInt(coor2[coor2.length-1]);
      // console.log("x1: "+x1);
      // console.log("y1: "+y1);
      // console.log("x2: "+x2);
      // console.log("y2: "+y2);
      // // right
      // console.log(x1 === x2 && y1+1 === y2);
      // // left
      // console.log(x1 === x2 && y1-1 === y2);
      // // down
      // console.log(x1+1 === x2 && y1 === y2);
      // // up
      // console.log(x1-1 === x2 && y1 === y2);
      if (x1 === x2 && y1+1 === y2 || x1 === x2 && y1-1 === y2 || x1+1 === x2 && y1 === y2 || x1-1 === x2 && y1 === y2)
      {
        // gets number of clicked on div
        var num = parseInt($(this).html());
        // assigns current empty div the above number
        empty.html(num);
        // makes the current empty div background-color black
        empty.css("background-color", "#000000");
        puzzleArray[x1][y1] = num;
        // makes the clicked on div the new empty div
        empty = $("#"+$(this).attr("id"));
        // removes number of new empty div
        empty.html(".");
        // makes the new empty div background-color white
        empty.css("background-color", "#ffffff");
        puzzleArray[x2][y2] = 0;
      }
    }).mouseup(function()
    {
      checkWin(puzzleArray);
    });
  }
  function checkWin(puzzleArray)
  {
    // console.log(puzzleArray);
    let tracker = 0;
    let puzzleSolved = true;
    // goes through each element of each array
    // when the solved, numbers should go 0-(size of array-1) which is why the tracker is incremented
    // if any element !== the tracker #, the puzzleSolved variable is made false and the test fails
    for (var i = 0; i < puzzleArray.length; i++)
    {
      for (var j = 0; j < puzzleArray[i].length; j++)
      {
        // console.log(puzzleArray[i][j]);
        // console.log(tracker);
        if (puzzleArray[i][j] !== tracker)
          puzzleSolved = false;
        // else
        tracker++;
      }
    }
    // console.log("");
    if (puzzleSolved)
    {
      $("#container > div > div").unbind("mousedown mouseup");
      setTimeout(function()
      {
        alert("You win!");
      }, 500);
    }
  }
});
