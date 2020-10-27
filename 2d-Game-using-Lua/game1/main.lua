love.graphics.setDefaultFilter('nearest','nearest')
enemy={}
enemies_controller={}
enemies_controller.enemies={}
enemies_controller.image=love.graphics.newImage("enemy.png")
particle_systems={}
particle_systems.list={}
particle_systems.img=love.graphics.newImage('sparke.png')

function particle_systems:spawn(x,y)
    local ps={}
    ps.x=x
    ps.y=y
    ps.ps=love.graphics.newParticleSystem(particle_systems.img,32)
    ps.ps:setParticleLifetime(2,4)
    ps.ps:setEmissionRate(5)
    ps.ps:setSizeVariation(1)
    ps.ps:setLinearAcceleration(-20,-20,20,20)
    ps.ps:setColors(255,255,255,255,255,255,255,255)
    table.insert(particle_systems.list,ps)
end

function particle_systems:draw()
    for _,v in pairs(particle_systems.list) do
        love.graphics.draw(v.ps,v.x,v.y)
    end
end


function particle_systems:update(dt)
    for _,v in pairs(particle_systems.list) do
        v.ps:update(dt)
    end
end




function checkcollosions(enemies,bullets)
    enemy.explosion_sound=love.audio.newSource("Explosion6.wav",'static')
    for i,e in pairs(enemies) do
        for _,b in pairs(bullets) do
            if b.y<=e.y + e.height and b.x>e.x and b.x<e.x + e.width then
                love.audio.play(enemy.explosion_sound)
                particle_systems:spawn(e.x,e.y)
                table.remove(enemies,i)
               
            end
        end
    end
    if #enemies_controller.enemies == 0 then
        game_win=true
    end
end



function love.load()
    game_over=false
    game_win=false
    background_image=love.graphics.newImage('back.png')
    player={}
    player.x=0
    player.y=540
    player.bullets={}
--to minimize size of bullet and to decide after how much time it will get shooted
    player.cooldown=20
    player.speed=10
    player.image=love.graphics.newImage('space.png')
    player.fire_sound=love.audio.newSource("bullet.wav",'static')
    player.fire=function()
        if player.cooldown <=0 then
            love.audio.play(player.fire_sound)
            player.cooldown=20
            bullet={}
            bullet.x=player.x + 45
            bullet.y=player.y
            table.insert(player.bullets,bullet)
        end        
    end
       for i=0,7 do
            enemies_controller:spawnEnemy(i*100,0)
        end 

        

    
end

function enemies_controller:spawnEnemy(x,y)
    enemy={}
    enemy.x=x
    enemy.y=y
    enemy.width=60
    enemy.height=60
    enemy.bullets={}
    enemy.cooldown=20
    enemy.speed=10
    
    table.insert(self.enemies,enemy)
end
-- enemy:fire() to make self function use jiska matlab hai enemies apne aap bullet fire karnege uske bajay aise bhi likh sakte enemy.fire(self)
function enemy:fire()
    -- this self.cooldown used aisa ki wo sabke liye kaam kare except the player which we are controlling
    if self.cooldown <=0 then
        self.cooldown=20
        bullet={}
        bullet.x=self.x + 35
        bullet.y=self.y
        table.insert(self.bullets,bullet)
    end        
end
function love.update(dt)
--for upward direction bullet the below one line
    player.cooldown=player.cooldown - 1


    if love.keyboard.isDown("right")  then
        player.x=player.x+player.speed
    elseif love.keyboard.isDown("left") then
        player.x=player.x-player.speed
    end

   
    for _,e in pairs(enemies_controller.enemies) do
        if e.y>=love.graphics.getHeight() then
            game_over=true
        end
            e.y=e.y+1
    
    end



--the below code for bullet shoot(samajh ne ke liye)
    if love.keyboard.isDown("space") then
        player.fire()
    end
    for i,b in pairs(player.bullets) do
        if b.y<-10 then
            table.remove(player.bullets,i)   
        end    
-- this statement for upward motion of bullet and -10 beacause if we do it speed will be 10 times (frames or move 10 pixels every tick or button pressing)
         b.y=b.y-10
    end
    checkcollosions(enemies_controller.enemies,player.bullets)
    


end
function love.draw()
    love.graphics.draw(background_image)
    if game_over then
        love.graphics.print("Game over! \n Better Luck next time \nGame Created By-Aditya Sharma",350,300)
        return
    elseif game_win then
        love.graphics.print("You Win! \nGame Created By-Aditya Sharma",350,350)
    end

    

--to make paddle
    love.graphics.setColor(255,255,255)
    love.graphics.draw(player.image,player.x,player.y)

    love.graphics.setColor(255,255,255)
    for _,e in pairs(enemies_controller.enemies) do
        love.graphics.draw(enemies_controller.image,e.x,e.y)
    end




 --to make bullets
    love.graphics.setColor(255,255,255)
--the b is to represent bullet for every button pressing (for every button pressing there will be unique bullet)
    for _,b in pairs(player.bullets) do
        love.graphics.rectangle("fill",b.x,b.y,10,10)
    end
end
