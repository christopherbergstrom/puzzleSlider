$(document).ready(function()
{
  makeMenu();
  function makeMenu()
  {
    $("body").append("<div id='menuContainer'/>");
    $("#menuContainer").append("<div id='text'>How big do you want your puzzle?</div>");
    $("#menuContainer").append("<select><option id='4'>4x4</option><option id='5'>5x5</option></select>");
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
    console.log(size);
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
    for (var i = 1; i < (Math.pow(size, 2)); i++)
    {
      possibleNums.push(i);
    }
    console.log(possibleNums);
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
        }
        else
        {
          let num = Math.floor(Math.random()*possibleNums.length);
          console.log(num);
          console.log(possibleNums);
          puzzleArray[i][j] = possibleNums[num];
          $("#col"+i+""+j+"").html(possibleNums[num]);
          possibleNums.splice(num, 1);
          console.log(possibleNums);
        }
      }
    }
    console.log(puzzleArray);
    $("#container > div > div").click(function()
    {
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
        var num = $(this).html();
        // assigns current empty div the above number
        empty.html(num);
        // makes the clicked on div the new empty div
        empty = $("#"+$(this).attr("id"));
        // removes number of new empty div
        empty.html(".");
      }
    });
  }
  function checkWin()
  {
    // implement this here
  }
});
