$(document).ready(function()
{
  // var img = new Image(200, 200);
  // img.src="song.png";
  // var img = "url('song.png')""url('song.png')";
  // console.log(img);
  // img.css({"width": "200px", "heigh":"200px"});
  // $("body").append(img);
  var empty;
  var puzzleArray = [["","","",""],["","","",""],["","","",""],["","","",""]];
  $("body").append("<div id='container'/>");
  var first = true;
  var count = 0;
  for (var i = 0; i < 4; i++)
  {
    $("#container").append("<div id='row"+i+"'/>");
    for (var j = 0; j < 4; j++)
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
        puzzleArray[i][j] = count;
        $("#col"+i+""+j+"").html(count);
      }
      count++;
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
      console.log($(this).html());
      var num = $(this).html();
      console.log(num);
      empty.html(num);
      empty = $("#"+$(this).attr("id"));
      empty.html(".");
    }
  });
});