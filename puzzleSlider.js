$(document).ready(function()
{
  var empty;
  var puzzleArray = [["","",""],["","",""],["","",""]];
  $("body").append("<div id='container'/>");
  var first = true;
  for (var i = 0; i < 3; i++)
  {
    $("#container").append("<div id='row"+i+"'/>");
    for (var j = 0; j < 3; j++)
    {
      $("#row"+i+"").append("<div id='col"+i+""+j+"'/>");
      if (first)
      {
        first = false;
        puzzleArray[i][j] = "";
        // $("#col"+i+""+j+"").html(" ");
        $("#col"+i+""+j+"").css("background-color", "black");
        empty = $("#col"+i+""+j+"");
      }
      else
      {
        puzzleArray[i][j] = "x";
        // $("#col"+i+""+j+"").html("x");
        $("#col"+i+""+j+"").css("background-color", "blue");
      }
    }
  }
  // console.log(puzzleArray);
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
    console.log("x1: "+x1);
    console.log("y1: "+y1);
    console.log("x2: "+x2);
    console.log("y2: "+y2);
    // right
    console.log(x1 === x2 && y1+1 === y2);
    // left
    console.log(x1 === x2 && y1-1 === y2);
    // down
    console.log(x1+1 === x2 && y1 === y2);
    // up
    console.log(x1-1 === x2 && y1 === y2);
    if (x1 === x2 && y1+1 === y2 || x1 === x2 && y1-1 === y2 || x1+1 === x2 && y1 === y2 || x1-1 === x2 && y1 === y2)
    {
      empty.css("background-color", "blue");
      empty = $("#"+$(this).attr("id"));
      // console.log($(this));
      // console.log($(this).attr("id"));
      empty.css("background-color", "black");
    }
  });
});