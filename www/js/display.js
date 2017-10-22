math.config({
  number: 'BigNumber',
  precision: 10
});
var coorSetting = [
                {x:math.parse('x * cos((90-y) deg)')  ,y:math.parse('x * sin((90-y) deg)')},
                {x:math.parse('x * cos((y-90) deg)')  ,y:math.parse('x * sin((y-90) deg)')},
                {x:math.parse('x * cos((270-y) deg)'),y:math.parse('x * sin((270-y) deg)')},
                {x:math.parse('x * cos((y-270) deg)'),y:math.parse('x * sin((y-270) deg)')}
              ];
var coorFixer   = [[1,1],[1,-1],[-1,-1],[-1,1]];
//var disSetting  = math.parse('x * tan(y deg)');
//var ceilSetting = math.parse('x * tan((y-90) deg)');

  const headToPhone = 20;
  const phoneToBody = 20;




function getDistance(personHeight,phoneHeight,alpha,beta,mode){
  if(mode==='ceiling'){
    return {cx:0,cy:0,distance:0,mode:'ceiling'}
  }
  //ground mode
  var disSetting  = math.parse(phoneHeight+'/cos(y deg)+(x-'+headToPhone+')*tan(y deg)+'+phoneToBody);

  let obj = {x:math.bignumber(personHeight),y:math.bignumber(beta)};
  let distance = disSetting.eval(obj);



  var re = getCoordinate(alpha, distance);
  re['distance'] = math.format(distance);
  re['mode'] = mode;
  return re;
}
function getCeilingDis(personHeight,phoneHeight,alpha,beta,ceiling2phoneBottom){
  //ceiling mode ,need ground mode once
  var ceilHzDis = math.parse('(z/tan((y-90) deg)) - ('+phoneHeight+'/sin((y-90) deg))+'+headToPhone);
  console.log('(z/tan((y-90) deg)) - ('+phoneHeight+'/sin((y-90) deg))+'+headToPhone);
  var obj = {y:math.bignumber(beta),z:math.bignumber(ceiling2phoneBottom)}
  let distance = ceilHzDis.eval(obj);
  var re = getCoordinate(alpha, distance);
  re['distance'] = math.format(distance);
  re['mode'] = 'ceiling';
  return re;
}
function getCeilingToPhoneBottom(personHeight,phoneHeight,alpha,beta,ceilingDis){
  var ceilingToPhoneBottom = math.parse('((x-'+phoneToBody+'+('+phoneHeight+'/sin((y-90) deg))) * tan((y-90) deg))');
  console.log('((x-'+phoneToBody+'+('+phoneHeight+'/sin((y-90) deg))) * tan((y-90) deg))');
  var obj = {x:math.bignumber(ceilingDis),y:math.bignumber(beta)}
  return ceilingToPhoneBottom.eval(obj);
}
function getCoordinate(alpha,distance){
  var	obj   = {x:math.bignumber(distance),y:math.bignumber(alpha)};
  var index = parseInt(alpha/90);
  return {cx:math.format(coorSetting[index]['x'].eval(obj))*coorFixer[index][0],cy:math.format(coorSetting[index]['y'].eval(obj))*coorFixer[index][1]};
}

function getCeilingHeight(deviceHeight,phoneHeight,firstDistance,beta_ceiling){
  var ceilSetting = math.parse('(x-'+phoneToBody+'+('+phoneHeight+'/sin((y-90) deg)) * tan((y-90) deg))+ x -'+headToPhone);
  console.log('(x-'+phoneToBody+'+('+phoneHeight+'/sin((y-90) deg)) * tan((y-90) deg))+ x -'+headToPhone)
  var obj = {x:math.bignumber(firstDistance), y:math.bignumber(beta_ceiling)};
  return math.format(math.add(ceilSetting.eval(obj),math.bignumber(deviceHeight)));
}


//console.log(getDistance(define_height, 328.2569,75.01));
//console.log(getCeilingHeight(define_height,578.8719,93.77));
