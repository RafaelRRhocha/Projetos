kaboom({
  global: true,
  fullscreen: true, 
  scale: 1.5,
  clearColor: [0,0,0,1]
})

let isJumping = true;
let isBig = false;

loadRoot("imgs/");

loadSprite('bloco', 'bloco.png');
loadSprite('goomba', 'goomba.png');
loadSprite('surpresa', 'surpresa.png');
loadSprite('unboxed', 'unboxed.png');
loadSprite('moeda', 'moeda.png');
loadSprite('cogumelo', 'cogumelo.png');
loadSprite('mario', 'mario.png', {
  sliceX: 3.9,
  anims: {
    idle: {
      from: 0,
      to: 0,
    }, 
    move: {
      from: 1,
      to: 2,
    }
  }
});

loadSprite('tijolo', 'tijolo.png');
loadSprite('tubo-top-left', 'tubo-top-left.png');
loadSprite('tubo-top-right', 'tubo-top-right.png');
loadSprite('tubo-bottom-left', 'tubo-bottom-left.png');
loadSprite('tubo-bottom-right', 'tubo-bottom-right.png');
loadSprite('bloco-azul', 'bloco-azul.png');
loadSprite('tijolo-azul', 'tijolo-azul.png');
loadSprite('bloco-aco', 'bloco-aco.png');
loadSprite('goomba-azul', 'goomba-azul.png');
loadSprite('surpresa-azul', 'surpresa-azul.png');


scene('game', ({ level, score, big }) => {
  layer(['bg', 'obj', 'ui'], 'obj');

  const maps = [
      [   
        `=                                    =`,
        `=                                    =`,
        `=                                    =`,
        `=                                    =`,
        `=                      %             =`,
        `=                                    =`,
        `=      %      =*=%=                  =`,
        `=                                    =`,
        `=                            -       =`,
        `=           ^         ^              =`,
        `======================================`,
      ],
      [   
        `/                                    /`,
        `/                                    /`,
        `/                                    /`,
        `/        ||              $           /`,
        `/       *                            /`,
        `/      |                             /`,
        `/     %                              /`,
        `/                   z x              /`,
        `/                   x x x    -       /`,
        `/        ^     ^  x x x x x          /`,
        `||||||||||||||||||||||||||||||||||||||`,
      ],
      [
        `                                    /`,
        `                             $      /`,
        `                            %%%%%%  /`,
        `                     $              /`,
        `             %*    %%%%%            /`,
        `      %%%                           /`,
        `                                    /`,
        `                                    /`,
        `      ^    /   =  ^  ^    $    $    /`,
        `===========================    =====/`,
        `                          =    =    /`,
        `                                    /`,
        `        $                           /`,
        `      %*%                           /`,
        ` -           %                      /`,
        `             $    ^                 /`,
        `%%%%%%%%%%%%%%%%%%==================/`,
        `                                     `,
        `                                     `,
        `                                     `,
      ],
      [
        `=                                   =`,
        `=                                   =`,
        `=                                   =`,
        `=                                   =`,
        `=                                   =`,
        `=    ===*==       ^                 =`,
        `=                 = = = =           =`,
        `=              = = = = = =       -  =`,
        `=     z    z = = = = = = = =        =`,
        `=====================================`,
      ],
  ]

  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('bloco'), solid()],
    '$': [sprite('moeda'), 'moeda'],
    '%': [sprite('surpresa'), solid(), 'moeda-surpresa'],
    '*': [sprite('surpresa'), solid(), 'cogumelo-surpresa'],
    '}': [sprite('unboxed'), solid()],
    '^': [sprite('goomba'), 'dangerous'],
    '#': [sprite('cogumelo'), 'cogumelo'],

    '~': [sprite('tijolo'), solid()],
    '-': [sprite('tubo-top-left'), solid(), 'tubo', scale(1)],
    '+': [sprite('tubo-top-right'), solid(), 'tubo', scale(0.5)],
    '(': [sprite('tubo-bottom-left'), solid(), scale(0.5)],
    ')': [sprite('tubo-bottom-right'), solid(), scale(0.5)],
    '/': [sprite('tijolo-azul'), solid(), scale(0.5)],
    '|': [sprite('bloco-azul'), solid(), scale(0.5)],
    'z': [sprite('goomba-azul'), 'dangerous', body(), scale(0.5)],
    '@': [sprite('surpresa-azul'), 'moeda-surpresa', scale(0.5)],
    'x': [sprite('bloco-aco'), solid(), scale(0.5)]
  }

  const gameLevel = addLevel(maps[level], levelCfg);

  const scoreLabel = add([
    text('Moedas:' + score, 10),
    pos(35,10),
    layer('ui'),
    {
      value: score
    }
  ])

  add([text('level: ' +parseInt(level + 1), 10), pos(135, 10)])

  add([text('Controles: (setinhas do teclado) // Para passar de fase aperte Down(seta pra baixo)', 9), pos(25, 370)])
  add([text('Desenvolvido por Rafael Rocha - 2022', 8), pos(25, 385)])

  function big(){
    return {
      isBig(){
        return isBig;
      },
      smallify(){
        this.scale = vec2(1)
        isBig = false;
      },
      bigify() {
        this.scale = vec2(1.5)
        isBig = true;
      }
    }
  }

  const player = add([
    sprite('mario', {
      anims: {
        animSpeed: 0.1,
        from: 0,
      }
    }),
    solid(),
    big(),
    body(),
    pos(60, 0)
  ]);

  if(isBig) {
    player.bigify
  }

  keyDown('left', () => {
    player.flipX(true)
    player.move(-120, 0)
  });

  keyDown('right', () => {
    player.flipX(false)
    player.move(120, 0)
  });

  keyPress('up', () => {
    if(player.grounded()) {
      player.jump(390)
      isJumping = true;
    }
  });

  keyPress('left', () => {
    player.flipX(true)
    player.play('move')
  })

  keyPress('right', () => {
    player.flipX(false)
    player.play('move')
  })

  keyRelease('left', () => {
    player.play('idle')
  })

  keyRelease('right', () => {
    player.play('idle')
  })

  action('dangerous', (obj) => {
    obj.move(-20, 0)
  })

  player.action(() => {
    if (player.grounded()){
      isJumping = false;
    }
  })

  player.on('headbutt', (obj) => {
    if(obj.is('moeda-surpresa')) {
    gameLevel.spawn('$', obj.gridPos.sub(0, 1))
    destroy(obj)
    gameLevel.spawn('}', obj.gridPos.sub(0, 0))
    }

    if(obj.is('cogumelo-surpresa')) {
      gameLevel.spawn('#', obj.gridPos.sub(0, 1))
      destroy(obj)
      gameLevel.spawn('}', obj.gridPos.sub(0, 0))
    }
  })

  action('cogumelo', (obj) => {
    obj.move(25, 0)
  })

  player.collides('cogumelo', (obj) => {
    destroy(obj)
    player.bigify();
  })

  player.collides('dangerous', (obj) => {
    if(isJumping){
      destroy(obj)
    } else {
        if (isBig){
          player.smallify()
        } else {
          go('lose', ({score: scoreLabel.value}))
        }
    }
  })

  player.collides('moeda', (obj) => {
    destroy(obj)
    scoreLabel.value++
    scoreLabel.text = 'Moedas: ' +scoreLabel.value
  })

  player.collides('tubo', () => {
    keyPress('down', () => {
      go('game', {
        level: (level + 1) % maps.length,
        score: scoreLabel.value,
        big: isBig
      }) 
    })
  })

})

scene('lose', ({ score }) => {
  add([ text('Score: ' + score, 18), origin('center'), pos(width()/2, height()/2)])
  add([text('Aperte Space Para Reiniciar'), origin('center'), pos(width()/2, height()/3)])
  keyPress('space', () => {
    go('game', {level: 0, score: 0, big: isBig})
  })
})

go('game', ({ level: 0, score: 0, big: isBig }))