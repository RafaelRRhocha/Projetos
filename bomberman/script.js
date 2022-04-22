kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  debug: true,
  clearColor: [0,0,0,1]
})
 const player_speed = 120;
 const enemy_speed = 60;

loadRoot('imgs/');

loadSprite('wall-steel', 'wall-steel.png'); 
loadSprite('brick-red', 'brick-red.png');
loadSprite('door', 'door.png');
loadSprite('kaboom', 'kaboom.png');
loadSprite('bg', 'bg.png');
loadSprite('wall-gold', 'wall-gold.png');
loadSprite('brick-wood', 'brick-wood.png');

loadSprite('bomberman', 'bomberman.png', {
  sliceX: 7,
  sliceY: 4,
  anims: {
    idleLeft: { from: 21, to: 21 },
    idleRight: { from: 7, to: 7 },
    idleUp: { from: 0, to: 0 },
    idleDown: { from: 14, to: 14 },

    moveLeft: { from: 22 , to: 27  },
    moveRigth: { from: 8, to: 13 },
    moveUp: { from: 1, to: 6 },
    moveDown: { from: 15, to: 20 },    
  }
});

loadSprite('boomber', 'boomber.png', {
  sliceX: 3,

  anims: {
    move: { from: 0, to: 2 },
  }
})

loadSprite('baloon', 'baloon.png', { sliceX: 3 })
loadSprite('ghost', 'ghost.png', { sliceX: 3 })
loadSprite('slime', 'slime.png', { sliceX: 3 })

loadSprite('explosion', 'explosion.png', { 
  sliceX: 5,
  sliceY: 5,
})


scene('game', ({level, score}) => {
  layers(['bg', 'obj', 'ui'], 'obj');

  const maps = [
    [
      'aaaaaaaaaaaaaaa',
      'azzzz *  zzzzda',
      'azazazazazazaza',
      'azzzzzzzzzzzzza',
      'azazazazazaza a',
      'azzzz* zzzzzz}a',
      'azazazazazaza a',
      'a zzzzzzzzzzz a',
      'a azazazazazada',
      'a  zzzzzzzzzzza',
      'a azaza  & zaza',
      'azzzzzzzzzzzzza',
      'azazazazazazaza',
      'azzzzz   &   za',
      'aaaaaaaaaaaaaaa',
    ],
    [
      'bbbbbbbbbbbbbbb',
      'bwwww  *wwwwwpb',
      'bwbwbwbwbwbwbwb',
      'b      *      b',
      'bwbwbwbwbwbwb b',
      'bwwww* wwwwwwwb',
      'bwbwbwbwb bwb b',
      'b wwwpwww}www b',
      'b bwbwbwb bwbwb',
      'b  wwwwwwwwwwwb',
      'b bwbwbwbwbwbwb',
      'bwww  &   wwwwb',
      'bwbwbwbwbwbwbwb',
      'bwwwww   &   wb',
      'bbbbbbbbbbbbbbb',
    ]
  ]

  const levelCfg = {
    width: 26,
    height: 26,
    a: [sprite('wall-steel'), 'wall-steel', solid(), 'wall'],
    z: [sprite('brick-red'), 'wall-brick', solid(), 'wall'],
    d: [sprite('brick-red'), 'wall-brick-dool', solid(), 'wall'],
    b: [sprite('wall-gold'), 'wall-gold', solid(), 'wall'],
    w: [sprite('brick-wood'), 'wall-brick', solid(), 'wall'],
    p: [sprite('brick-wood'), 'wall-brick-dool', solid(), 'wall'],
    t: [sprite('door'), 'door', 'wall'],    
    '}': [sprite('ghost'), 'dangerous', 'ghost', { dir: -1, timer: 0 }],
    '&': [sprite('slime'), 'slime', { dir: -1 }, 'dangerous', { timer: 0 }],    
    '*': [sprite('baloon'), 'baloon', { dir: -1 }, 'dangerous', { timer: 0 }],
  }

  const gameLevel = addLevel(maps[level], levelCfg);

  add([sprite('bg'), layer('bg')])


  const scoreLabel = add([
    text('Score: ' + score),
    pos(400, 30),
    layer('ui'),
    {
      value: score,
    },
    scale(1)
  ])

  add([text('Level: ' + parseInt(level + 1)), pos(400, 60), scale(1)])
  add([text('Controles: (setinhas do teclado)'), pos(400, 90), scale(0.6)])
  add([text('Use space para colocar a bomba'), pos(400, 105), scale(0.6)])
  add([text('Desenvolvido Por Rafael Rocha - 2022'), pos(400, 370), scale(0.5)])

  const player = add([
    sprite('bomberman', {
      animeSpeed: 0.1,
      frame: 14,
    }),
    pos(20,190),
    { dir: vec2(1,0) },
  ])

  player.action(() => {
    player.pushOutAll()
  })

  keyDown('left', () => {
    player.move(-player_speed, 0);
    player.dir = vec2(-1, 0);
  })

  keyDown('right', () => {
    player.move(player_speed, 0);
    player.dir = vec2(1, 0);
  })

  keyDown('up', () => {
    player.move(0, -player_speed);
    player.dir = vec2(0, -1);
  })  

  keyDown('down', () => {
    player.move(0, player_speed);
    player.dir = vec2(0, 1);
  })   

  keyPress('left', () => {
    player.play('moveLeft')
  })

  keyPress('right', () => {
    player.play('moveRigth')
  })

  keyPress('up', () => {
    player.play('moveUp')
  })  

  keyPress('down', () => {
    player.play('moveDown')
  }) 
  
  keyRelease('left', () => {
    player.play('idleLeft')
  })

  keyRelease('right', () => {
    player.play('idleRight')
  })
  
  keyRelease('up', () => {
    player.play('idleUp')
  })

  keyRelease('down', () => {
    player.play('idleDown')
  })

  keyPress('space', () => {
    spawnBomber(player.pos.add(player.dir.scale(0)))
  })

  action('baloon', (s) => {
    s.pushOutAll();
    s.move(s.dir * enemy_speed, 0)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  action('slime', (s) => {
    s.pushOutAll();
    s.move(s.dir * enemy_speed, 0)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })  

  action('ghost', (s) => {
    s.pushOutAll();
    s.move(0 , s.dir * enemy_speed)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  }) 
  
  function spawnKaboom(p, frame){
    const obj = add([
      sprite('explosion', {
        animeSpeed: 0.1,
        frame: frame,
      }),
      pos(p),
      scale(1.5),
      'kaboom'
    ])

    obj.pushOutAll();
    wait(0.5, () => {
      destroy(obj);
    })
  }

  function spawnBomber(p){
    const obj = add([sprite('boomber'), ('move'), pos(p), scale(1.5), 'bomber']);
    obj.pushOutAll();
    obj.play("move");

    wait(4, () => {
      destroy(obj);

      obj.dir = vec2(1,0)
      spawnKaboom(obj.pos.add(obj.dir.scale(0)), 12)

      obj.dir = vec2(0, -1)
      spawnKaboom(obj.pos.add(obj.dir.scale(20)), 2)

      
      obj.dir = vec2(0, 1)
      spawnKaboom(obj.pos.add(obj.dir.scale(20)), 22)

      
      obj.dir = vec2(-1, 0)
      spawnKaboom(obj.pos.add(obj.dir.scale(20)), 10)

      obj.dir = vec2(1, 0)
      spawnKaboom(obj.pos.add(obj.dir.scale(20)), 14)

    })
  }

  player.collides('door', (d) => {
    go("game", {
      level: (level + 1) % maps.length,
      score: scoreLabel.value
    })
  })

  collides('kaboom', 'dangerous', (k,s) => {
    camShake(4);
     wait(1, () => {
       destroy(k)
     })
     destroy(s);
     scoreLabel.value++
     scoreLabel.text = 'Score: ' + scoreLabel.value
  })


  collides('kaboom', 'wall-brick', (k,s) => {
    camShake(4);
     wait(1, () => {
       destroy(k)
     })
     destroy(s);
  })

  collides('baloon', 'wall', (s) => {
    s.dir = -s.dir;
  })

  collides('slime', 'wall', (s) => {
    s.dir = -s.dir;
  })

  collides('ghost', 'wall', (s) => {
    s.dir = -s.dir;
  })

  collides('kaboom', 'wall-brick-dool', (k,s) => {
    camShake(4);
    wait(1, () => {
      destroy(k);
    })
    destroy(s);
    gameLevel.spawn('t', s.gridPos.sub(0,0))
  })
  
  player.collides('dangerous', () => {
    go('lose', {score: scoreLabel.value})
  })
})

scene('lose', ( { score } ) => {
  add([text('Score: '+ score, 32), origin('center'), pos(width() / 2, height() / 2)])

  keyPress('space', () => {
    go('game', { level: 0, score: 0 });
  })
})

go('game', { level: 0, score: 0 });