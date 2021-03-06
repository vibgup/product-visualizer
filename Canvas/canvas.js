const config = {
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
    },
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
          x: 1 / 2,
          y: 0.15,
        },
        2: {
          text: 'Minor dents on top and sides',
          image: 'https://img8.gozefo.com/p/8/8/8/0/5/6/6/6/5/2/6/2/3/5/3/1/6/8/6/0-mobile_main.jpg',
          x: 0.08,
          y: 1 / 5,
        },
        3: {
          text: 'Bent at leg',
          image: 'https://img10.gozefo.com/p/7/3/1/2/1/8/0/9/8/4/4/8/5/2/0/0/5/6/8/0-mobile_main.jpg',
          x: 0.87,
          y: 0.6,
        },

      },
    },
  },
};
const canvasWrapper = document.getElementById('canvasWrapper');
const backgroundCanvas = document.getElementById('backgroundLayer');
const backGroundCtx = backgroundCanvas.getContext('2d');
backGroundCtx.font = '30px Arial';
backGroundCtx.fillStyle = '#5AC6C7';


const background = new Image();
const sofa = new Image();
const table = new Image();

background.onload = function () {
  backGroundCtx.drawImage(background, 0, 0);
};

background.src = './Backgrounds/3.jpeg';
sofa.src = './Sofas/3.png';
table.src = './Tables/3.png';
table.id = 3;
sofa.id = 3;

function draw() {
  backGroundCtx.drawImage(background, 0, 0);
  if (sofa.draw) {
    backGroundCtx.drawImage(sofa, config.sofas[sofa.id].x, config.sofas[sofa.id].y, config.sofas[sofa.id].width, config.sofas[sofa.id].height);
  }
  $('.defectNumber').remove();
  $('.defectWrapper').css({ display: 'none' });
  if (table.draw) {
    backGroundCtx.drawImage(table, config.tables[table.id].x, config.tables[table.id].y, config.tables[table.id].width, config.tables[table.id].height);
    if (config.tables[table.id].defects && config.tables[table.id].defects[1].text) {
      const defects = config.tables[table.id].defects;
      Object.keys(defects).forEach((key) => {
        const left = config.tables[table.id].x + defects[key].x * config.tables[table.id].width;
        const top = config.tables[table.id].y + defects[key].y * config.tables[table.id].height;
        $(`<div class="defectNumber" id="${key}" data-table-id="${table.id}" data-product="tables">${key}</div>`).css({ top, left }).appendTo('#canvasWrapper');
        $('.defectNumber').off();

        // Re-add event handler for all matching elements
        $('.defectNumber').on('click', function () {
          $('.defectWrapper').css({ display: 'block' });
          const defect = config[$(this).data('product')][$(this).data('table-id')].defects[this.id];
          const defectEle = $(`<div class="defectText">${defect.text}</div><img class="defectImage" src="${defect.image}"/>`);
          $('.defectWrapper').html(defectEle).css({ top: $(this).position().top - 300, left: $(this).position().left });
        });
      });
    }
  }
}

const images = [background, sofa, table];

const imageCount = images.length;
let imagesLoaded = 0;

for (let i = 0; i < imageCount; i++) {
  images[i].onload = function () {
    imagesLoaded++;
    if (imagesLoaded == imageCount) {
      allLoaded();
    }
  };
}

function allLoaded() {
  table.draw = true;
  sofa.draw = true;
  draw();
}

$('#tableCarousel li').click(function () {
  backGroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  if (this.id !== 'remove') {
    table.src = `./Tables/${this.id}.png`;
    table.id = this.id;
    table.draw = true;
    table.onload = function () {
      // tableCtx.scale(2, 2)
      draw();
    };
  } else {
    table.draw = false;
    draw();
  }
});

$('#sofaCarousel li').click(function () {
  backGroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  if (this.id !== 'remove') {
    sofa.src = `./Sofas/${this.id}.png`;
    sofa.id = this.id;
    sofa.draw = true;
    sofa.onload = function () {
      // sofaCtx.scale(2, 2)
      draw();
    };
  } else {
    sofa.draw = false;
    draw();
  }
});


// backGroundCtx.scale(1.5,1.5);
