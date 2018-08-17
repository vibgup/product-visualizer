var config = {
  sofas: {
    1: {
      x: 330,
      y: 410,
      width: 375,
      height: 142.5,
    },
    2: {
      x: 330,
      y: 410,
      width: 375,
      height: 142.5,
    },
    3: {
      x: 330,
      y: 370,
      width: 375,
      height: 219,
    }
  },
  tables: {
    1: {
      x: 370,
      y: 430,
      width: 300,
      height: 200,
    },
    2: {
      x: 370,
      y: 430,
      width: 300,
      height: 200,
    },
    3: {
      x: 370,
      y: 430,
      width: 300,
      height: 200,
      defects: {
        1: {
          text: 'Minor scratches and chip off on top',
          image: 'https://img8.gozefo.com/p/8/7/2/0/6/6/5/2/7/7/1/9/4/4/6/7/7/0/3/0-mobile_main.jpg',
          x: 1/2,
          y: 0.15,
        },
        2: {
          text: 'Minor dents on top and sides',
          image: 'https://img8.gozefo.com/p/8/8/8/0/5/6/6/6/5/2/6/2/3/5/3/1/6/8/6/0-mobile_main.jpg',
          x: 0.08,
          y: 1/5,
        },
        3: {
          text: 'Bent at leg',
          image: 'https://img10.gozefo.com/p/7/3/1/2/1/8/0/9/8/4/4/8/5/2/0/0/5/6/8/0-mobile_main.jpg',
          x: 0.87,
          y: 0.6,
        },

      }
    }
  }
}
var canvasWrapper = document.getElementById("canvasWrapper");
var backgroundCanvas = document.getElementById("backgroundLayer");
var backGroundCtx = backgroundCanvas.getContext("2d");
backGroundCtx.font = "30px Arial";
backGroundCtx.fillStyle = "#5AC6C7";


var background = new Image();
var sofa = new Image();
var table = new Image();

background.onload = function() {
  backGroundCtx.drawImage(background , 0,  0);
}

background.src = "./Backgrounds/3.jpeg";
sofa.src = "./Sofas/3.png"
table.src = "./Tables/3.png"
table.id = 3;
sofa.id = 3;

function draw(){
  backGroundCtx.drawImage(background , 0,  0);
  backGroundCtx.drawImage(sofa, config.sofas[sofa.id].x, config.sofas[sofa.id].y, config.sofas[sofa.id].width, config.sofas[sofa.id].height);
  backGroundCtx.drawImage(table, config.tables[table.id].x, config.tables[table.id].y, config.tables[table.id].width, config.tables[table.id].height);
  if (config.tables[table.id].defects && config.tables[table.id].defects[1].text) {
    var defects = config.tables[table.id].defects;
    Object.keys(defects).forEach((key) => {
      var left = config.tables[table.id].x + defects[key].x * config.tables[table.id].width;
      var top = config.tables[table.id].y + defects[key].y * config.tables[table.id].height;
      $( `<div class="defectNumber" id="${key}" data-product="tables">${key}</div>` ).css({top: top, left: left}).appendTo( "#canvasWrapper" );
    })
  } else {
    $('.defectNumber').remove();
  }
}

var images = [background, sofa, table];

var imageCount = images.length;
var imagesLoaded = 0;

for(var i=0; i<imageCount; i++){
    images[i].onload = function(){
        imagesLoaded++;
        if(imagesLoaded == imageCount){
            allLoaded();
        }
    }
}

function allLoaded(){
    draw()
}

$("#tableCarousel li").click(function() {
    backGroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    if (this.id !== 'remove') {
      table.src = `./Tables/${this.id}.png`
      table.id = this.id;
      table.onload = function() {
        // tableCtx.scale(2, 2)
        draw();
      }
    }
});

$("#sofaCarousel li").click(function() {
    backGroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    if (this.id !== 'remove') {
      sofa.src = `./Sofas/${this.id}.png`
      sofa.id = this.id;
      sofa.onload = function() {
        // sofaCtx.scale(2, 2)
        draw();
      }
    }
});

$(".defectNumber").click(function() {
    console.log(this.id);
});

$('.carouselWrapper').on('click', '.defectNumber', function(){
    // do something here
    console.log(this.id);
    
});


// backGroundCtx.scale(1.5,1.5);
