const prop_update = PropertiesService.getScriptProperties()
prop_update.setProperty('anchors','1:1:2:2')
class single{
  constructor(name,suit,x,y){
    this.aka = name
    this.costume = suit
    this.coordinates = [parseInt(x),parseInt(y)]
    this.data = {}
  }
  get coords(){
    return this.coordinates
  }
  get suit(){
    return this.costume
  }
  get name(){
    return this.aka
  }
  setCoords(pair){
    this.coordinates = pair
  }
  newX(x){
    this.coordinates[0] = parseInt(x)
  }
  newY(y){
    this.coordinates[1] = parseInt(y)
  }
  newSuit(suit){
    this.costume = suit
  }
  render(){
    if (this.suit.startsWith('IMG:')){
      Logger.log('https://docs.google.com/uc?id='+ this.suit.split('IMG:')[1])
      try{
        return SpreadsheetApp.getActiveSheet().insertImage(this.suit.split('IMG:')[1],this.coordinates[0],this.coordinates[1])
      }
      catch{
        return SpreadsheetApp.getActiveSheet().insertImage('https://docs.google.com/uc?id='+ this.suit.split('IMG:')[1],this.coordinates[0],this.coordinates[1])
      }
    }
    else{
      return SpreadsheetApp.getActiveSheet().getRange(this.coordinates[0],this.coordinates[1]).setBackground(this.suit)
    }
  }
  addData(key,value){
    this.data[key.toString()] = value
    return [key,value]
  }
  getData(key){
    return this.data[key.toString()]
  }
  editData(key,value){
    let prev = this.data[key.toString()]
    this.data[key.toString()] = value
    return prev
  }
  removeData(key,value){
   let prev = this.data[key.toString()]
   delete this.data[key];
   return prev
  }
}
function newSingle(name,suit,x,y){
  return new single(name,suit,x,y)
}
function anchorSet(x1,y1,x2,y2){
  prop_update.setProperty('anchors',(x1 + ':' + y1 + ':' + x2 + ':' + y2))
}
function clear(color){
  if (color == undefined){
    color = 'white'
  }
  let anchors = prop_update.getProperty('anchors').split(':')
  return SpreadsheetApp.getActiveSheet().getRange(anchors[0],anchors[1],anchors[2],anchors[3]).setBackground(color)
}
class shape{
  constructor(data){
    this.properties = data
  }
  newpoints(newpoints){ 
    let prev = this.properties['points']
    this.properties['points'] = newpoints
    return prev
  }
  newcolor(newc){
    let prev = this.properties['color']
    this.properties['color'] = newc
    return prev
  }
  mirror(){
  
  }
  flip(){

  }
  rotate(){

  }
  render(){
    if (this.properties['points'].length > 2){
      return SpreadsheetApp.getActiveSheet().getRange(this.points[0],this.points[1],this.points[2],this.points[3]).setBackground(this.properties['color'])
    }
    else{
      return SpreadsheetApp.getActiveSheet().getRange(this.points[0],this.points[1]).setBackground(this.properties['color'])
    }
  }
}
