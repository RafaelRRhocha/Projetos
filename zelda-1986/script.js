kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  clearColor: [0, 0, 0, 1],
})

const player_speed = 130
const slicer_speed = 100
const skeletor_speed = 60

loadRoot('imgs/');

loadSprite('link-left', 'link-left.png');
loadSprite('link-right', 'link-right.png');
loadSprite('link-down', 'link-down.png');
loadSprite('link-up', 'link-up.png');
loadSprite('left-wall', 'left-wall.png');
loadSprite('top-wall', 'top-wall.png');
loadSprite('bottom-wall', 'bottom-wall.png');
loadSprite('right-wall', 'right-wall.png');
loadSprite('bottom-left-wall', 'bottom-left-wall.png');
loadSprite('bottom-right-wall', 'bottom-right-wall.png');
loadSprite('top-left-wall', 'top-left-wall.png');
loadSprite('top-right-wall', 'top-right-wall.jpg');
loadSprite('top-door', 'top-door.png');
loadSprite('fire-pot', 'fire-pot.png');
loadSprite('left-door', 'left-door.png');
loadSprite('lanterns', 'lanterns.png');
loadSprite('slicer', 'slicer.png');
loadSprite('skeletor', 'skeletor.png');
loadSprite('kaboom', 'kaboom.png');
loadSprite('stairs', 'stairs.png');
loadSprite('moeda', 'moeda.png');
loadSprite('bg', 'bg.png');

scene('game', ({ level, score, coins }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      'yccccccccw',
      'a        b',
      ') }   m  )',
      'a        b',
      'a       $b',
      'a        b',
      ')   }    )',
      'a        b',
      'xddddddddz',
    ],
    [
      'yccccccccw',
      'a((((((((b',
      ')    m   )',
      'a{       b',
      'a     }~$b',
      'a{       b',
      ')   ~  m )',
      'a((((((((b',
      'xddddddddz',
  ],
  [
      'ycc)cc)ccw',
      'a(   $  (b',
      'a  *     b',
      'a  }  }  b',
      'a     m  b',
      'a   }    b',
      'a  *     b',
      'a(      (b',
      'xdd)dd)ddz',
  ],
  [
      'yc))))))cw',
      'a    ~ ~ b',
      'a    *   )',
      'a   *{}} b',
      'a  } }$  b',
      'a   * m  b',
      'a }{ *}} )',
      'a    ~ ~ b',
      'xd))))))dz',
  ],
  ]

  const levelCfg = {
    width:48,
    height:48,
    'a': [sprite('left-wall'),solid(),'wall'],
    'b': [sprite('right-wall'),solid(),'wall'],
    'c': [sprite('top-wall'),solid(),'wall'],
    'm': [sprite('moeda'), 'moeda', scale(2)],
    'd': [sprite('bottom-wall'),solid(),'wall'],
    'w': [sprite('top-right-wall'),solid(),'wall'],
    'x': [sprite('bottom-left-wall'),solid(),'wall'],
    'y': [sprite('top-left-wall'),solid(),'wall'],
    'z': [sprite('bottom-right-wall'),solid(),'wall'],
    '%': [sprite('left-door'),'next-level'],
    '^': [sprite('top-door'),'next-level'],
    '$': [sprite('stairs'),'next-level'],
    '*': [sprite('slicer'), 'slicer', {dir: -1},'dangerous'],
    '~': [sprite('slicer'), 'verticalslicer', {dir: 1},'dangerous'],
    '}': [sprite('skeletor'),'skeletor',{dir: -1, timer: 0},'dangerous'],
    '{': [sprite('skeletor'),'horizontalskeletor',{dir: 1, timer: 0},'dangerous'],
    ')': [sprite('lanterns'),solid(),'wall'],
    '(': [sprite('fire-pot'),solid()],
}
addLevel(maps[level],levelCfg)

add([sprite('bg'), layer('bg')])

add([text('Inimigos Destruidos:', 15), pos(500,30)])

add([text('Level:' + parseInt(level), 15), pos(500,110)])

add([text('Desenvolvido por Rafael Rocha - 2022', 10), pos(500,380)])

const scoreLabel = add([
    text('0'),
    pos(800,30),
    layer('ui'),
    {
      value: score,
    },
    scale(2)
])

const coinsLabel = add([
  text('Moedas:' + coins, 15),
  pos(500,70),
  layer('ui'),
  {
    value: coins
  }
])

const player = add([
    sprite('link-right'),
    pos(10,190),
    scale(0.8),
    {
        dir:vec2(1,0)
    }
])

player.action(() => {
    player.resolve()
})

player.overlaps('next-level',() => {
    go("game", {
        level: (level + 1) % maps.length,
        score: scoreLabel.value,
        coins: coinsLabel.value
    })
})

keyDown('left', () => {
    player.changeSprite('link-left')
    player.move(-player_speed,0)
    player.dir = vec2(-1,0)
})

keyDown('right', () => {
    player.changeSprite('link-right')
    player.move(player_speed,0)
    player.dir = vec2(1,0)
})

keyDown('up', () => {
    player.changeSprite('link-up')
    player.move(0,-player_speed)
    player.dir = vec2(0,-1)
})

keyDown('down', () => {
    player.changeSprite('link-down')
    player.move(0,player_speed)
    player.dir = vec2(0,1)
})

function spawnKaboom(p) {
    const obj = add([sprite("kaboom"),pos(p),"kaboom"])
    wait(0.5, () => {
        destroy(obj)
    })
}

keyPress("space", ()=> {
    spawnKaboom(player.pos.add(player.dir.scale(48)))
})

collides("kaboom", "skeletor", (k,s) => {
    camShake(5)
    wait(1,() => {
        destroy(k)
    })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
})  

collides("kaboom", "horizontalskeletor", (k,s) => {
    camShake(5)
    wait(1,() => {
        destroy(k)
    })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
})

player.collides('moeda', (obj) => {
  destroy(obj)
  coinsLabel.value++
  coinsLabel.text = 'Moedas: ' + coinsLabel.value
})

const slicer_speed = 200

action('slicer', (s) => {
    s.move(s.dir * slicer_speed, 0)
})

collides('slicer', 'wall', (s) => {
    s.dir = -s.dir
})

action('verticalslicer', (s) => {
    s.move(0,s.dir * slicer_speed,)
})

collides('verticalslicer', 'wall', (s) => {
    s.dir = -s.dir
})

const skeletor_speed = 300

action('skeletor', (s) => {
    s.move(0, s.dir * skeletor_speed)
    s.timer -= dt()

    if (s.timer <= 0) {
        s.dir = - s.dir
        s.timer = rand(5)
    }
})

collides('skeletor', 'wall', (s) => {
    s.dir = -s.dir
})


action('horizontalskeletor', (s) => {
    s.move(s.dir * skeletor_speed,0)
    s.timer -= dt()

    if (s.timer <= 0) {
        s.dir = - s.dir
        s.timer = rand(5)
    }
})

collides('horizontalskeletor', 'wall', (s) => {
    s.dir = -s.dir
})

player.overlaps( 'dangerous', () => {
    go('lose', {score: scoreLabel.value, coins: coinsLabel.value})
})

});

scene('lose', ({score, coins}) => {
  add([ text('Moedas: ' + coins + '    ', 18), origin('center'), pos(width()/1.45, height()/2)])
  add([ text('Inimigos Destruidos: ' + score, 18), origin('center'), pos(width()/3.3, height()/2)])
  add([text('Aperte Space Para Reiniciar', 18), origin('center'), pos(width()/2, height()/3)])
  keyPress('space', () => {
    go('game', {level:0, score:0, coins:0})
  })
})

start('game', {level:0, score:0, coins:0});