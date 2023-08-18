am4core.ready(function () {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create("chartdiv", am4plugins_timeline.CurveChart);
  chart.curveContainer.padding(0, 100, 0, 100);
  chart.maskBullets = false;

  var colorSet = new am4core.ColorSet();

  chart.data = [
    {
      category: "",
      year: "1887",
      size: 70,
      pos: 1,
      text: "Born on December 22 in Erode, Tamil Nadu, India.",
      smalltXt: "Birth",
    },
    {
      category: "",
      year: "1892",
      size: 70,
      pos: 2,
      text: "Shows early interest in mathematics, mastering basic concepts on his own.",
      smalltXt: "Interest",
    },
    {
      category: "",
      year: "1703",
      size: 70,
      pos: 3,
      text: "Begins independently exploring advanced mathematical topics and developing his unique theorems.",
      smalltXt: "Exploration",
    },
    {
      category: "",
      year: "1910",
      size: 70,
      pos: 4,
      text: "Publishes his first research paper on Bernoulli numbers and Euler's constant in the Journal of the Indian Mathematical Society.",
      smalltXt: "First Research",
    },
    {
      category: "",
      year: "1913",
      size: 70,
      pos: 5,
      text: "Corresponds with G.H. Hardy, a prominent mathematician at the University of Cambridge, who recognizes Ramanujan's exceptional talent.",
      smalltXt: "G.H. Hardy",
    },
    {
      category: "",
      year: "1914",
      size: 70,
      pos: 6,
      text: "Travels to England to work with Hardy at the University of Cambridge.",
      smalltXt: "England",
    },
    {
      category: "",
      year: "1916",
      size: 70,
      pos: 7,
      text: "Becomes a Fellow of the Royal Society, a prestigious honor for his groundbreaking work on partitions and mock theta functions.",
      smalltXt: "Royal Society",
    },
    {
      category: "",
      year: "1918",
      size: 70,
      pos: 8,
      text: "Ramanujan's health deteriorates due to illness and he returns to India.",
      smalltXt: "Poor Health",
    },
    {
      category: "",
      year: "1919",
      size: 70,
      pos: 9,
      text: "Continues to work on mathematics while battling health issues.",
      smalltXt: "Continues Work",
    },
    {
      category: "",
      year: "1920",
      size: 70,
      pos: 10,
      text: "Srinivasa Ramanujan passes away on April 26, at the age of 32, leaving behind notebooks filled with unpublished theorems and conjectures.",
      smalltXt: "Death",
    },
  ];

  chart.dateFormatter.inputDateFormat = "yyyy";

  chart.fontSize = 11;
  chart.tooltipContainer.fontSize = 11;

  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.grid.template.disabled = true;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.points = [
    { x: -400, y: 0 },
    { x: 0, y: 50 },
    { x: 400, y: 0 },
  ];
  dateAxis.renderer.polyspline.tensionX = 0.8;
  dateAxis.renderer.grid.template.disabled = true;
  dateAxis.renderer.line.strokeDasharray = "1,4";
  dateAxis.baseInterval = { period: "day", count: 1 }; // otherwise initial animation will be not smooth

  dateAxis.renderer.labels.template.disabled = true;

  var series = chart.series.push(new am4plugins_timeline.CurveLineSeries());
  series.strokeOpacity = 0;
  series.dataFields.dateX = "pos";
  series.dataFields.categoryY = "category";
  series.dataFields.value = "size";
  series.baseAxis = categoryAxis;

  var interfaceColors = new am4core.InterfaceColorSet();

  series.tooltip.pointerOrientation = "down";

  var distance = 100;
  var angle = 60;

  var bullet = series.bullets.push(new am4charts.Bullet());

  var line = bullet.createChild(am4core.Line);
  line.adapter.add("stroke", function (fill, target) {
    if (target.dataItem) {
      return chart.colors.getIndex(target.dataItem.index);
    }
  });

  line.x1 = 0;
  line.y1 = 0;
  line.y2 = 0;
  line.x2 = distance - 10;
  line.strokeDasharray = "1,3";

  var circle = bullet.createChild(am4core.Circle);
  circle.radius = 30;
  circle.fillOpacity = 1;
  circle.strokeOpacity = 0;

  var circleHoverState = circle.states.create("hover");
  circleHoverState.properties.scale = 1.3;

  series.heatRules.push({
    target: circle,
    min: 20,
    max: 70,
    property: "radius",
  });
  circle.adapter.add("fill", function (fill, target) {
    if (target.dataItem) {
      return chart.colors.getIndex(target.dataItem.index);
    }
  });
  circle.tooltipText = "{text}";
  circle.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.pixelRadius - 4;
  });

  var yearLabel = bullet.createChild(am4core.Label);
  yearLabel.text = "{year}";
  yearLabel.fontSize = 20;
  yearLabel.strokeOpacity = 0;
  yearLabel.fill = am4core.color("#fff");
  yearLabel.horizontalCenter = "middle";
  yearLabel.verticalCenter = "middle";
  yearLabel.interactionsEnabled = false;

  var label = bullet.createChild(am4core.Label);
  label.propertyFields.text = "smalltXt";
  label.strokeOpacity = 0;
  label.horizontalCenter = "right";
  label.verticalCenter = "middle";
  label.fontSize = 12;
  label.fill = am4core.color("#fff");

  label.adapter.add("opacity", function (opacity, target) {
    if (target.dataItem) {
      var index = target.dataItem.index;
      var line = target.parent.children.getIndex(0);

      if (index % 2 == 0) {
        target.y = -distance * am4core.math.sin(-angle);
        target.x = -distance * am4core.math.cos(-angle);
        line.rotation = -angle - 180;
        target.rotation = -angle;
      } else {
        target.y = -distance * am4core.math.sin(angle);
        target.x = -distance * am4core.math.cos(angle);
        line.rotation = angle - 180;
        target.rotation = angle;
      }
    }
    return 1;
  });

  var outerCircle = bullet.createChild(am4core.Circle);
  outerCircle.radius = 30;
  outerCircle.fillOpacity = 0;
  outerCircle.strokeOpacity = 0;
  outerCircle.strokeDasharray = "1,3";

  var hoverState = outerCircle.states.create("hover");
  hoverState.properties.strokeOpacity = 0.8;
  hoverState.properties.scale = 1.5;

  outerCircle.events.on("over", function (event) {
    var circle = event.target.parent.children.getIndex(1);
    circle.isHover = true;
    event.target.stroke = circle.fill;
    event.target.radius = circle.pixelRadius;
    event.target.animate(
      { property: "rotation", from: 0, to: 360 },
      4000,
      am4core.ease.sinInOut
    );
  });

  outerCircle.events.on("out", function (event) {
    var circle = event.target.parent.children.getIndex(1);
    circle.isHover = false;
  });

  chart.scrollbarX = new am4core.Scrollbar();
  chart.scrollbarX.opacity = 0.5;
  chart.scrollbarX.width = am4core.percent(50);
  chart.scrollbarX.align = "center";
}); // end am4core.ready()
