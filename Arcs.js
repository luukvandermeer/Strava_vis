//    d3.json("test.json", function(data) {})

var width = window.innerWidth,
  height = window.innerHeight;

// append svg to the DIV
d3.select(".chart").append("svg:svg")
  .attr("width", width)
  .attr("height", height)


  var render = function(dataset) {
  vis = d3.select("svg"); // select the svg

  // set constants
  var PI = Math.PI;
  var arcMin = 10; // inner radius of the first arc
  var arcWidth = 3; // width
  var arcPad = 1; // padding between arcs
  //  var start_time = [0];    //startdataset


  // arc accessor
  //  d and i are automatically passed to accessor functions,
  //  with d being the data and i the index of the data
  var drawArc = d3.svg.arc()
    .innerRadius(function(d, i) {
      return arcMin + i * (arcWidth) + arcPad;
    })
    .outerRadius(function(d, i) {
      return arcMin + (i + 1) * (arcWidth);
    })
    .startAngle(0)
    .endAngle(function(d, i) {
      return d * 6 * (PI / 180);
    });

  // bind the data
  var arcs = vis.selectAll("path.arc-path").data([0, 2, 0, 0, 8, 12, 25, 50, 60, 59, 0, 8, 12, 25, 50, 60, 59, 0, 8, 12, 25, 50, 60, 59, 2, 0, 0, 8,
     12, 25, 50, 60, 59, 0, 8, 12, 25, 50, 0, 8, 12, 25, 50, 60, 59, 0, 8, 12, 25]);

  /* Comment --> overbodige code welke een functie aanroept om de kleuren aan te passen
            // *** update existing arcs -- redraw them ***
          arcs.attr("d", drawArc)
              .attr("fill", function(d){
                  // we need to redefine the fills as well since we have new data,
                  //  otherwise the colors would no longer be relative to the data
                  //  values (and arc length). if your fills weren't relative to
                  //  the data, this would not be necessary
                var grn = Math.floor((1 - d/60)*255);
                return "rgb(0, "+ grn +", 0)";
              });
  */

  // draw arcs for new data
  arcs.enter().append("svg:path")
    .attr("class", "arc-path") // assigns a class for easier selecting
    .attr("transform", "translate(400,200)") // sets position--easier than setting x's and y's
    .attr("fill", "rgb(0, 204, 204)")
//      .on('mouseover', tip.show)
//    .on('mouseout', tip.hide)

    /* Luuk --> code om o.b.v. waarde en een functie de kleur aan te passen
                .attr("fill", function(d){
                      // fill is an rgb value with the green value determined by the data
                      // smaller numbers result in a higher green value (1 - d/60)
                      // you should also look into using d3 scales to create gradients
                    var grn = Math.floor((1 - d/60)*15);
                    return "rgb(0, "+ grn +", 0)";
                  })
    */

    .attr("d", drawArc); // draw the arc
};


// you can safely ignore the code below.
//  the code is used to create a click area for people to regenerate
//  arcs by generating a new data set and calling render on that set
// for generating a random array of times
var generateTimes = function(quantity) {
  var i, times = [];

  for (i = 0; i < quantity; i++) {
    times.push(Math.round(Math.random() * 60));
  }
  return times;
};


// drawing the click area
var initialize = function() {
  var arcMin = 365 / 2; // this should match the arcMin in render()
  var times = generateTimes(300);
  render(times);




  /* Comment --> Maakt een innercircle welke niet nodig is

            // making the click circle
          if(!d3.selectAll("circle.click-circle")[0].length) {    // if there is no click area..
            d3.select("svg").append("circle")
                .attr("class", 'click-circle')
                .attr("transform", "translate(400,200)")
                .attr("r", arcMin*0.85)
                .attr("fill", "rgba(201, 201, 201, 0.5)")
                .on("click", function(d) {
                  times = generateTimes(6);
                  render(times);
                });
          }
  */
}

initialize();

d3.selectAll(".arc-path").each( function(d, i){
    console.log(i);
});
